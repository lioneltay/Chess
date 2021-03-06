import { assertNever } from "lib/utils"
import {
  move,
  fenToGameState,
  getPiece,
  getValidMoves,
  NEW_GAME_FEN,
  getTurn,
} from "lib/chess"
import { init, last, min, max, equals, remove, insert, pipe } from "ramda"

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

import * as selectors from "./selectors"

export type HistoryItem = {
  fen: FEN
  turn: ChessColor
  previousMove: Move | null
  bestMove: Move | null
  evaluation: number | null
}

type Player = "player"
type AI = "ai"
export type SideConfig = Player | AI

export type State = {
  gameOver: boolean
  flippedBoard: boolean
  white: Player | AI
  black: Player | AI
  engineOn: boolean
  history: HistoryItem[]
  historyCursor: number
  selectedPiece: null | {
    square: Square
    accessibleSquares: Square[]
  }
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
  gameOver: false,
  flippedBoard: false,
  white: "player",
  black: "player",
  engineOn: false,
  history: [
    {
      fen: initialFen,
      previousMove: null,
      bestMove: null,
      turn: getTurn(initialFen),
      evaluation: null,
    },
  ],
  historyCursor: 0,
  selectedPiece: null,
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
      const fen = move(selectors.latestFen(state), moveObj)
      const navigating = selectors.navigating(state)

      return {
        ...state,
        history: state.history.concat({
          turn: getTurn(fen),
          fen,
          previousMove: moveObj,
          bestMove: null,
          evaluation: null,
        }),
        historyCursor: state.historyCursor + (navigating ? 0 : 1),
        selectedPiece: null,
      }
    }
    case "SELECT_PIECE": {
      const pieceInfo = getPiece(selectors.fen(state), action.square)
      const turn = selectors.turn(state)

      const pieceOfCorrectColor = pieceInfo?.color === turn

      if (!pieceOfCorrectColor) {
        return state
      }

      return {
        ...state,
        selectedPiece: {
          square: action.square,
          accessibleSquares: getValidMoves(selectors.fen(state), action.square),
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
      // Cannot undo at start of game
      if (state.historyCursor === 0) {
        return state
      }

      return {
        ...state,
        history: init(state.history),
        historyCursor: state.historyCursor - 1,
      }
    }
    case "GO_BACK": {
      const historyCursor = max(0, state.historyCursor - 1)
      const newFen = state.history[historyCursor]
      return {
        ...state,
        historyCursor,
      }
    }
    case "GO_FORWARD": {
      const historyCursor = min(
        state.history.length - 1,
        state.historyCursor + 1,
      )
      return {
        ...state,
        historyCursor,
      }
    }
    case "GO_END": {
      const historyCursor = state.history.length - 1
      return {
        ...state,
        historyCursor,
      }
    }
    case "GO_START": {
      const historyCursor = 0
      return {
        ...state,
        historyCursor,
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
      const historyItem = state.history[action.historyCursor]

      if (historyItem?.fen !== action.fen) {
        return state
      }

      const newHistoryItem: HistoryItem = {
        ...historyItem,
        bestMove: action.bestMove,
      }

      if (typeof action.evaluation === "number") {
        newHistoryItem.evaluation = action.evaluation
      }

      return {
        ...state,
        history: insert(
          action.historyCursor,
          newHistoryItem,
          remove(action.historyCursor, 1, state.history),
        ),
      }
    }
    case "SET_ENGINE_ON": {
      return {
        ...state,
        engineOn: action.show,
      }
    }
    case "START_NEW_GAME": {
      return {
        ...initialState,
        white: action.white,
        black: action.black,
        flippedBoard: action.flippedBoard,
      }
    }
    case "AI_MOVE":
    case "CALCULATE_BEST_MOVE": {
      return state
    }
    default: {
      assertNever(action)
      return state
    }
  }
}
