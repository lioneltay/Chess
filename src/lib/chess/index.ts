export { Chess } from "./chessLogic"
// replace with export type when typescript 3.9 is ready
import { ChessInstance as ChessInstanceType } from "./chessLogic"
export type ChessInstance = ChessInstanceType

import { Vector2D, Square } from "types"

export const letterToNumber = (letter: string) => {
  return letter.charCodeAt(0) + 1 - "a".charCodeAt(0)
}

export const numberToLetter = (number: number) => {
  return String.fromCharCode("a".charCodeAt(0) - 1 + number)
}

export const coordinateFromSquare = (position: Square): Vector2D => {
  return [letterToNumber(position[0]), parseInt(position[1])]
}

export const squareFromCoordinate = ([x, y]: Vector2D): Square => {
  return `${numberToLetter(x)}${y}` as Square
}

import { Chess } from "./chessLogic"

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
