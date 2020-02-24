import React from "react"
import { DndProvider } from "react-dnd"
import MultiBackend from "react-dnd-multi-backend"
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch"

import { ChessBoard } from "ChessGame/components"
import { Controls } from "ChessGame/components"
import { CustomDragPreview } from "ChessGame/components"

import { store, useSelector } from "./store"

import { Provider as ReduxProvider } from "react-redux"

const ChessGame = () => {
  const board = useSelector(state => state.board)
  const state = useSelector(state => {
    const blarg = { ...state }
    delete blarg.board
    return blarg
  })

  return (
    <div>
      <ChessBoard board={board} />
      <div>{state.fen}</div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

export default () => {
  return (
    <ReduxProvider store={store}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Controls />
        <ChessGame />
        <CustomDragPreview />
      </DndProvider>
    </ReduxProvider>
  )
}
