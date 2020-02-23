import React from "react"
import { noopTemplate as css } from "lib/utils"

import { PieceType, ChessColor } from "types"

import { pieceName } from "consts"

type Props = {
  type: PieceType
  color: ChessColor
} & React.HTMLAttributes<HTMLDivElement>

export default ({ type, color, onClick }: Props) => {
  const colorString = color === "w" ? "white" : "black"

  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${colorString};
      `}
    >
      <img
        src={`/public/chess-piece-images/${pieceName(type)}-${colorString}.png`}
        css={css`
          width: 100%;
          height: 100%;
          pointer-events: none;
        `}
      />
    </div>
  )
}
