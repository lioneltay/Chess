import React, { useState } from "react"
import { noopTemplate as css } from "lib/utils"
import {
  Modal,
  Paper,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  IconButton,
  Avatar,
} from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { Person, Computer, Clear } from "@material-ui/icons"
import { Form, Formik } from "formik"
import { useSelector, useActions } from "ChessGame/store"

type Props = {
  open: boolean
  onClose: () => void
}

type Values = {
  white: Config
  black: Config
  flippedBoard: boolean
}

type Config = PlayerConfig | AiConfig
type PlayerConfig = "player"
type AiConfig = "ai"

export default ({ open, onClose }: Props) => {
  const { startNewGame } = useActions()

  const { white, black, flippedBoard } = useSelector((state, s) => ({
    flippedBoard: state.flippedBoard,
    white: state.white,
    black: state.black,
  }))

  return (
    <Formik<Values>
      initialValues={{
        flippedBoard,
        white,
        black,
      }}
      onSubmit={values => {
        console.log("submit!", values)
        onClose()
        startNewGame({
          white: values.white,
          black: values.black,
          flippedBoard: values.black === "player" && values.white !== "player",
        })
      }}
    >
      {({ values, setFieldValue }) => (
        <Modal open={open} onClose={onClose}>
          <div
            css={css`
              position: relative;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Form>
              <Paper
                css={css`
                  position: absolute;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 24px;
                  min-width: 240px;
                `}
              >
                <div
                  css={css`
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: white;
                    transform: translate(50%, -50%);
                    border-radius: 50%;
                  `}
                >
                  <IconButton onClick={onClose} size="small">
                    <Clear />
                  </IconButton>
                </div>

                <Typography variant="h5" gutterBottom>
                  Settings
                </Typography>

                <PlayerToggle
                  color="white"
                  value={values.white}
                  onChange={value => setFieldValue("white", value)}
                />

                <PlayerToggle
                  className="mt-4"
                  color="black"
                  value={values.black}
                  onChange={value => setFieldValue("black", value)}
                />

                <div className="fj-e mt-4">
                  <Button color="primary" type="submit" variant="outlined">
                    Start
                  </Button>
                </div>
              </Paper>
            </Form>
          </div>
        </Modal>
      )}
    </Formik>
  )
}

type PlayerToggleProps = Stylable & {
  value: Config
  onChange: (value: Config) => void
  color: "white" | "black"
}

const PlayerToggle = ({
  value,
  onChange,
  color,
  ...rest
}: PlayerToggleProps) => {
  return (
    <div
      {...rest}
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 12px;
        align-items: center;
      `}
    >
      <div className="fj-e">
        <Avatar>
          {value === "ai" ? (
            <Computer
              css={css`
                color: ${color};
              `}
            />
          ) : (
            <Person
              css={css`
                color: ${color};
              `}
            />
          )}
        </Avatar>
      </div>

      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, value) => {
          if (value !== null) {
            onChange(value)
          }
        }}
        aria-label="text alignment"
      >
        <ToggleButton value="player">
          <Person />
        </ToggleButton>

        <ToggleButton value="ai">
          <Computer />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
