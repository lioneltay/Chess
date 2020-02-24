import { Vector2D, Square } from "types"

type Options = {
  flippedBoard: boolean
}

const flipNumber = (number: number): number => 9 - number

const columnToNumber = (letter: string, { flippedBoard }: Options) => {
  const number = letter.charCodeAt(0) + 1 - "a".charCodeAt(0)
  return flippedBoard ? flipNumber(number) : number
}

export const columnToLetter = (number: number, { flippedBoard }: Options) => {
  const flippedNumber = flippedBoard ? flipNumber(number) : number
  return String.fromCharCode("a".charCodeAt(0) - 1 + flippedNumber)
}

export const coordinateFromSquare = (
  position: Square,
  options: Options,
): Vector2D => {
  return [
    columnToNumber(position[0], options),
    options.flippedBoard
      ? flipNumber(parseInt(position[1]))
      : parseInt(position[1]),
  ]
}

export const squareFromCoordinate = (
  [x, y]: Vector2D,
  options: Options,
): Square => {
  return `${columnToLetter(x, options)}${
    options.flippedBoard ? flipNumber(y) : y
  }` as Square
}
