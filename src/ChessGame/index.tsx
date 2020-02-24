import React, { useEffect } from "react"
import { noopTemplate as css } from "lib/utils"
import { DndProvider } from "react-dnd"
import MultiBackend from "react-dnd-multi-backend"
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch"

import { ChessBoard, SVGOverlay } from "ChessGame/components"
import { Controls } from "ChessGame/components"
import { CustomDragPreview } from "ChessGame/components"

import { store, useSelector, useActions } from "./store"

import { Provider as ReduxProvider } from "react-redux"

import { getBestMove } from "lib/chess"

const ChessGame = () => {
  const { move, setBestMove } = useActions()
  const { board, flippedBoard, ai, turn, fen, showBestMove } = useSelector(
    state => ({
      board: state.board,
      flippedBoard: state.flippedBoard,
      ai: state.ai,
      turn: state.turn,
      fen: state.fen,
      showBestMove: state.showBestMove,
    }),
  )

  const state = useSelector(state => {
    const blarg = { ...state }
    delete blarg.board
    delete blarg.circles
    return blarg
  })

  useEffect(() => {
    if (ai?.color === turn) {
      getBestMove(fen).then(bestMove => {
        if (bestMove) {
          move(bestMove)
        }
      })
    }
  }, [ai?.color === turn])

  useEffect(() => {
    if (showBestMove) {
      getBestMove(fen, move => setBestMove({ move }))
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
        <ChessBoard board={board} flippedBoard={flippedBoard} />
        <SVGOverlay />
      </div>
      {/* <div>{state.fen}</div>
      <pre>{JSON.stringify(state, null, 2)}</pre> */}
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
