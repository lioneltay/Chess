import { assertNever } from "lib/utils"
import {
  move,
  fenToGameState,
  getPiece,
  getValidMoves,
  NEW_GAME_FEN,
} from "lib/chess"
import { init, last, min, max, equals, remove } from "ramda"

import {
  ChessColor,
  Square,
  Board,
  FEN,
  SquareMap,
  CircleColor,
  ArrowColor,
  Arrow,
  Move,
} from "types"

import { Action } from "./actions"
import { seedSquareMap } from "consts"

export type State = {
  flippedBoard: boolean
  ai: null | {
    color: ChessColor
  }
  showBestMove: boolean
  bestMove: Move | null
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
  circles: SquareMap<CircleColor | null>
  arrows: Arrow[]
  drawingState: null | DrawingState
}

type DrawingState = {
  from: Square
  to: Square | null
  color: ArrowColor
}

const initialFen = NEW_GAME_FEN

const initialState: State = {
  flippedBoard: false,
  ai: { color: "b" },
  showBestMove: true,
  bestMove: null,
  fen: initialFen,
  history: [initialFen],
  historyCursor: 0,
  ...fenToGameState(initialFen),
  selectedPiece: null,
  previousMove: null,
  circles: {
    ...seedSquareMap(null),
  },
  arrows: [],
  drawingState: null,
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
        bestMove: null,
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
      // Cannot undo at start of game or on the AI's turn
      if (state.historyCursor === 0 || state.ai?.color === state.turn) {
        return state
      }

      const stepsBack = state.ai ? 2 : 1

      const newHistory = state.history.slice(
        0,
        state.history.length - stepsBack,
      )
      const newFen = last(newHistory)

      if (!newFen) {
        throw Error("History array has length 0")
      }

      return {
        ...state,
        ...fenToGameState(newFen),
        fen: newFen,
        history: newHistory,
        historyCursor: state.historyCursor - stepsBack,
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
    case "BEGIN_DRAW": {
      return {
        ...state,
        drawingState: {
          color: action.color,
          from: action.square,
          to: null,
        },
      }
    }
    case "UPDATE_DRAW": {
      if (!state.drawingState) {
        return state
      }

      return {
        ...state,
        drawingState: {
          ...state.drawingState,
          to: action.square,
        },
      }
    }
    case "END_DRAW": {
      const data = state.drawingState

      if (!data) {
        return state
      }

      if (data.from === action.square) {
        return {
          ...state,
          drawingState: null,
          circles: {
            ...state.circles,
            [data.from]:
              state.circles[data.from] === data.color ? null : data.color,
          },
        }
      } else {
        const newArrow = {
          color: data.color,
          from: data.from,
          to: action.square,
        }

        const existingArrowIndex = state.arrows.findIndex(arrow =>
          equals(arrow, newArrow),
        )

        return {
          ...state,
          drawingState: null,
          arrows:
            existingArrowIndex >= 0
              ? remove(existingArrowIndex, 1, state.arrows)
              : state.arrows.concat(newArrow),
        }
      }
    }
    case "FLIP_BOARD": {
      return {
        ...state,
        flippedBoard: !state.flippedBoard,
      }
    }
    case "SET_BEST_MOVE": {
      return {
        ...state,
        bestMove: action.move,
      }
    }
    case "SET_SHOW_BEST_MOVE": {
      return {
        ...state,
        showBestMove: action.show,
      }
    }
    default: {
      assertNever(action)
      return state
    }
  }
}
