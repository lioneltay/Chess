import React, { useEffect, Fragment, useState } from "react"
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

import SettingsModal from "./SettingsModal"

export default () => {
  const {
    undo,
    goBack,
    goEnd,
    goForward,
    goStart,
    flipBoard,
    setEngineOn,
  } = useActions()

  const { engineOn, atEnd, atStart } = useSelector((state, s) => ({
    engineOn: state.engineOn,
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

  const [open, setOpen] = useState(true)

  return (
    <Fragment>
      <SettingsModal open={open} onClose={() => setOpen(false)} />

      <div>
        <Tooltip title={`Engine ${engineOn ? "On" : "Off"}`}>
          <IconButton onClick={() => setEngineOn({ show: !engineOn })}>
            <Computer color={engineOn ? "primary" : undefined} />
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

        <IconButton onClick={() => setOpen(true)}>
          <Menu />
        </IconButton>
      </div>
    </Fragment>
  )
}
