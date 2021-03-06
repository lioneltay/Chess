# Chess App

Basic Chess App

## Features

- Complete Chess Logic/Rules
- Drag and drop with `react-dnd`
- Stockfish AI opponent and game analysis
- Basic game controls (undo/forwards/backwards)

## Tech

- Typescript
- Drag and drop with `react-dnd`
- `redux` state management
- `redux-observable` + WebWorker for async best move calculations
- `howler` for game sounds
- `styled-components` css in jss styling
- `@material-ui` material design components
- `formik` forms
- Hosted on Google App Engine
- TravisCI deployment

# Tasks

- [x] Add sprites

- [x] fix performance issues

  - [x] Context selector solution (this seems to be the sole issue)

* [x] Add touch/tap/click control along with drag

- [x] check highlight

- [x] move sound

- [x] take sound

- [x] Deploy to chess.lioneltay.com

- [x] Automate deployment with TravisCI

- [x] mobile drag support

- [x] custom drag preview

  - https://react-dnd.github.io/react-dnd/examples/drag-around/custom-drag-layer

- [x] undo functionality

- [x] refactor

  - [x] remove use of game object from state, convert to pure functions which utilize Chess object internally

- [x] rewind/replay/start/end functionality
  - [ ] Keyboard shortcuts left right up down

* [x] Drawing Circles
  - [x] red and green

- [x] use svg for text labels so they scale with viewport

- [x] Drawing Arrows

  - [x] red and green

- [x] flip board

- [x] play as black

* [x] Implement AI opponent (Stockfish) (https://github.com/nmrugg/stockfish.js)

- [x] show best moves functionality

- [x] undo during ais turn (coniditonally go back 1 or 2 turns)

- [ ] refactor all state manipulation logic into selectors

- [x] Moves should always be applied to latest board
- [x] disable movement of ai pieces
- [x] Save history of moves to highlight previous moves

* [x] create an rxjs stream

* [x] redux observable for best move calculations

* [x] show animated score bar

* [x] improve performance (many rerenders)
  - [x] Expand selectors
  - [x] memoize board selector
  - [x] React.memo

- [x] Ai without show best move

* [x] double ai mode

- [x] Start new game button
  - [x] install material ui
  - [x] create modal
  - [x] Show options
  - [x] Toggle Choose ai
  - [x] choose side

* [ ] Add promotion

  - [ ] ai promotion

- [ ] draw detection
- [ ] stalemate detection
- [ ] checkmate detection
- [ ] game over detection

- [ ] show end game status
- [ ] winner, draw, stalemate

- [ ] [bug] evaluation bar goes up and down on every move

* [ ] improve performance

- [ ] Test the drag and drop functionality
