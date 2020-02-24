import { assertNever } from "lib/utils"
import {
  move,
  fenToGameState,
  getPiece,
  undo,
  getValidMoves,
  NEW_GAME_FEN,
} from "lib/chess"

import { ChessColor, Square, Board, FEN } from "types"

import { Action } from "./actions"

export type State = {
  fen: FEN
  board: Board
  turn: ChessColor
  previousMove: { from: Square; to: Square } | null
  selectedPiece: null | {
    square: Square
    accessibleSquares: Square[]
  }
  inCheck: boolean
}

const initialState: State = {
  fen: NEW_GAME_FEN,
  ...fenToGameState(NEW_GAME_FEN),
  selectedPiece: null,
  previousMove: null,
}

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "MOVE": {
      const moveObj = { from: action.from, to: action.to }
      const fen = move(state.fen, moveObj)

      return {
        ...state,
        ...fenToGameState(fen),
        fen,
        selectedPiece: null,
        previousMove: moveObj,
      }
    }
    case "SELECT_PIECE": {
      const pieceInfo = getPiece(state.fen, action.square)
      const turn = state.turn

      const pieceOfCorrectColor = pieceInfo?.color === turn

      if (!pieceOfCorrectColor) {
        return state
      }

      return {
        ...state,
        selectedPiece: {
          square: action.square,
          accessibleSquares: getValidMoves(state.fen, action.square),
        },
      }
    }
    case "DESELECT_PIECE": {
      if (!state.selectedPiece) {
        return state
      }

      return {
        ...state,
        selectedPiece: null,
      }
    }
    case "UNDO": {
      const fen = undo(state.fen)
      return {
        ...state,
        ...fenToGameState(fen),
        fen,
      }
    }
    default: {
      assertNever(action)
      return state
    }
  }
}
