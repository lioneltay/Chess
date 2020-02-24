export * from "./chess-logic"
export * from "./utils"
export * from "./engine"
export { Chess } from "./chess.js"
// replace with export type when typescript 3.9 is ready
import { ChessInstance as ChessInstanceType } from "./chess.js"
export type ChessInstance = ChessInstanceType
