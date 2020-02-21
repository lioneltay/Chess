import React from "react"
import { noopTemplate as css } from "lib/utils"

import { useDrop } from "react-dnd"

import { PieceType, ChessColor, Square } from "types/chess"

import { DraggablePiece } from "components"

import { coordinateFromPosition, numberToLetter } from "lib/chess"

import { useChessContext } from "components/ChessGame"

import { PIECE_TYPES } from "consts"

type PieceInfo = {
  type: PieceType
  color: ChessColor
}

type ChessBoardCellProps = {
  position: Square
  children?: React.ReactNode
  pieceInfo?: PieceInfo | null
}

export default ({ position, pieceInfo }: ChessBoardCellProps) => {
  const chessContext = useChessContext()

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: PIECE_TYPES,
    drop: (item, monitor) => {
      chessContext.move(item.position, position)
    },
    collect: monitor => {
      const item = monitor.getItem()

      return {
        isOver: monitor.isOver(),
        canDrop:
          monitor.canDrop() &&
          item &&
          chessContext.moves(item.position).includes(position),
      }
    },
  })

  const [x, y] = coordinateFromPosition(position)

  const dark = "#F0D9B5"
  const light = "#B58863"
  const backgroundColor = (x + y) % 2 === 1 ? dark : light
  const foregroundColor = backgroundColor === dark ? light : dark

  return (
    <div
      ref={drop}
      style={{
        background: isOver
          ? canDrop
            ? "green"
            : "red"
          : canDrop
          ? "yellow"
          : undefined,
      }}
      css={css`
        position: relative;
        background: ${backgroundColor};
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {x === 8 ? (
        <div
          css={css`
            color: ${foregroundColor};
            position: absolute;
            padding: 4px;
            font-weight: 500;
            top: 0;
            right: 0;
          `}
        >
          {y}
        </div>
      ) : null}

      {y === 1 ? (
        <div
          css={css`
            color: ${foregroundColor};
            position: absolute;
            padding: 4px;
            font-weight: 500;
            bottom: 0;
            left: 0;
          `}
        >
          {numberToLetter(x)}
        </div>
      ) : null}

      {pieceInfo ? (
        <DraggablePiece
          piece={pieceInfo.type}
          color={pieceInfo.color}
          position={position}
        />
      ) : null}
    </div>
  )
}
