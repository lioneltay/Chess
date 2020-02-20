import React from "react"

import { Bishop, King, Knight, Pawn, Queen, Rook } from "./pieces"

import { PieceType, ChessColor } from "types/chess"

import { useDrag } from "react-dnd"

const PIECES = {
  b: Bishop,
  k: King,
  n: Knight,
  q: Queen,
  r: Rook,
  p: Pawn,
}

type Props = {
  piece: PieceType
  color: ChessColor
  position: string
}

export default ({ piece, color, position }: Props) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: piece,
      color,
      position,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const Piece = PIECES[piece]

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {Piece ? <Piece color={color} /> : null}
    </div>
  )
}
