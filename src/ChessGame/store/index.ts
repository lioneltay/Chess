import { createStore, applyMiddleware } from "redux"

import { reducer, State } from "./reducer"
import { useSelector as originalUseSelector } from "react-redux"

import { soundMiddleWare } from "./middleware/soundMiddleware"

export const store = createStore(reducer, applyMiddleware(soundMiddleWare))

export const useSelector = <T extends any>(
  selector: (state: State) => T,
): T => {
  return originalUseSelector(selector)
}

export * from "./actions"
export * from "./reducer"
