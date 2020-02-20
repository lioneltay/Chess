export { Chess } from "./chessLogic"

import { Vector2D, Square } from "types/chess"

const letterToNumber = (letter: string) => {
  return letter.charCodeAt(0) + 1 - "a".charCodeAt(0)
}

const numberToLetter = (number: number) => {
  return String.fromCharCode("a".charCodeAt(0) - 1 + number)
}

export const coordinateFromPosition = (position: Square): Vector2D => {
  return [letterToNumber(position[0]), parseInt(position[1])]
}

export const positionFromCoordinate = ([x, y]: Vector2D): Square => {
  return `${numberToLetter(x)}${y}` as Square
}
