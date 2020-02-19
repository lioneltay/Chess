import React from "react"
import styled from "styled-components"
import { noopTemplate as css } from "lib/utils"

const Box = styled.div`
  margin: 20px;
  width: 150px;
  height: 150px;
  background: grey;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

export default () => {
  return (
    <div>
      <h1>Demo</h1>

      <Box>Apple</Box>
      <Box>Orange</Box>

      <Box>Dropzone</Box>
    </div>
  )
}
