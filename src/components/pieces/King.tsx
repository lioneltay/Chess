import React from "react"
import { noopTemplate as css } from "lib/utils"

import { ChessColor } from "types/chess"

type Props = {
  color: ChessColor
}

export default ({ color }: Props) => {
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
        src={`/public/chess-piece-images/king-${colorString}.png`}
        css={css`
          width: 100%;
          height: 100%;
        `}
      />
    </div>
  )
}
