import React from "react"
import { noopTemplate as css } from "lib/utils"

import { Piece as PieceType } from "types/chess"
import { Piece } from "components"

type ChessBoardCellProps = {
  position: [number, number]
  piece?: PieceType | null
}

export default ({ position: [x, y], piece }: ChessBoardCellProps) => {
  return (
    <div
      css={css`
        background: ${(x + y) % 2 === 0 ? "#F0D9B5" : "#B58863"};
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {piece ? <Piece piece={piece} /> : null}
    </div>
  )
}
