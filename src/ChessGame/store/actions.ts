import { bindActionCreators } from "redux"
import { useDispatch } from "react-redux"
import { Square, CircleColor } from "types"

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

const DRAW_CIRCLE = "DRAW_CIRCLE"
type DrawCircleInput = { square: Square; color: CircleColor }
export const drawCircle = ({ square, color }: DrawCircleInput) =>
  ({
    type: DRAW_CIRCLE,
    square,
    color,
  } as const)
type DrawCircleAction = ReturnType<typeof drawCircle>

export type Action =
  | MoveAction
  | SelectPieceAction
  | DeselectPieceAction
  | UndoAction
  | GoBackAction
  | GoForwardAction
  | GoStartAction
  | GoEndAction
  | DrawCircleAction

const actionCreators = {
  drawCircle,
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
