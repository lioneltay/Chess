import { bindActionCreators } from "redux"
import { useDispatch } from "react-redux"
import { Square } from "types"

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

export type Action = MoveAction | SelectPieceAction | DeselectPieceAction

const actionCreators = {
  move,
  selectPiece,
  deselectPiece,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actionCreators, dispatch)
}
