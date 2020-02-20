import React from "react"
import { noopTemplate as css } from "lib/utils"

import { ChessColor } from "types/chess"

type Props = {
  color: ChessColor
}

export default ({ color }: Props) => {
  return (
    <div
      css={css`
        color: ${color === 'w' ? 'white' : 'black'};
      `}
    >
      <h1>R</h1>
    </div>
  )
}
