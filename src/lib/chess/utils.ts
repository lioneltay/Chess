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
