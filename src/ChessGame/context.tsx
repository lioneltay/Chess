import { createContext, useContext } from "react"

import { Square } from "types"

import { move, selectPiece } from "./store"

type ChessContext = {
  move: typeof move
  selectPiece: typeof selectPiece
  moves: (square: Square) => Square[]
}

export const ChessContext = createContext((null as any) as ChessContext)

export const useChessContext = () => useContext(ChessContext)
