import { Color, PieceType } from "../consts";
import { SquareState } from "../Square/Square";
import { toIdx } from "./moves";

export default function pawnMoves(
  board: SquareState[],
  grabbedSquareIdx: number
) {
  let validMoves: number[] = [];

  const grabbedPieceColor = board[grabbedSquareIdx].piece.color;
  const row = board[grabbedSquareIdx].row;
  const col = board[grabbedSquareIdx].col;

  if (grabbedPieceColor === Color.WHITE) {
    if (board[toIdx(row - 1, col)].piece.type === PieceType.NONE)
      validMoves.push(toIdx(row - 1, col));

    if (
      row === 6 &&
      board[toIdx(row - 1, col)].piece.type === PieceType.NONE &&
      board[toIdx(row - 2, col)].piece.type === PieceType.NONE
    ) {
      validMoves.push(toIdx(row - 2, col));
    }

    if (col > 0 && board[toIdx(row - 1, col - 1)].piece.color === Color.BLACK) {
      validMoves.push(toIdx(row - 1, col - 1));
    }

    if (col < 7 && board[toIdx(row - 1, col + 1)].piece.color === Color.BLACK) {
      validMoves.push(toIdx(row - 1, col + 1));
    }
  } else {
    if (board[toIdx(row + 1, col)].piece.type === PieceType.NONE)
      validMoves.push(toIdx(row + 1, col));

    if (
      row === 1 &&
      board[toIdx(row + 2, col)].piece.type === PieceType.NONE &&
      board[toIdx(row + 2, col)].piece.type === PieceType.NONE
    ) {
      validMoves.push(toIdx(row + 2, col));
    }

    if (col > 0 && board[toIdx(row + 1, col - 1)].piece.color === Color.WHITE) {
      validMoves.push(toIdx(row + 1, col - 1));
    }

    if (col < 7 && board[toIdx(row + 1, col + 1)].piece.color === Color.WHITE) {
      validMoves.push(toIdx(row + 1, col + 1));
    }
  }

  return validMoves;
}
