import { createStore } from "redux"

import { reducer, State } from "./reducer"
import { useSelector as originalUseSelector } from "react-redux"

export const store = createStore(reducer)

export const useSelector = <T extends any>(
  selector: (state: State) => T,
): T => {
  return originalUseSelector(selector)
}

export * from "./actions"
export * from "./reducer"
