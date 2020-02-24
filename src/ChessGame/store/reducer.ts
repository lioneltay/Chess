import { assertNever } from "lib/utils"
import {
  move,
  fenToGameState,
  getPiece,
  getValidMoves,
  NEW_GAME_FEN,
} from "lib/chess"
import { init, last, min, max } from "ramda"

import { ChessColor, Square, Board, FEN } from "types"

import { Action } from "./actions"

export type State = {
  fen: FEN
  history: FEN[]
  historyCursor: number
  board: Board
  turn: ChessColor
  previousMove: { from: Square; to: Square } | null
  selectedPiece: null | {
    square: Square
    accessibleSquares: Square[]
  }
  inCheck: boolean
}

// const initialFen =
//   "rnbqkbnr/ppp1p1p1/8/3p1p1p/2P1P1P1/8/PP1P1P1P/RNBQKBNR w KQkq h6 0 4"
const initialFen = NEW_GAME_FEN

const initialState: State = {
  fen: initialFen,
  history: [initialFen],
  historyCursor: 0,
  ...fenToGameState(initialFen),
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
        history: state.history.concat(fen),
        historyCursor: state.historyCursor + 1,
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
      if (state.historyCursor === 0) {
        return state
      }

      const newHistory = init(state.history)
      const newFen = last(newHistory)

      if (!newFen) {
        throw Error('History array has length 0')
      }

      return {
        ...state,
        ...fenToGameState(newFen),
        fen: newFen,
        history: newHistory,
        historyCursor: state.historyCursor - 1,
      }
    }
    case "GO_BACK": {
      const historyCursor = max(0, state.historyCursor - 1)
      const newFen = state.history[historyCursor]
      return {
        ...state,
        ...fenToGameState(newFen),
        historyCursor,
        fen: newFen,
      }
    }
    case "GO_FORWARD": {
      const historyCursor = min(
        state.history.length - 1,
        state.historyCursor + 1,
      )
      const newFen = state.history[historyCursor]
      return {
        ...state,
        ...fenToGameState(newFen),
        historyCursor,
        fen: newFen,
      }
    }
    case "GO_END": {
      const historyCursor = state.history.length - 1
      const newFen = state.history[historyCursor]
      return {
        ...state,
        ...fenToGameState(newFen),
        historyCursor,
        fen: newFen,
      }
    }
    case "GO_START": {
      const historyCursor = 0
      const newFen = state.history[historyCursor]
      return {
        ...state,
        ...fenToGameState(newFen),
        historyCursor,
        fen: newFen,
      }
    }
    default: {
      assertNever(action)
      return state
    }
  }
}
