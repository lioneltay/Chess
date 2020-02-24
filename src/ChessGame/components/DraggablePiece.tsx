import React, { Fragment, useEffect, useRef } from "react"
import { noopTemplate as css } from "lib/utils"

import { PieceType, ChessColor, Square, PieceName } from "types"

import { useDrag, DragPreviewImage } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"

import { pieceName } from "consts"

import { useActions, useSelector } from "ChessGame/store"

import Piece from "./Piece"

type Props = {
  piece: PieceType
  color: ChessColor
  square: Square
}

export default ({ piece, color, square }: Props) => {
  const dragRef = useRef<HTMLDivElement | null>(null)
  const { selectPiece, deselectPiece } = useActions()
  const { selectedSquare, turn, ai } = useSelector(state => ({
    selectedSquare: state.selectedPiece?.square,
    turn: state.turn,
    ai: state.ai,
  }))

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: piece,
      color,
      square,
      preview: {
        dimension: dragRef.current?.getBoundingClientRect().width,
      },
    },
    canDrag: () => turn === color && ai?.color !== color,
    begin: () => {
      selectPiece({ square })
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  const handleSelection = () => {
    color !== turn || selectedSquare === square
      ? deselectPiece()
      : selectPiece({ square })
  }

  return (
    <Fragment>
      <div
        ref={el => {
          dragRef.current = el
          drag(el)
        }}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {piece ? (
          <Piece color={color} type={piece} onClick={handleSelection} />
        ) : null}
      </div>
    </Fragment>
  )
}
