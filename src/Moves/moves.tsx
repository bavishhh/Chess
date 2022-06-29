import { PieceType } from "../consts";
import { SquareState } from "../Square/Square";
import pawnMoves from "./pawnMoves";

export default function validMoves(board: SquareState[], grabbedSquareIdx: number) {
    if (board[grabbedSquareIdx].piece === PieceType.PAWN) {
        return pawnMoves(board, grabbedSquareIdx);
    }
    return [];
}