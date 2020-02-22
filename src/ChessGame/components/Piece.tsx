import React, { Fragment } from "react"
import { noopTemplate as css } from "lib/utils"

import { PieceType, ChessColor, Square, PieceName } from "types"

import { useDrag, DragPreviewImage } from "react-dnd"

import { pieceName } from "consts"

import { useActions, useSelector } from "ChessGame/store"

import Piece from "./Piece"

type Props = {
  piece: PieceType
  color: ChessColor
  square: Square
}

export default ({ piece, color, square }: Props) => {
  const { selectPiece, deselectPiece } = useActions()
  const { selectedSquare, turn } = useSelector(state => ({
    selectedSquare: state.selectedPiece?.square,
    turn: state.turn,
  }))

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: piece,
      color,
      square,
    },
    begin: () => {
      selectPiece({ square })
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const colorString = color === "w" ? "white" : "black"

  const handleSelection = () => {
    color !== turn || selectedSquare === square
      ? deselectPiece()
      : selectPiece({ square })
  }

  return (
    <Fragment>
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {Piece ? (
          <div
            onClick={handleSelection}
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              color: ${colorString};
            `}
          >
            <img
              ref={preview}
              src={`/public/chess-piece-images/${pieceName(
                piece,
              )}-${colorString}.png`}
              css={css`
                width: 100%;
                height: 100%;
              `}
            />
          </div>
        ) : null}
      </div>
    </Fragment>
  )
}
