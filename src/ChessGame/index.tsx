import React, { useRef, useReducer } from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"

import { ChessBoard } from "ChessGame/components"

import { Chess } from "lib/chess"

import { ChessContext } from "./context"
import { reducer, store, useSelector } from "./store"

import { Provider as ReduxProvider } from "react-redux"

const ChessGame = () => {
  const board = useSelector(state => state.board)
  return <ChessBoard board={board} />
}

export default () => {
  return (
    <ReduxProvider store={store}>
      <DndProvider backend={Backend}>
        <h1>Build Successful!</h1>
        <ChessGame />
      </DndProvider>
    </ReduxProvider>
  )
}
