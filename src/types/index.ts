export type FEN = string
export type PGN = string

export type CircleColor = "red" | "green"

export type SquareMap<T> = Record<Square, T>

export type PieceInfo = {
  type: PieceType
  color: ChessColor
}

export type DragData = {
  piece: PieceType
  color: ChessColor
  square: Square
}
export type PieceType = "r" | "n" | "b" | "k" | "q" | "p"

export type PieceName = "rook" | "knight" | "bishop" | "king" | "queen" | "pawn"

export type Tile = {
  type: PieceType
  color: ChessColor
}

export type Move = { from: Square; to: Square }

export type Board = Tile[][]

export type ChessColor = "w" | "b"

export type Vector2D = [number, number]

export type Square =
  | "a8"
  | "b8"
  | "c8"
  | "d8"
  | "e8"
  | "f8"
  | "g8"
  | "h8"
  | "a7"
  | "b7"
  | "c7"
  | "d7"
  | "e7"
  | "f7"
  | "g7"
  | "h7"
  | "a6"
  | "b6"
  | "c6"
  | "d6"
  | "e6"
  | "f6"
  | "g6"
  | "h6"
  | "a5"
  | "b5"
  | "c5"
  | "d5"
  | "e5"
  | "f5"
  | "g5"
  | "h5"
  | "a4"
  | "b4"
  | "c4"
  | "d4"
  | "e4"
  | "f4"
  | "g4"
  | "h4"
  | "a3"
  | "b3"
  | "c3"
  | "d3"
  | "e3"
  | "f3"
  | "g3"
  | "h3"
  | "a2"
  | "b2"
  | "c2"
  | "d2"
  | "e2"
  | "f2"
  | "g2"
  | "h2"
  | "a1"
  | "b1"
  | "c1"
  | "d1"
  | "e1"
  | "f1"
  | "g1"
  | "h1"
