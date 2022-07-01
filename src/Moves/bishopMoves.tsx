import { SquareState } from "../Square/Square"
import { toIdx } from "./moves"; 
import { PieceType } from "../consts";

export default function bishopMoves(board: SquareState[], grabbedSquareIdx: number) {
    let validMoves: number[] = [];

    const grabbedPieceColor = board[grabbedSquareIdx].piece.color;
    const row = board[grabbedSquareIdx].row;
    const col = board[grabbedSquareIdx].col;

    const dir = [[1, 1], [-1, 1], [1, -1], [-1, -1]];

    for (let i=0; i<4; i++) {
        let destRow = row + dir[i][0];
        let destCol = col + dir[i][1];

        while (destRow >= 0 && destRow < 8 && destCol >= 0 && destCol < 8) {
            const destSqIdx = toIdx(destRow, destCol);
            if (board[destSqIdx].piece.type !== PieceType.NONE) {
                if (board[destSqIdx].piece.color !== grabbedPieceColor) {
                    validMoves.push(destSqIdx);;
                }
                break;
            }
            validMoves.push(destSqIdx);
            destRow += dir[i][0];
            destCol += dir[i][1];
        }
    }
    return validMoves;
}