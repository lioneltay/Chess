import { css } from 'styled-components'

export default css`
  .block {
    display: block;
  }

  .inline {
    display: inline;
  }
  .disabled {
    filter: grayscale(1);
    cursor: not-allowed;
    pointer-events: none;
  }
`
