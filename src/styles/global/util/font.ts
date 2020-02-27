import { css } from 'styled-components'

function fontWeight() {
  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]

  return weights
    .map(
      weight => `
        .text-${weight} {
          font-weight: ${weight};
        }
      `
    )
    .join('\n')
}

export default css`
  ${fontWeight()}
`
