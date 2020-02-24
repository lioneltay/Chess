import React from "react"
import { noopTemplate as css } from "lib/utils"
import { Square, Vector2D } from "types"
import { coordinateFromSquare } from "lib/chess"

const WIDTH = 100
const HEIGHT = 100

type Arrow = {
  from: Square
  to: Square
}

type Props = {
  arrows: Arrow[]
}

type Position = {
  x: number
  y: number
}

const percentageCoordinateOfCenter = (
  from: Square,
  to: Square,
  scale: number = 100,
): { from: Position; to: Position } => {
  const [tx, ty] = coordinateFromSquare(to)
  const [fx, fy] = coordinateFromSquare(from)
  const toOffset = 10 / 8 / 100
  const fromOffset = -6 / 8 / 100
  const centerOffset = 0.5

  return {
    from: {
      x: ((fx - centerOffset) / 8 - fromOffset) * scale,
      y: ((fy - centerOffset) / 8 - fromOffset) * scale,
    },
    to: {
      x: ((tx - centerOffset) / 8 - toOffset) * scale,
      y: ((ty - centerOffset) / 8 - toOffset) * scale,
    },
  }
}

const getArrowCoordinates = (arrow: Arrow) => {
  const { to, from } = percentageCoordinateOfCenter(arrow.from, arrow.to)

  const ret = {
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
  }

  console.log(ret)

  return ret
}

export default ({ arrows }: Props) => {
  return (
    <svg
      viewBox="0 0 100 100"
      css={css`
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

      {/* <line
        stroke="#003088"
        strokeWidth="22.5"
        strokeLinecap="round"
        markerEnd="url(#arrowhead-pb)"
        opacity="0.4"
        x1="30"
        y1="30"
        x2="70"
        y2="70"
      ></line> */}

      {/* <line
        stroke="#15781B"
        strokeWidth="15"
        strokeLinecap="round"
        markerEnd="url(#arrowhead-g)"
        opacity="0.4"
        x1="30"
        y1="30"
        x2="70.3933982822018"
        y2="70.6066017177982"
      ></line> */}

      <Arrow from="a1" to="b2" color="red" />
      <Arrow from="a2" to="b3" color="green" />
      <Arrow from="a3" to="b4" color="grey" />
    </svg>
  )
}

type ArrowProps = {
  color: "red" | "green" | "grey"
  from: Square
  to: Square
}

const GREEN = "#15781B"
const RED = "#882020"
const GREY = "#003088"
const COLOR_MAP = {
  red: RED,
  green: GREEN,
  grey: GREY,
}

const Arrow = ({ color, from, to }: ArrowProps) => {
  return (
    <line
      stroke={COLOR_MAP[color]}
      strokeWidth="2"
      strokeLinecap="round"
      markerEnd={`url(#arrowhead-${color === "grey" ? "pb" : color[0]})`}
      opacity={color === "grey" ? 0.4 : 0.7}
      {...getArrowCoordinates({ from, to })}
    ></line>
  )
}
