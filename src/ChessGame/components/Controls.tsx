import React, { useEffect } from "react"
import { useActions, useSelector } from "ChessGame/store"
import {
  FastForward,
  FastRewind,
  SkipNext,
  SkipPrevious,
  Replay,
  ScreenRotation,
  Computer,
  Menu,
} from "@material-ui/icons"
import { IconButton, Tooltip } from "@material-ui/core"

export default () => {
  const {
    undo,
    goBack,
    goEnd,
    goForward,
    goStart,
    flipBoard,
    setShowBestMove,
  } = useActions()

  const { showBestMove, atEnd, atStart } = useSelector((state, s) => ({
    showBestMove: state.showBestMove,
    atEnd: !s.navigating(state),
    atStart: state.historyCursor === 0,
  }))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault()
          return goEnd()
        }
        case "ArrowUp": {
          e.preventDefault()
          return goStart()
        }
        case "ArrowLeft": {
          e.preventDefault()
          return goBack()
        }
        case "ArrowRight": {
          e.preventDefault()
          return goForward()
        }
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  return (
    <div>
      <Tooltip title="Show best move">
        <IconButton onClick={() => setShowBestMove({ show: !showBestMove })}>
          <Computer color={showBestMove ? "primary" : undefined} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Flip board">
        <IconButton onClick={flipBoard}>
          <ScreenRotation />
        </IconButton>
      </Tooltip>

      <Tooltip title="Undo">
        <IconButton onClick={undo}>
          <Replay />
        </IconButton>
      </Tooltip>

      <IconButton onClick={goStart} disabled={atStart}>
        <FastRewind />
      </IconButton>

      <IconButton onClick={goBack} disabled={atStart}>
        <SkipPrevious />
      </IconButton>

      <IconButton onClick={goForward} disabled={atEnd}>
        <SkipNext />
      </IconButton>

      <IconButton onClick={goEnd} disabled={atEnd}>
        <FastForward />
      </IconButton>

      <IconButton>
        <Menu />
      </IconButton>
    </div>
  )
}
