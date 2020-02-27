import { Square, Move } from "types"
import { Observable, Observer } from "rxjs"
import { Chess } from "./chess.js"

type BestMove = Move & { final: boolean; evaluation?: number }

export function calculateBestMove(fen: string): Observable<BestMove> {
  return Observable.create((observer: Observer<BestMove>) => {
    const turn = Chess(fen).turn()
    const stockfish = new Worker("/public/stockfish.js")

    stockfish.postMessage("ucinewgame")
    stockfish.postMessage("position fen " + fen)
    stockfish.postMessage("go depth 18")

    const getMove = (res: string) => {
      const match = res.match(/ pv (\S*)/)
      return match ? match[1] || null : null
    }

    const getCP = (res: string) => {
      try {
        const match = res.match(/ cp (\S*)/)
        return match
          ? parseFloat(match[1]) * (turn === "b" ? -1 : 1) || null
          : null
      } catch (e) {
        return null
      }
    }

    stockfish.onerror = error => {
      observer.error(error)
      stockfish.terminate()
    }

    stockfish.onmessage = event => {
      const move = getMove(event.data)
      const cp = getCP(event.data)
      if (move && cp) {
        observer.next({
          from: move.slice(0, 2) as Square,
          to: move.slice(2) as Square,
          final: false,
          evaluation: cp,
        })
      }

      if (event.data && event.data.startsWith("bestmove")) {
        const match = event.data.match(/[^\ ]* ([^\ ]{2,2})([^\ ]{2,2}).*$/)
        if (match[1] && match[2]) {
          observer.next({ from: match[1], to: match[2], final: true })
        }

        observer.complete()
        stockfish.terminate()
      }
    }
  })
}

// import { tap } from "rxjs/operators"

// const game = Chess()

// const stockfish = new Worker("/public/stockfish.js")

// stockfish.postMessage("ucinewgame")
// stockfish.postMessage("position fen " + game.fen())
// stockfish.postMessage("go infinite")

// stockfish.onmessage = event => {
//   console.log(event.data)
// }
