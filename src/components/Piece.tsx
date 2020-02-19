import React from "react"

import { Bishop, King, Knight, Pawn, Queen, Rook } from "./pieces"

import { Piece } from "types/chess"

const PIECES = {
  bishop: Bishop,
  king: King,
  knight: Knight,
  queen: Queen,
  rook: Rook,
  pawn: Pawn,
}

type Props = {
  piece: Piece
}

export default ({ piece }: Props) => {
  const Piece = PIECES[piece]

  return <div>{Piece ? <Piece /> : null}</div>
}
