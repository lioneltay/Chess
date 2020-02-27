import { css } from 'styled-components'
import { BORDER_RADIUS, BORDER_RADIUS_LARGE } from 'styles/constants'

export default css`
  .not-rounded {
    border-radius: 0px;
  }

  .rounded {
    border-radius: ${BORDER_RADIUS}px;
  }
  .rounded-tr {
    border-top-right-radius: ${BORDER_RADIUS}px;
  }
  .rounded-tl {
    border-top-left-radius: ${BORDER_RADIUS}px;
  }
  .rounded-br {
    border-bottom-right-radius: ${BORDER_RADIUS}px;
  }
  .rounded-bl {
    border-bottom-left-radius: ${BORDER_RADIUS}px;
  }
  .rounded-t {
    border-top-right-radius: ${BORDER_RADIUS}px;
    border-top-left-radius: ${BORDER_RADIUS}px;
  }
  .rounded-l {
    border-top-left-radius: ${BORDER_RADIUS}px;
    border-bottom-left-radius: ${BORDER_RADIUS}px;
  }
  .rounded-r {
    border-bottom-right-radius: ${BORDER_RADIUS}px;
    border-top-right-radius: ${BORDER_RADIUS}px;
  }
  .rounded-b {
    border-bottom-left-radius: ${BORDER_RADIUS}px;
    border-bottom-right-radius: ${BORDER_RADIUS}px;
  }

  .rounded-lg {
    border-radius: ${BORDER_RADIUS_LARGE}px;
  }
  .rounded-tr-lg {
    border-top-right-radius: ${BORDER_RADIUS_LARGE}px;
  }
  .rounded-tl-lg {
    border-top-left-radius: ${BORDER_RADIUS_LARGE}px;
  }
  .rounded-br-lg {
    border-bottom-right-radius: ${BORDER_RADIUS_LARGE}px;
  }
  .rounded-bl-lg {
    border-bottom-left-radius: ${BORDER_RADIUS_LARGE}px;
  }
  .rounded-t-lg {
    border-top-right-radius: ${BORDER_RADIUS_LARGE}px;
    border-top-left-radius: ${BORDER_RADIUS_LARGE}px;
  }
  .rounded-l-lg {
    border-top-left-radius: ${BORDER_RADIUS_LARGE}px;
    border-bottom-left-radius: ${BORDER_RADIUS_LARGE}px;
  }
  .rounded-r-lg {
    border-bottom-right-radius: ${BORDER_RADIUS_LARGE}px;
    border-top-right-radius: ${BORDER_RADIUS_LARGE}px;
  }
  .rounded-b-lg {
    border-bottom-left-radius: ${BORDER_RADIUS_LARGE}px;
    border-bottom-right-radius: ${BORDER_RADIUS_LARGE}px;
  }
`
