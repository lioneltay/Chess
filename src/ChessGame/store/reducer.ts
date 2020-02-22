import { assertNever } from "lib/utils"
import { ChessInstance, Chess } from "lib/chess"

import { PieceType, ChessColor, Square } from "types"

import { Action } from "./actions"

type Tile = {
  type: PieceType
  color: ChessColor
}

export type State = {
  _game: ChessInstance
  board: Tile[][]
  turn: ChessColor
  previousMove: { from: Square; to: Square } | null
  selectedPiece: null | {
    square: Square
    accessibleSquares: Square[]
  }
}

const game = Chess()

const initialState: State = {
  _game: game,
  board: game.board(),
  turn: game.turn(),
  selectedPiece: null,
  previousMove: null,
}

const extractGameState = (game: ChessInstance) => {
  return {
    board: game.board(),
    turn: game.turn(),
  }
}

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "MOVE": {
      const game = state._game
      const move = { from: action.from, to: action.to }
      game.move(move)

      return {
        ...state,
        ...extractGameState(game),
        selectedPiece: null,
        previousMove: move,
      }
    }
    case "SELECT_PIECE": {
      const game = state._game
      const pieceInfo = game.get(action.square)
      const turn = state.turn

      const pieceOfCorrectColor = pieceInfo?.color === turn

      return {
        ...state,
        ...extractGameState(game),
        selectedPiece: pieceOfCorrectColor
          ? {
              square: action.square,
              accessibleSquares: game
                .moves({ square: action.square, verbose: true })
                .map(item => item.to),
            }
          : null,
      }
    }
    case "DESELECT_PIECE": {
      const game = state._game
      return {
        ...state,
        ...extractGameState(game),
        selectedPiece: null,
      }
    }
    default: {
      assertNever(action)
      return state
    }
  }
}
