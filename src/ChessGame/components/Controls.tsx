import React, { useEffect } from "react"
import { useActions } from "ChessGame/store"

export default () => {
  const { undo, goBack, goEnd, goForward, goStart, flipBoard } = useActions()

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
      <h1>Controls</h1>
      <button onClick={flipBoard}>Flip Board</button>
      <button onClick={undo}>Undo</button>
      <button onClick={goStart}>Start</button>
      <button onClick={goBack}>Back</button>
      <button onClick={goForward}>Forward</button>
      <button onClick={goEnd}>End</button>
    </div>
  )
}
