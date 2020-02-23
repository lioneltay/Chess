import React, { Fragment, memo } from "react"
import { noopTemplate as css } from "lib/utils"

import { useDragLayer } from "react-dnd"

import Piece from "./Piece"

export default () => {
  const { offset, item } = useDragLayer(monitor => {
    return {
      item: monitor.getItem(),
      offset: monitor.getSourceClientOffset(),
    }
  })

  if (!offset || !item) {
    return null
  }

  const { preview, color, type } = item

  return (
    <div
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        width: preview.dimension,
        height: preview.dimension,
      }}
      css={css`
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
      `}
    >
      <Piece color={color} type={type} />
    </div>
  )
}
