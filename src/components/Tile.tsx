import React from "react"
import { noopTemplate as css } from "lib/utils"

import { useDrop } from "react-dnd"

import { PieceType, ChessColor, Square } from "types/chess"

import { Piece } from "components"

import { coordinateFromPosition } from "lib/chess"

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
        background: ${(x + y) % 2 === 1 ? "#F0D9B5" : "#B58863"};
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {pieceInfo ? (
        <Piece
          piece={pieceInfo.type}
          color={pieceInfo.color}
          position={position}
        />
      ) : null}
    </div>
  )
}
