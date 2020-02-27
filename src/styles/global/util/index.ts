import { createGlobalStyle } from "styled-components"

import flex from "./flex"
import font from "./font"
import interaction from "./interaction"
// import resets from './resets'
import size from "./size"
import spacing from "./spacing"
import text from "./text"
import design from "./design"
import icon from "./icon"
import position from "./position"
import display from "./display"
import print from "./print"
// import widgets from './widgets'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  ${print}
  ${flex}
  ${size}
  ${font}
  ${interaction}
  ${spacing}
  ${text}
  ${design}
  ${icon}
  ${position}
  ${display}
`
