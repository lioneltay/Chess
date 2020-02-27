import React, { useEffect } from "react"
import { noopTemplate as css } from "lib/utils"
import { DndProvider } from "react-dnd"
import MultiBackend from "react-dnd-multi-backend"
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch"

import { ChessBoard } from "ChessGame/components"
import { Controls } from "ChessGame/components"
import { CustomDragPreview } from "ChessGame/components"

import { configureStore, useSelector, useActions } from "./store"

import { Provider as ReduxProvider } from "react-redux"

const ChessGame = () => {
  const { calculateBestMove } = useActions()
  const { turn, fen, showBestMove, historyCursor } = useSelector(
    (state, s) => ({
      historyCursor: state.historyCursor,
      turn: s.turn(state),
      fen: s.fen(state),
      showBestMove: state.showBestMove,
    }),
  )

  useEffect(() => {
    if (showBestMove) {
      calculateBestMove({ fen, historyCursor })
    }
  }, [showBestMove, turn])

  return (
    <div>
      <div
        css={css`
          position: relative;
          margin-left: auto;
          margin-right: auto;
          max-width: 1000px;
        `}
      >
        <ChessBoard />
        <div className="fj-e">
          <Controls />
        </div>
      </div>
    </div>
  )
}

export default () => {
  return (
    <ReduxProvider store={configureStore()}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <ChessGame />
        <CustomDragPreview />
        {/* <ShowState /> */}
      </DndProvider>
    </ReduxProvider>
  )
}

const ShowState = () => {
  const state = useSelector(state => state)

  const showState = { ...state }

  delete showState.circles
  delete showState.arrows

  return <pre>{JSON.stringify(showState, null, 2)}</pre>
}
