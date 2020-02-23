import React, { Fragment } from "react"
import styled from "styled-components"
import { noopTemplate as css } from "lib/utils"

import { useDrop } from "react-dnd"

import { PieceType, ChessColor, Square, DragData } from "types"

import { DraggablePiece } from "ChessGame/components"

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
  const { move, deselectPiece } = useActions()
  const {
    accessibleSquares,
    selectedSquare,
    previousMove,
    inCheck,
    turn,
  } = useSelector(state => ({
    accessibleSquares: state.selectedPiece?.accessibleSquares ?? [],
    selectedSquare: state.selectedPiece?.square,
    previousMove: state.previousMove,
    inCheck: state.inCheck,
    turn: state.turn,
  }))

  const [{ isOver }, drop] = useDrop({
    accept: PIECE_TYPES,
    drop: (_item, monitor) => {
      // Allowing a drop to always happen ends the dragging sooner so the drag preview doesn't linger
      if (!accessibleSquares.includes(square)) {
        return
      }

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
        if (!pieceInfo) {
          deselectPiece()
        }

        if (selectedSquare && accessibleSquares.includes(square)) {
          move({ from: selectedSquare, to: square })
        }
      }}
    >
      {canDrop ? (
        pieceInfo ? (
          <AttackedPieceHighlight square={square} />
        ) : (
          <ValidMoveDot />
        )
      ) : inCheck && turn === pieceInfo?.color && pieceInfo?.type === "k" ? (
        <InCheckHighlight square={square} />
      ) : selectedSquare === square ? (
        <SelectedSquareHighlight />
      ) : previousMove?.from === square || previousMove?.to === square ? (
        <PreviousMoveHighlight />
      ) : null}

      <CoordinateLabels square={square} />

      {pieceInfo ? (
        <div
          css={css`
            position: absolute;
            width: 100%;
            height: 100%;
          `}
        >
          <DraggablePiece
            piece={pieceInfo.type}
            color={pieceInfo.color}
            square={square}
          />
        </div>
      ) : null}
    </div>
  )
}

type SquareProps = {
  square: Square
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

const InCheckHighlight = ({ square }: SquareProps) => {
  const background = tileColor(square)

  return (
    <Overlay
      css={css`
        background: radial-gradient(
          circle at center,
          tomato 40%,
          ${background}
        );
      `}
    ></Overlay>
  )
}

const AttackedPieceHighlight = ({ square }: SquareProps) => {
  return (
    <Fragment>
      <SelectedSquareHighlight />
      <Overlay
        css={css`
          border-radius: 50%;
          background-color: ${tileColor(square)};
        `}
      />
    </Fragment>
  )
}

const ValidMoveDot = styled(Overlay)`
  background: ${VALID_MOVE_HIGHLIGHT};
  border-radius: 50%;
  width: 25%;
  height: 25%;
`

const CoordinateLabels = ({ square }: SquareProps) => {
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
