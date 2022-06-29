import { Color, PieceType } from "../consts";
import { SquareState } from "../Square/Square"

const toIdx = (row:number, col:number) => {
    return row * 8 + col;
} 

export default function pawnMoves(board: SquareState[], grabbedSquareIdx: number) {
    let validMoves: number[] = [];

    const grabbedPieceColor = board[grabbedSquareIdx].color;
    const row = board[grabbedSquareIdx].row;
    const col = board[grabbedSquareIdx].col;

    if (grabbedPieceColor === Color.WHITE) {
        if (board[toIdx(row - 1, col)].piece === PieceType.NONE)
            validMoves.push(toIdx(row - 1, col));

        if (row === 6 && board[toIdx(row - 2, col)].piece === PieceType.NONE) {
            validMoves.push(toIdx(row - 2, col));
        }

        if (col > 0 && board[toIdx(row - 1, col - 1)].color === Color.BLACK) {
            validMoves.push(toIdx(row - 1, col - 1));
        }

        if (col < 7 && board[toIdx(row - 1, col + 1)].color === Color.BLACK) {
            validMoves.push(toIdx(row - 1, col + 1));
        }
    }

    else {
        if (board[toIdx(row + 1, col)].piece === PieceType.NONE)
            validMoves.push(toIdx(row + 1, col));

        if (row === 1 && board[toIdx(row + 2, col)].piece === PieceType.NONE) {
            validMoves.push(toIdx(row + 2, col));
        }

        if (col > 0 && board[toIdx(row + 1, col - 1)].color === Color.WHITE) {
            validMoves.push(toIdx(row + 1, col - 1));
        }

        if (col < 7 && board[toIdx(row + 1, col + 1)].color === Color.WHITE) {
            validMoves.push(toIdx(row + 1, col + 1));
        }
    }

    return validMoves;
}