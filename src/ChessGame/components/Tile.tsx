import React, { Fragment, memo } from "react"
import styled from "styled-components"
import { noopTemplate as css } from "lib/utils"
import { shallowEqual } from "react-redux"

import { useDrop } from "react-dnd"

import { PieceType, ChessColor, Square, DragData, CircleColor } from "types"

import { DraggablePiece } from "ChessGame/components"

import { coordinateFromSquare, columnToLetter } from "lib/chess"

import { useActions, useSelector } from "ChessGame/store"

import { PIECE_TYPES, getColor, tileColor, complementTileColor } from "consts"

const VALID_MOVE_HIGHLIGHT = "rgba(20,85,30,0.5)"
const PREV_MOVE_HIGHLIGHT = "rgba(207, 255, 29, 0.5)"

type PieceInfo = {
  type: PieceType
  color: ChessColor
}

type ChessBoardCellProps = {
  square: Square
  pieceInfo?: PieceInfo | null
}

const Tile = ({ square, pieceInfo }: ChessBoardCellProps) => {
  const { move, deselectPiece, endDraw, updateDraw, beginDraw } = useActions()
  const {
    accessibleSquares,
    selectedSquare,
    previousMove,
    inCheck,
    turn,
    circleColor,
    flippedBoard,
  } = useSelector(
    (state, s) => ({
      flippedBoard: state.flippedBoard,
      accessibleSquares: state.selectedPiece?.accessibleSquares ?? [],
      selectedSquare: state.selectedPiece?.square,
      previousMove: s.previousMove(state),
      inCheck: s.inCheck(state),
      turn: s.turn(state),
      circleColor:
        state.drawingState?.from === square &&
        (state.drawingState?.to === square ||
          state.drawingState?.to === null) &&
        state.drawingState?.color !== "grey"
          ? state.drawingState?.color
          : state.circles[square],
    }),
    () => true,
  )

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
      onContextMenu={e => {
        e.preventDefault()
      }}
      onMouseDown={e => {
        if (e.button === 2) {
          beginDraw({ square, color: e.shiftKey ? "red" : "green" })
        }
      }}
      onMouseEnter={() => {
        updateDraw({ square })
      }}
      onMouseUp={e => {
        console.log(e.button)
        if (e.button === 2) {
          endDraw({ square })
        }
      }}
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

      <CoordinateLabels square={square} flippedBoard={flippedBoard} />

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

      {circleColor && <Circle color={circleColor} />}

      {/* <Overlay>
        <h1>{square}</h1>
      </Overlay> */}
    </div>
  )
}

type SquareProps = {
  square: Square
}

type FlippedBoardProps = {
  flippedBoard: boolean
}

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

type CircleProps = {
  color: CircleColor
}

const Circle = ({ color }: CircleProps) => {
  const strokeWidth = 5
  const r = 50 - strokeWidth / 2

  return (
    <Overlay>
      <svg viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke={getColor(color)}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>
    </Overlay>
  )
}

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

const CoordinateLabels = ({
  square,
  flippedBoard,
}: SquareProps & FlippedBoardProps) => {
  const [x, y] = coordinateFromSquare(square, { flippedBoard })

  const textColor = complementTileColor(tileColor(square))

  const svgStyle = {
    fontSize: "12",
    fill: textColor,
  }

  return (
    <Fragment>
      {x === 8 ? (
        <Overlay>
          <svg viewBox="0 0 100 100">
            <text
              {...svgStyle}
              x="95"
              y="5"
              alignmentBaseline={"hanging"}
              textAnchor="end"
            >
              {y}
            </text>
          </svg>
        </Overlay>
      ) : null}

      {y === 1 ? (
        <Overlay>
          <svg viewBox="0 0 100 100">
            <text
              {...svgStyle}
              x="5"
              y="95"
              alignmentBaseline="baseline"
              textAnchor="start"
            >
              {columnToLetter(x, { flippedBoard: false })}
            </text>
          </svg>
        </Overlay>
      ) : null}
    </Fragment>
  )
}

export default memo(Tile, (prev, next) => {
  return (
    shallowEqual(prev.pieceInfo, next.pieceInfo) &&
    shallowEqual(prev.square, next.square)
  )
})
