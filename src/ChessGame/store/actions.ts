import { bindActionCreators } from "redux"
import { useDispatch } from "react-redux"
import { Square, CircleColor, Move, FEN } from "types"
import { SideConfig } from "./reducer"

export const MOVE = "MOVE"
type MoveInput = { from: Square; to: Square }
export const move = ({ from, to }: MoveInput) => {
  return {
    type: MOVE,
    from,
    to,
  } as const
}
type MoveAction = ReturnType<typeof move>

const SELECT_PIECE = "SELECT_PIECE"
type SelectPieceInput = { square: Square }
export const selectPiece = ({ square }: SelectPieceInput) =>
  ({
    type: SELECT_PIECE,
    square,
  } as const)
type SelectPieceAction = ReturnType<typeof selectPiece>

const DESELECT_PIECE = "DESELECT_PIECE"
export const deselectPiece = () =>
  ({
    type: DESELECT_PIECE,
  } as const)
type DeselectPieceAction = ReturnType<typeof deselectPiece>

const UNDO = "UNDO"
export const undo = () =>
  ({
    type: UNDO,
  } as const)
type UndoAction = ReturnType<typeof undo>

const GO_BACK = "GO_BACK"
export const goBack = () =>
  ({
    type: GO_BACK,
  } as const)
type GoBackAction = ReturnType<typeof goBack>

const GO_FORWARD = "GO_FORWARD"
export const goForward = () =>
  ({
    type: GO_FORWARD,
  } as const)
type GoForwardAction = ReturnType<typeof goForward>

const GO_START = "GO_START"
export const goStart = () =>
  ({
    type: GO_START,
  } as const)
type GoStartAction = ReturnType<typeof goStart>

const GO_END = "GO_END"
export const goEnd = () =>
  ({
    type: GO_END,
  } as const)
type GoEndAction = ReturnType<typeof goEnd>

const BEGIN_DRAW = "BEGIN_DRAW"
type BeginDrawInput = { square: Square; color: CircleColor }
export const beginDraw = ({ square, color }: BeginDrawInput) =>
  ({
    type: BEGIN_DRAW,
    square,
    color,
  } as const)
type BeginDrawAction = ReturnType<typeof beginDraw>

const UPDATE_DRAW = "UPDATE_DRAW"
type UpdateDrawInput = { square: Square }
export const updateDraw = ({ square }: UpdateDrawInput) =>
  ({
    type: UPDATE_DRAW,
    square,
  } as const)
type UpdateDrawAction = ReturnType<typeof updateDraw>

export const END_DRAW = "END_DRAW"
type EndDrawInput = { square: Square }
export const endDraw = ({ square }: EndDrawInput) =>
  ({
    type: END_DRAW,
    square,
  } as const)
type EndDrawAction = ReturnType<typeof endDraw>

export const FLIP_BOARD = "FLIP_BOARD"
export const flipBoard = () =>
  ({
    type: FLIP_BOARD,
  } as const)
type FlipBoardAction = ReturnType<typeof flipBoard>

const SET_BEST_MOVE = "SET_BEST_MOVE"
type SetBestMoveInput = {
  bestMove: Move
  historyCursor: number
  fen: FEN
  final?: boolean
  evaluation?: number
}
export const setBestMove = ({
  bestMove,
  historyCursor,
  fen,
  final,
  evaluation,
}: SetBestMoveInput) =>
  ({
    type: SET_BEST_MOVE,
    bestMove,
    historyCursor,
    fen,
    final,
    evaluation,
  } as const)
export type SetBestMoveAction = ReturnType<typeof setBestMove>

export const SET_ENGINE_ON = "SET_ENGINE_ON"
type SetShowBestMoveInput = { show: boolean }
export const setEngineOn = ({ show }: SetShowBestMoveInput) =>
  ({
    type: SET_ENGINE_ON,
    show,
  } as const)
type setEngineOnAction = ReturnType<typeof setEngineOn>

export const CALCULATE_BEST_MOVE = "CALCULATE_BEST_MOVE"
type CalculateBestMoveInput = {
  fen: FEN
  historyCursor: number
}
const calculateBestMove = ({ fen, historyCursor }: CalculateBestMoveInput) =>
  ({
    type: CALCULATE_BEST_MOVE,
    fen,
    historyCursor,
  } as const)
export type CalculateBestMoveAction = ReturnType<typeof calculateBestMove>

export const AI_MOVE = "AI_MOVE"
const aiMove = () =>
  ({
    type: AI_MOVE,
  } as const)
export type AiMoveAction = ReturnType<typeof aiMove>

export const START_NEW_GAME = "START_NEW_GAME"
type StartNewGameInput = {
  white: SideConfig
  black: SideConfig
  flippedBoard: boolean
}
const startNewGame = ({ white, black, flippedBoard }: StartNewGameInput) =>
  ({
    type: START_NEW_GAME,
    white,
    black,
    flippedBoard,
  } as const)
export type StartNewGameAction = ReturnType<typeof startNewGame>

export type Action =
  | StartNewGameAction
  | AiMoveAction
  | MoveAction
  | SelectPieceAction
  | DeselectPieceAction
  | UndoAction
  | GoBackAction
  | GoForwardAction
  | GoStartAction
  | GoEndAction
  | BeginDrawAction
  | EndDrawAction
  | UpdateDrawAction
  | FlipBoardAction
  | SetBestMoveAction
  | setEngineOnAction
  | CalculateBestMoveAction

const actionCreators = {
  startNewGame,
  aiMove,
  calculateBestMove,
  setEngineOn,
  setBestMove,
  flipBoard,
  endDraw,
  updateDraw,
  beginDraw,
  move,
  selectPiece,
  deselectPiece,
  undo,
  goBack,
  goForward,
  goStart,
  goEnd,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actionCreators, dispatch)
}
