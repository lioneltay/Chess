import React, { Fragment } from "react"
import styled from "styled-components"
import { noopTemplate as css } from "lib/utils"

import { useDrop } from "react-dnd"

import { PieceType, ChessColor, Square, DragData } from "types"

import { Piece } from "ChessGame/components"

import { coordinateFromSquare, numberToLetter } from "lib/chess"

import { useActions, useSelector } from "ChessGame/store"

import { PIECE_TYPES } from "consts"

const DARK = "#F0D9B5"
const LIGHT = "#B58863"
const VALID_MOVE_HIGHLIGHT = "rgba(20,85,30,0.5)"
const PREV_MOVE_HIGHLIGHT = "rgba(207, 255, 29, 0.5)"

type PieceInfo = {
  type: PieceType
  color: ChessColor
}

type ChessBoardCellProps = {
  square: Square
  children?: React.ReactNode
  pieceInfo?: PieceInfo | null
}

export default ({ square, pieceInfo }: ChessBoardCellProps) => {
  const { move } = useActions()
  const { accessibleSquares, selectedSquare, previousMove } = useSelector(
    state => ({
      accessibleSquares: state.selectedPiece?.accessibleSquares ?? [],
      selectedSquare: state.selectedPiece?.square,
      previousMove: state.previousMove,
    }),
  )

  const [{ isOver }, drop] = useDrop({
    accept: PIECE_TYPES,
    canDrop: () => {
      return accessibleSquares.includes(square)
    },
    drop: (_item, monitor) => {
      const item = (_item as unknown) as DragData
      move({ from: item.square, to: square })
    },
    collect: monitor => {
      const item = monitor.getItem()

      return {
        isOver: monitor.isOver(),
      }
    },
  })

  const canDrop = accessibleSquares.includes(square)

  const backgroundColor = tileColor(square)

  return (
    <div
      ref={drop}
      css={css`
        position: relative;
        background: ${backgroundColor};
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      onClick={() => {
        if (selectedSquare && accessibleSquares.includes(square)) {
          move({ from: selectedSquare, to: square })
        }
      }}
    >
      {selectedSquare === square && <SelectedSquareHighlight />}

      {canDrop && <ValidMoveDot />}

      <CoordinateLabels square={square} />

      {previousMove &&
      (previousMove.from === square || previousMove.to === square) ? (
        <PreviousMoveHighlight />
      ) : null}

      {pieceInfo ? (
        <div
          css={css`
            position: absolute;
            width: 100%;
            height: 100%;
          `}
        >
          <Piece
            piece={pieceInfo.type}
            color={pieceInfo.color}
            square={square}
          />
        </div>
      ) : null}
    </div>
  )
}

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const PreviousMoveHighlight = styled(Overlay)`
  background: ${PREV_MOVE_HIGHLIGHT};
`

const SelectedSquareHighlight = styled(Overlay)`
  background: ${VALID_MOVE_HIGHLIGHT};
`

const ValidMoveDot = styled(Overlay)`
  background: ${VALID_MOVE_HIGHLIGHT};
  border-radius: 50%;
  width: 25%;
  height: 25%;
`

type CoordinateLabelsProps = {
  square: Square
}

const CoordinateLabels = ({ square }: CoordinateLabelsProps) => {
  const [x, y] = coordinateFromSquare(square)

  const color = tileColor(square)
  const textColor = color === DARK ? LIGHT : DARK

  return (
    <Fragment>
      {x === 8 ? (
        <div
          css={css`
            color: ${textColor};
            position: absolute;
            padding: 4px;
            font-weight: 500;
            top: 0;
            right: 0;
          `}
        >
          {y}
        </div>
      ) : null}

      {y === 1 ? (
        <div
          css={css`
            color: ${textColor};
            position: absolute;
            padding: 4px;
            font-weight: 500;
            bottom: 0;
            left: 0;
          `}
        >
          {numberToLetter(x)}
        </div>
      ) : null}
    </Fragment>
  )
}

const tileColor = (square: Square) => {
  const [x, y] = coordinateFromSquare(square)

  const backgroundColor = (x + y) % 2 === 1 ? DARK : LIGHT

  return backgroundColor
}
