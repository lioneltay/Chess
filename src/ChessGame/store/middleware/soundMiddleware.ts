import { Howl } from "howler"
import { Middleware, Dispatch } from "redux"
import { MOVE, Action } from "../actions"
import { State } from "../reducer"
import { fen } from "../selectors"

import { getValidMoves, getPiece } from "lib/chess"

const moveSound = new Howl({ src: ["/public/Move.ogg"] })
const captureSound = new Howl({ src: ["/public/Capture.ogg"] })
const checkSound = new Howl({ src: ["/public/Check.ogg"] })

export const soundMiddleWare: Middleware<
  {},
  State,
  Dispatch<Action>
> = store => next => (action: Action) => {
  if (action.type === MOVE) {
    const state = store.getState()
    const move = { from: action.from, to: action.to }
    const moves = getValidMoves(fen(state), move.from)

    let playMoveSound = () => {}

    // Move is valid
    if (moves.includes(move.to)) {
      const targetPiece = getPiece(fen(state), move.to)
      if (targetPiece) {
        playMoveSound = () => captureSound.play()
      } else {
        playMoveSound = () => moveSound.play()
      }
    }

    const ret = next(action)

    // No Check sound yet
    // const nextState = store.getState()
    // const nextGame = nextState._game
    // if (nextGame.in_check()) {
    //   playMoveSound = () => checkSound.play()
    // }

    playMoveSound()

    return ret
  }

  return next(action)
}
