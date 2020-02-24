import { Chess } from "./chess.js"
import { Board, Move, FEN, PieceInfo, ChessColor, Square, PGN } from "types"
import { reverse } from "ramda"

export const NEW_GAME_FEN = Chess().fen()

export const flipBoard = (board: Board): Board =>
  reverse(board).map(item => reverse(item))

export const getValidMoves = (fen: FEN, square: Square): Square[] => {
  const game = Chess(fen)
  return game.moves({ square, verbose: true }).map(item => item.to)
}

export const fenToBoard = (fen: FEN): Board => {
  return Chess(fen).board()
}

export const fenToPgn = (fen: FEN): PGN => {
  return Chess(fen).pgn()
}

export const pgnToFen = (pgn: PGN): FEN => {
  const game = Chess()
  game.load_pgn(pgn)
  return game.fen()
}

export const move = (fen: FEN, move: Move): FEN => {
  const game = Chess(fen)
  game.move(move)
  return game.fen()
}

export const getPiece = (fen: FEN, square: Square): PieceInfo | null => {
  const game = Chess(fen)
  return game.get(square)
}

type GameState = {
  board: Board
  turn: ChessColor
  inCheck: boolean
  inCheckmate: boolean
  inStalemate: boolean
  insufficientMaterial: boolean
  inThreeFoldRepitition: boolean
  inDraw: boolean
}

export const fenToGameState = (fen: FEN): GameState => {
  const game = Chess(fen)

  return {
    board: game.board(),
    turn: game.turn(),
    inCheck: game.in_check(),
    inCheckmate: game.in_checkmate(),
    inStalemate: game.in_stalemate(),
    insufficientMaterial: game.insufficient_material(),
    inThreeFoldRepitition: game.in_threefold_repetition(),
    inDraw: game.in_draw(),
  }
}
