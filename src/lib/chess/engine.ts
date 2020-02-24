import { Square, Move } from "types"
import { noop } from "lib/utils"

export function getBestMove(
  fen: string,
  cb: (move: Move) => void = noop,
): Promise<Move | null> {
  const stockfish = new Worker("/public/stockfish.js")

  stockfish.postMessage("ucinewgame")
  stockfish.postMessage("position fen " + fen)
  stockfish.postMessage("go depth 18")

  const getMove = (res: string) => {
    const match = res.match(/ pv (\S*)/)
    return match ? match[1] || null : null
  }

  return new Promise(res => {
    stockfish.onmessage = event => {
      const move = getMove(event.data)
      if (move) {
        cb({
          from: move.slice(0, 2) as Square,
          to: move.slice(2) as Square,
        })
      }

      if (event.data && event.data.startsWith("bestmove")) {
        const match = event.data.match(/[^\ ]* ([^\ ]{2,2})([^\ ]{2,2}).*$/)
        if (match[1] && match[2]) {
          res({ from: match[1], to: match[2] })
        } else {
          res(null)
        }

        stockfish.terminate()
      }
    }
  })
}
