import React from "react"
import ChessGame from "ChessGame"
import { StylesProvider } from "@material-ui/core"
import GlobalStyles from "styles/global/util"

export default () => {
  return (
    <StylesProvider injectFirst>
      <GlobalStyles />
      <ChessGame />
    </StylesProvider>
  )
}
