import React from "react"
import { noopTemplate as css } from "lib/utils"

import { ChessColor, PieceType } from "types/chess"

import { pieceName } from "consts"

type Props = {
  color: ChessColor
  piece: PieceType
}

export default ({ color, piece }: Props) => {
  const colorString = color === "w" ? "white" : "black"

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${colorString};
      `}
    >
      <img
        src={`/public/chess-piece-images/${pieceName(
          piece,
        )}-${colorString}.png`}
        css={css`
          width: 100%;
          height: 100%;
        `}
      />
    </div>
  )
}
