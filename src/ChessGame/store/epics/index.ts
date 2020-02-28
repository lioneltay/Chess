import { createEpicMiddleware, ofType, combineEpics } from "redux-observable"
import {
  mergeMap,
  filter,
  map,
  endWith,
  withLatestFrom,
  last,
  takeUntil,
} from "rxjs/operators"
import { Observable, empty, of } from "rxjs"
import {
  Action,
  setBestMove,
  CalculateBestMoveAction,
  SetBestMoveAction,
  StartNewGameAction,
  AiMoveAction,
  move,
} from "../actions"

import { State } from "../reducer"

import * as selectors from "../selectors"

import { calculateBestMove } from "lib/chess"
import { StateObservable } from "redux-observable"

const startNewGameStream = (
  action$: Observable<Action>,
): Observable<StartNewGameAction> =>
  action$.pipe(
    filter(
      (action): action is StartNewGameAction =>
        action.type === "START_NEW_GAME",
    ),
  )

const aiMoveEpic = (
  action$: Observable<Action>,
  state$: StateObservable<State>,
): Observable<Action> => {
  return action$.pipe(
    filter((action): action is AiMoveAction => action.type === "AI_MOVE"),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const fen = selectors.fen(state)
      return calculateBestMove(fen).pipe(
        last(),
        map(bestMove =>
          move({
            from: bestMove.from,
            to: bestMove.to,
          }),
        ),
        takeUntil(startNewGameStream(action$)),
      )
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
        takeUntil(startNewGameStream(action$)),
      )
    }),
  )
}

export const rootEpic = combineEpics(bestMoveEpic, aiMoveEpic)
