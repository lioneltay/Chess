import React from "react"
import { noopTemplate as css } from "lib/utils"

import { Tile } from "components"

import { Piece } from "types/chess"

const board: (Piece | null)[][] = [
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
]

export default () => {
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
        row.map((piece, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            piece={piece}
            position={[colIndex + 1, 8 - rowIndex]}
          />
        )),
      )}
    </div>
  )
}
