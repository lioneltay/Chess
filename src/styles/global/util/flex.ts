import { css } from 'styled-components'

export default css`
  .f-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .f-nowrap {
    display: flex;
    flex-wrap: nowrap;
  }
  .flex {
    display: flex;
  }
  .fd-c {
    display: flex;
    flex-direction: column;
  }
  .fd-cr {
    display: flex;
    flex-direction: column-reverse;
  }
  .fd-r {
    display: flex;
    flex-direction: row;
  }
  .fd-rr {
    display: flex;
    flex-direction: row-reverse;
  }
  .fj-s {
    display: flex;
    justify-content: flex-start;
  }
  .fj-e {
    display: flex;
    justify-content: flex-end;
  }
  .fj-c {
    display: flex;
    justify-content: center;
  }
  .fj-sb {
    display: flex;
    justify-content: space-between;
  }
  .fj-se {
    display: flex;
    justify-content: space-evenly;
  }
  .fj-sa {
    display: flex;
    justify-content: space-around;
  }
  .fa-s {
    display: flex;
    align-items: flex-start;
  }
  .fa-st {
    display: flex;
    align-items: stretch;
  }
  .fa-c {
    display: flex;
    align-items: center;
  }
  .fa-e {
    display: flex;
    align-items: flex-end;
  }
  .fa-b {
    display: flex;
    align-items: baseline;
  }
  .fas-s {
    align-self: flex-start;
  }
  .fas-st {
    align-self: stretch;
  }
  .fas-c {
    align-self: center;
  }
  .fas-e {
    align-self: flex-end;
  }
  ${[0, 1, 2, 3, 4].map(
    v => css`
      .fg-${v} {
        flex-grow: ${v};
      }

      .fs-${v} {
        flex-shrink: ${v};
      }
    `
  )}
  .fb-0 {
    flex-basis: 0;
  }
  .fb-a {
    flex-basis: auto;
  }
`
