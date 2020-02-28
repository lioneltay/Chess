import { State, HistoryItem } from "./reducer"
import { fenToBoard, getTurn, getInCheck } from "lib/chess"
import { FEN, Move } from "types"
import { last, memoizeWith } from "ramda"

export const latestHistoryItem = (state: State): HistoryItem => {
  const historyItem = last(state.history)
  if (!historyItem) {
    throw Error("History is empty")
  }

  return historyItem
}

export const latestFen = (state: State): FEN => latestHistoryItem(state).fen

export const fen = (state: State): FEN => {
  return state.history[state.historyCursor].fen
}

export const latestBoard = (state: State) => fenToBoard(latestFen(state))

export const board = memoizeWith(
  state => fen(state),
  (state: State) => fenToBoard(fen(state)),
)

export const turn = (state: State) => getTurn(latestHistoryItem(state).fen)

export const inCheck = (state: State) => getInCheck(fen(state))

export const navigating = (state: State): boolean =>
  state.history.length - 1 !== state.historyCursor

export const previousMove = (state: State): Move | null => {
  return state.history[state.historyCursor]?.previousMove ?? null
}

export const bestMove = (state: State, historyCursor?: number): Move | null => {
  return state.history[historyCursor ?? state.historyCursor]?.bestMove ?? null
}

export const evaluation = (state: State) => latestHistoryItem(state).evaluation

export const isAiTurn = (state: State): boolean =>
  turn(state) === "w" ? state.white === "ai" : state.black === "ai"

export const isPlayerTurn = (state: State): boolean => !isAiTurn(state)

export const turnNumber = (state: State): number => state.history.length
