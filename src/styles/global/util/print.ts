import { css } from 'styled-components'

export default css`
  @media print {
    .no-print,
    .no-print * {
      display: none !important;
    }
  }

  @media print {
    .pagebreak {
      display: block;
      page-break-before: always;
      break-before: page;
    }
  }
`
