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
  const { selectedSquare, turn, isPlayerTurn, navigating } = useSelector(
    (state, s) => ({
      selectedSquare: state.selectedPiece?.square,
      turn: s.turn(state),
      isPlayerTurn: s.isPlayerTurn(state),
      navigating: s.navigating(state),
    }),
  )

  const [{ isDragging, canDrag }, drag, preview] = useDrag({
    item: {
      type: piece,
      color,
      square,
      preview: {
        dimension: dragRef.current?.getBoundingClientRect().width,
      },
    },
    canDrag: () => turn === color && isPlayerTurn && !navigating,
    begin: () => {
      selectPiece({ square })
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      canDrag: monitor.canDrag(),
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
          cursor: canDrag ? "grab" : "not-allowed",
        }}
      >
        {piece ? (
          <Piece color={color} type={piece} onClick={handleSelection} />
        ) : null}
      </div>
    </Fragment>
  )
}
