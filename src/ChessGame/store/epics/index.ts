import { createEpicMiddleware, ofType, combineEpics } from "redux-observable"
import { mergeMap, filter, map, endWith, withLatestFrom } from "rxjs/operators"
import { Observable, empty, of } from "rxjs"
import {
  Action,
  setBestMove,
  CalculateBestMoveAction,
  SetBestMoveAction,
  move,
} from "../actions"

import { State } from "../reducer"

import * as selectors from "../selectors"

import { calculateBestMove } from "lib/chess"
import { StateObservable } from "redux-observable"

const aiMoveEpic = (
  action$: Observable<Action>,
  state$: StateObservable<State>,
): Observable<Action> => {
  return action$.pipe(
    filter(
      // TODO Typescript type to make modify the 'final' property
      (action): action is SetBestMoveAction =>
        action.type === "SET_BEST_MOVE" && !!action.final,
    ),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const lastHistoryItem = selectors.latestHistoryItem(state)

      if (
        // ai is enabled and it is the ai's turn
        state.ai?.color === selectors.turn(state) &&
        // The calculated best move is for the last move
        lastHistoryItem.fen === action.fen
      ) {
        return of(
          move({
            from: action.bestMove.from,
            to: action.bestMove.to,
          }),
        )
      }

      return empty()
    }),
  )
}

const bestMoveEpic = (
  action$: Observable<Action>,
  state$: StateObservable<State>,
): Observable<Action> => {
  return action$.pipe(
    filter(
      (action): action is CalculateBestMoveAction =>
        action.type === "CALCULATE_BEST_MOVE",
    ),
    mergeMap(({ fen, historyCursor }) => {
      if (selectors.bestMove(state$.value, historyCursor)) {
        return empty()
      }

      return calculateBestMove(fen).pipe(
        map(bestMove =>
          setBestMove({
            bestMove: { from: bestMove.from, to: bestMove.to },
            evaluation: bestMove.evaluation,
            historyCursor,
            fen,
            final: bestMove.final,
          }),
        ),
      )
    }),
  )
}

export const rootEpic = combineEpics(bestMoveEpic, aiMoveEpic)
