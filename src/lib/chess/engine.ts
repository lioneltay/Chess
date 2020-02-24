import { Square } from "types"

const stockfish = new Worker("/public/stockfish.js")

export function getBestMove(
  fen: string,
): Promise<{ from: Square; to: Square } | null> {
  stockfish.postMessage("ucinewgame")
  stockfish.postMessage("position fen " + fen)
  stockfish.postMessage("go depth 21")

  return new Promise(res => {
    stockfish.onmessage = function(event) {
      if (event.data && event.data.startsWith("bestmove")) {
        const match = event.data.match(/[^\ ]* ([^\ ]{2,2})([^\ ]{2,2}).*$/)
        if (match[1] && match[2]) {
          res({ from: match[1], to: match[2] })
        } else {
          res(null)
        }
      }
    }
  })
}
