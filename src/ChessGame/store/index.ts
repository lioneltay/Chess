import { createStore, Middleware, Dispatch, applyMiddleware } from "redux"

import { reducer, State } from "./reducer"
import { MOVE, Action } from "./actions"
import { useSelector as originalUseSelector } from "react-redux"

import { Howl } from "howler"

const playSound = (soundFile: string) => {
  new Howl({
    src: [soundFile],
  }).play()
}

const soundMiddleWare: Middleware<
  {},
  State,
  Dispatch<Action>
> = store => next => (action: Action) => {
  if (action.type === MOVE) {
    const state = store.getState()
    const game = state._game
    const move = { from: action.from, to: action.to }
    const moves = game
      .moves({ square: move.from, verbose: true })
      .map(item => item.to)

    let playMoveSound = () => {}

    // Move is valid
    if (moves.includes(move.to)) {
      const targetPiece = game.get(move.to)
      if (targetPiece) {
        playMoveSound = () => playSound("/public/Capture.ogg")
      } else {
        playMoveSound = () => playSound("/public/Move.ogg")
      }
    }

    const ret = next(action)

    // No Check sound yet
    // const nextState = store.getState()
    // const nextGame = nextState._game
    // if (nextGame.in_check()) {
    //   playMoveSound = () => playSound("/public/Check.ogg")
    // }

    playMoveSound()

    return ret
  }

  return next(action)
}

export const store = createStore(reducer, applyMiddleware(soundMiddleWare))

export const useSelector = <T extends any>(
  selector: (state: State) => T,
): T => {
  return originalUseSelector(selector)
}

export * from "./actions"
export * from "./reducer"
