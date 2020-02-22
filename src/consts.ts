import { PieceType, PieceName } from "types"

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
