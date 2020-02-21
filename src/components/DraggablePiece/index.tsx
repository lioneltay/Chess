import React from "react"

import { PieceType, ChessColor } from "types/chess"

import { useDrag } from "react-dnd"

import Piece from "./Piece"

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

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {Piece ? <Piece color={color} piece={piece} /> : null}
    </div>
  )
}
