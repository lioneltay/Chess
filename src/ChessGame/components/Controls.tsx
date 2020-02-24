import React from "react"
import { useActions } from "ChessGame/store"

export default () => {
  const { undo } = useActions()

  return (
    <div>
      <h1>Controls</h1>
      <button onClick={undo}>Undo</button>
    </div>
  )
}
