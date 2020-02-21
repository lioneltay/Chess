import React from "react"
import { noopTemplate as css } from "lib/utils"

import { Tile, DraggablePiece } from "components"

import { PieceType, ChessColor } from "types/chess"

import { positionFromCoordinate } from "lib/chess"

type PieceInfo = {
  type: PieceType
  color: ChessColor
}

type Props = {
  board: (PieceInfo | null)[][]
}

export default ({ board }: Props) => {
  return (
    <div
      css={css`
        margin-left: auto;
        margin-right: auto;
        max-width: 1000px;

        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-auto-rows: 1fr;

        &::before {
          content: "";
          width: 0;
          padding-bottom: 100%;
          grid-row: 1 / 1;
          grid-column: 1 / 1;
        }

        & > *:first-child {
          grid-row: 1 / 1;
          grid-column: 1 / 1;
        }
      `}
    >
      {board.map((row, rowIndex) =>
        row.map((info, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            position={positionFromCoordinate([colIndex + 1, 8 - rowIndex])}
            pieceInfo={info}
          />
        )),
      )}
    </div>
  )
}
