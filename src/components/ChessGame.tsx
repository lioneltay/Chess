import React, { createContext, useRef, useContext, useState } from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"

import { ChessBoard } from "components"

import { Chess, getBestMove } from "lib/chess"

import { PieceType, ChessColor, Square } from "types/chess"

type Tile = {
  type: PieceType
  color: ChessColor
}

type ChessContext = {
  // Gives legal moves of a piece
  moves(position: Square): Square[]
  // Moves a piece
  move(from: Square, to: Square): void
  // Returns if the side to move is in check
  inCheck(): boolean
  board: Tile[][]
  turn: ChessColor
}

const ChessContext = createContext<ChessContext>((null as any) as ChessContext)

const useForceUpdate = () => {
  const [_, setState] = useState(true)
  return () => setState(toggle => !toggle)
}

export const useChessContext = () => useContext(ChessContext)

const ChessProvider: React.SFC = ({ children }) => {
  const forceUpdate = useForceUpdate()
  const { current: chess } = useRef(Chess())

  const game = chess

  // const doMove = (from, to) => {
  //   chess.move({ from, to })
  //   forceUpdate()
  // }

  // const playMove = () => {
  //   return getBestMove(game.fen()).then(move => {
  //     console.log(move)
  //     console.log("MOVE", doMove(move?.from, move.to))
  //   })
  // }

  // const main = async () => {
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   await playMove()
  //   console.log(game.ascii())
  // }

  // main()

  return (
    <ChessContext.Provider
      value={{
        turn: chess.turn(),
        board: chess.board(),
        moves: position => {
          const moves = chess
            .moves({ square: position, verbose: true })
            .map(({ to }) => to)
          forceUpdate()
          return moves
        },
        move: (from, to) => {
          chess.move({ from, to })
          forceUpdate()
        },
        inCheck: () => {
          const ret = chess.in_check()
          forceUpdate()
          return ret
        },
      }}
    >
      {children}
    </ChessContext.Provider>
  )
}

const ChessGame = () => {
  const { board } = useChessContext()

  return <ChessBoard board={board} />
}

export default () => {
  return (
    <ChessProvider>
      <DndProvider backend={Backend}>
        <ChessGame />
      </DndProvider>
    </ChessProvider>
  )
}
