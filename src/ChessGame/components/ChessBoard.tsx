import React from "react"
import { noopTemplate as css } from "lib/utils"
import { Tile, SVGOverlay } from "ChessGame/components"
import { Board } from "types"
import { squareFromCoordinate, flipBoard } from "lib/chess"
import { clamp } from "ramda"

import { useSelector } from "ChessGame/store"

export default () => {
  const { board, flippedBoard } = useSelector((state, s) => {
    const rawBoard = s.board(state)
    const board = state.flippedBoard ? flipBoard(rawBoard) : rawBoard

    return {
      board,
      flippedBoard: state.flippedBoard,
    }
  })

  const showEvaluation = true

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 49fr ${showEvaluation ? "16px" : ""};

        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      `}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-auto-rows: 1fr;

            &::before {
              content: "";
              width: 0;
              padding-bottom: 100%;
              grid-row: 1 / 1;
              grid-column: 1 / 1;
            }

            & > *:first-child {
              grid-row: 1 / 1;
              grid-column: 1 / 1;
            }
          `}
        >
          {board.map((row, rowIndex) =>
            row.map((info, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                square={squareFromCoordinate([colIndex + 1, 8 - rowIndex], {
                  flippedBoard,
                })}
                pieceInfo={info}
              />
            )),
          )}
        </div>

        <SVGOverlay />
      </div>

      {showEvaluation && <EvaluationBar />}
    </div>
  )
}

const EvaluationBar = () => {
  const { evaluation, board, flippedBoard } = useSelector((state, s) => {
    const rawBoard = s.board(state)
    const board = state.flippedBoard ? flipBoard(rawBoard) : rawBoard

    return {
      evaluation: s.evaluation(state) || 0,
      board,
      flippedBoard: state.flippedBoard,
    }
  })

  const calculateScore = () => {
    const score = ((evaluation / 100 + 10) / 20) * 100
    return clamp(2, 98, score)
  }

  return (
    <div
      css={css`
        background: white;
        position: relative;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          background: #878787;
          width: 100%;
          height: ${100 - calculateScore()}%;
        `}
      />

      <div
        css={css`
          position: absolute;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        `}
      >
        <div />
        <div style={{ background: "#D8D8D8", height: 2 }} />
        <div style={{ background: "#D8D8D8", height: 2 }} />
        <div style={{ background: "#D8D8D8", height: 2 }} />
        <div style={{ background: "#EEBCAB", height: 5 }} />
        <div style={{ background: "#D8D8D8", height: 2 }} />
        <div style={{ background: "#D8D8D8", height: 2 }} />
        <div style={{ background: "#D8D8D8", height: 2 }} />
        <div />
      </div>
    </div>
  )
}
