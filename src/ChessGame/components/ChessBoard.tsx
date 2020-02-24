import React from "react"
import { noopTemplate as css } from "lib/utils"
import { Tile } from "ChessGame/components"
import { Board } from "types"
import { squareFromCoordinate, flipBoard } from "lib/chess"

type Props = {
  board: Board
  flippedBoard?: boolean
}

export default ({ board: rawBoard, flippedBoard = false }: Props) => {
  const board = flippedBoard ? flipBoard(rawBoard) : rawBoard

  return (
    <div
      css={css`
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

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
            square={squareFromCoordinate([colIndex + 1, 8 - rowIndex], {
              flippedBoard,
            })}
            pieceInfo={info}
          />
        )),
      )}
    </div>
  )
}
