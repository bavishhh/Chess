import { PieceType } from "../consts";
import { SquareState } from "../Square/Square";
import pawnMoves from "./pawnMoves";
import knightMoves from "./knightMoves";
import rookMoves from "./rookMoves";
import queenMoves from "./queenMoves";
import bishopMoves from "./bishopMoves";

export const toIdx = (row:number, col:number) => {
    return row * 8 + col;
}

export default function validMoves(board: SquareState[], grabbedSquareIdx: number) {
    switch (board[grabbedSquareIdx].piece.type) {
        case PieceType.PAWN:
            return pawnMoves(board, grabbedSquareIdx);
        
        case PieceType.KNIGHT:
            return knightMoves(board, grabbedSquareIdx);

        case PieceType.ROOK:
            return rookMoves(board, grabbedSquareIdx);

        case PieceType.BISHOP:
            return bishopMoves(board, grabbedSquareIdx);

        case PieceType.QUEEN:
            return queenMoves(board, grabbedSquareIdx);
    }
    return [];
}