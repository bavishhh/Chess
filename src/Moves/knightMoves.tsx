import { PieceType } from "../consts";
import { SquareState } from "../Square/Square"
import {toIdx} from "./moves"; 

export default function knightMoves(board: SquareState[], grabbedSquareIdx: number) {
    let validMoves: number[] = [];

    const grabbedPieceColor = board[grabbedSquareIdx].piece.color;
    const row = board[grabbedSquareIdx].row;
    const col = board[grabbedSquareIdx].col;

    const dir = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

    for (let i=0; i<8; i++) {
        const destRow = row + dir[i][0];
        const destCol = col + dir[i][1];
        const destSquare = toIdx(destRow, destCol);

        if (destRow >= 0 &&
            destRow < 8 &&
            destCol >= 0 &&
            destCol < 8 &&
            (board[destSquare].piece.type === PieceType.NONE ||
             board[destSquare].piece.color !== grabbedPieceColor)) {
                validMoves.push(destSquare)
        }
    }

    return validMoves;
}