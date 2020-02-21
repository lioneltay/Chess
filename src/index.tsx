// Add typescript support for the styled-components css prop (https://www.styled-components.com/docs/api#css-prop)
/// <reference types="styled-components/cssprop" />
import "core-js/stable"
import "regenerator-runtime/runtime"
import React from "react"

import { render } from "react-dom"
import App from "./App"

render(<App />, document.getElementById("app"))
