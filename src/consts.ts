import { PieceType, PieceName, SquareMap, ArrowColor } from "types"

export const GREEN = "#15781B"
export const RED = "#882020"
export const GREY = "#003088"

const COLOR_MAP = {
  red: RED,
  green: GREEN,
  grey: GREY,
}

export const getColor = (color: ArrowColor) => {
  return COLOR_MAP[color]
}

export const PIECE_TYPES = ["r", "n", "b", "k", "q", "p"]

const PIECE_NAMES_MAP: Record<PieceType, PieceName> = {
  r: "rook",
  n: "knight",
  b: "bishop",
  k: "king",
  q: "queen",
  p: "pawn",
}

export const pieceName = (pieceType: PieceType): PieceName => {
  const name = PIECE_NAMES_MAP[pieceType]
  if (name === undefined) {
    throw Error(`Invalid pieceType [${pieceType}]`)
  }
  return name
}

export const seedSquareMap = <T extends any>(defaultValue: T): SquareMap<T> => {
  return {
    a8: defaultValue,
    b8: defaultValue,
    c8: defaultValue,
    d8: defaultValue,
    e8: defaultValue,
    f8: defaultValue,
    g8: defaultValue,
    h8: defaultValue,
    a7: defaultValue,
    b7: defaultValue,
    c7: defaultValue,
    d7: defaultValue,
    e7: defaultValue,
    f7: defaultValue,
    g7: defaultValue,
    h7: defaultValue,
    a6: defaultValue,
    b6: defaultValue,
    c6: defaultValue,
    d6: defaultValue,
    e6: defaultValue,
    f6: defaultValue,
    g6: defaultValue,
    h6: defaultValue,
    a5: defaultValue,
    b5: defaultValue,
    c5: defaultValue,
    d5: defaultValue,
    e5: defaultValue,
    f5: defaultValue,
    g5: defaultValue,
    h5: defaultValue,
    a4: defaultValue,
    b4: defaultValue,
    c4: defaultValue,
    d4: defaultValue,
    e4: defaultValue,
    f4: defaultValue,
    g4: defaultValue,
    h4: defaultValue,
    a3: defaultValue,
    b3: defaultValue,
    c3: defaultValue,
    d3: defaultValue,
    e3: defaultValue,
    f3: defaultValue,
    g3: defaultValue,
    h3: defaultValue,
    a2: defaultValue,
    b2: defaultValue,
    c2: defaultValue,
    d2: defaultValue,
    e2: defaultValue,
    f2: defaultValue,
    g2: defaultValue,
    h2: defaultValue,
    a1: defaultValue,
    b1: defaultValue,
    c1: defaultValue,
    d1: defaultValue,
    e1: defaultValue,
    f1: defaultValue,
    g1: defaultValue,
    h1: defaultValue,
  }
}
