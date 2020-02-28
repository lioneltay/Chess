import React from "react"
import { noopTemplate as css } from "lib/utils"
import { Square, Arrow as ArrowType, ArrowColor } from "types"
import { coordinateFromSquare } from "lib/chess"
import { useSelector } from "ChessGame/store"
import { getColor } from "consts"
import { equals } from "ramda"

type GetArrowCoordinatesOptions = {
  short?: boolean
  scale?: number
  flippedBoard?: boolean
}

const getArrowCoordinates = (
  arrow: { from: Square; to: Square },
  {
    short = false,
    scale = 100,
    flippedBoard = false,
  }: GetArrowCoordinatesOptions = {},
) => {
  const [tx, ty] = coordinateFromSquare(arrow.to, { flippedBoard })
  const [fx, fy] = coordinateFromSquare(arrow.from, { flippedBoard })

  const angle = Math.atan2(ty - fy, tx - fx)
  const centerOffset = 0.5
  const toOffsetMagnitude = (short ? 35 : 15) / scale
  const toXOffset = Math.cos(angle) * toOffsetMagnitude
  const toYOffset = Math.sin(angle) * toOffsetMagnitude
  const fromXOffset = 0
  const fromYOffset = 0

  return {
    x1: ((fx - centerOffset - fromXOffset) / 8) * scale,
    y1: scale - ((fy - centerOffset - fromYOffset) / 8) * scale,
    x2: ((tx - centerOffset - toXOffset) / 8) * scale,
    y2: scale - ((ty - centerOffset - toYOffset) / 8) * scale,
  }
}

export default () => {
  const {
    arrows,
    drawingState,
    flippedBoard,
    bestMove,
    engineOn,
  } = useSelector((state, s) => ({
    flippedBoard: state.flippedBoard,
    arrows: state.arrows,
    drawingState: state.drawingState,
    bestMove: s.bestMove(state),
    engineOn: state.engineOn,
  }))

  const drawingArrow =
    drawingState &&
    drawingState.from &&
    drawingState.to &&
    drawingState.from !== drawingState.to
      ? drawingState
      : null

  const short = !!arrows.find(arrow => equals(arrow, drawingArrow))

  return (
    <svg
      viewBox="0 0 100 100"
      css={css`
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `}
    >
      <defs>
        <marker
          id="arrowhead-pb"
          orient="auto"
          markerWidth="4"
          markerHeight="8"
          refX="2.05"
          refY="2.01"
        >
          <path d="M0,0 V4 L3,2 Z" fill="#003088"></path>
        </marker>
        <marker
          id="arrowhead-g"
          orient="auto"
          markerWidth="4"
          markerHeight="8"
          refX="2.05"
          refY="2.01"
        >
          <path d="M0,0 V4 L3,2 Z" fill="#15781B"></path>
        </marker>
        <marker
          id="arrowhead-r"
          orient="auto"
          markerWidth="4"
          markerHeight="8"
          refX="2.05"
          refY="2.01"
        >
          <path d="M0,0 V4 L3,2 Z" fill="#882020"></path>
        </marker>
      </defs>

      {arrows.map(arrow => (
        <Arrow
          key={arrow.from + arrow.to}
          {...arrow}
          flippedBoard={flippedBoard}
        />
      ))}

      {drawingArrow && drawingArrow.to ? (
        <Arrow
          to={drawingArrow.to}
          from={drawingArrow.from}
          color={drawingArrow.color}
          flippedBoard={flippedBoard}
          short={short}
        />
      ) : null}

      {engineOn && bestMove ? (
        <Arrow
          to={bestMove.to}
          from={bestMove.from}
          color="grey"
          flippedBoard={flippedBoard}
        />
      ) : null}
    </svg>
  )
}

type ArrowProps = {
  color: "red" | "green" | "grey"
  from: Square
  to: Square
  short?: boolean
  flippedBoard: boolean
}

const Arrow = ({ color, from, to, short, flippedBoard }: ArrowProps) => {
  return (
    <line
      stroke={getColor(color)}
      strokeWidth="1.8"
      strokeLinecap="round"
      markerEnd={`url(#arrowhead-${color === "grey" ? "pb" : color[0]})`}
      opacity={color === "grey" ? 0.4 : 0.7}
      {...getArrowCoordinates({ from, to }, { short, flippedBoard })}
    />
  )
}
