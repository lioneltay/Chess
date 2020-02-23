import React from "react"
import { DndProvider } from "react-dnd"
import MultiBackend from "react-dnd-multi-backend"
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch"

import { ChessBoard } from "ChessGame/components"
import { CustomDragPreview } from "ChessGame/components"

import { store, useSelector } from "./store"

import { Provider as ReduxProvider } from "react-redux"

const ChessGame = () => {
  const board = useSelector(state => state.board)
  return <ChessBoard board={board} />
}

export default () => {
  return (
    <ReduxProvider store={store}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <ChessGame />
        <CustomDragPreview />
      </DndProvider>
    </ReduxProvider>
  )
}
