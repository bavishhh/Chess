import Square, { SquareState } from "../Square/Square";
import { Color, PieceType } from "../consts";
import "./Board.css";
import { MouseEvent, useState, useRef } from "react";

const getInitialBoard = () => {
  let board: SquareState[] = [];
  // Construct the squares
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareState: SquareState = {
        row: row,
        col: col,
        color: null,
        piece: PieceType.NONE,
      };
      board.push(squareState);
    }
  }

  // Place the pieces in starting position
  for (let i = 0; i < 8; i++) {
    board[8 + i] = {...board[8 + i], piece: PieceType.PAWN, color: Color.BLACK}
    board[8*6 + i] = {...board[8*6 + i], piece: PieceType.PAWN, color: Color.WHITE}
  }
  board[0] = {...board[0], piece: PieceType.ROOK, color: Color.BLACK};
  board[1] = {...board[1], piece: PieceType.KNIGHT, color: Color.BLACK};
  board[2] = {...board[2], piece: PieceType.BISHOP, color: Color.BLACK};
  board[3] = {...board[3], piece: PieceType.QUEEN, color: Color.BLACK};
  board[4] = {...board[4], piece: PieceType.KING, color: Color.BLACK};
  board[5] = {...board[5], piece: PieceType.BISHOP, color: Color.BLACK};
  board[6] = {...board[6], piece: PieceType.KNIGHT, color: Color.BLACK};
  board[7] = {...board[7], piece: PieceType.ROOK, color: Color.BLACK};

  board[8*7 + 0] = {...board[8*7 + 0], piece: PieceType.ROOK, color: Color.WHITE};
  board[8*7 + 1] = {...board[8*7 + 1], piece: PieceType.KNIGHT, color: Color.WHITE};
  board[8*7 + 2] = {...board[8*7 + 2], piece: PieceType.BISHOP, color: Color.WHITE};
  board[8*7 + 3] = {...board[8*7 + 3], piece: PieceType.QUEEN, color: Color.WHITE};
  board[8*7 + 4] = {...board[8*7 + 4], piece: PieceType.KING, color: Color.WHITE};
  board[8*7 + 5] = {...board[8*7 + 5], piece: PieceType.BISHOP, color: Color.WHITE};
  board[8*7 + 6] = {...board[8*7 + 6], piece: PieceType.KNIGHT, color: Color.WHITE};
  board[8*7 + 7] = {...board[8*7 + 7], piece: PieceType.ROOK, color: Color.WHITE};

  return board;
};

export default function Board() {
  const initalBoard = getInitialBoard();

  const [board, updateBoard] = useState(initalBoard);
  const [grabbedPiece, setGrabbedPiece] = useState<HTMLElement | null>(null);
  const [grabbedSquare, setGrabbedSquare] = useState<number | null>(null);

  const chessboardRef = useRef<HTMLDivElement>(null);
  const currentPlayerRef = useRef<Color>(Color.WHITE);

  // const handleClickSquare = (idx: number) => {
  //   const row = Math.floor(idx / 8);
  //   const col = idx % 8;

  //   updateBoard(
  //     board.map((squareState) =>
  //       squareState.row === row && squareState.col === col
  //         ? { ...squareState, highlighted: !squareState.highlighted }
  //         : { ...squareState }
  //     )
  //   );
  // };

  const grabPiece = (e: MouseEvent, sqIdx: number) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece") && currentPlayerRef.current === board[sqIdx].color) {
      setGrabbedPiece(element);
      setGrabbedSquare(sqIdx);
    }
  };

  const movePiece = (e: MouseEvent) => {
    if (grabbedPiece) {
      const x = e.clientX - 30;
      const y = e.clientY - 30;
      grabbedPiece.style.position = "absolute";
      grabbedPiece.style.left = `${x}px`;
      grabbedPiece.style.top = `${y}px`;
    }
  };

  const dropPiece = (e: MouseEvent) => {
    const chessboard = chessboardRef.current;
    if (chessboard && grabbedPiece && grabbedSquare) {
      // Compute dragging limits
      const minLeft = chessboard.offsetLeft + 10;
      const maxLeft = chessboard.offsetLeft + chessboard.clientWidth - 10;
      const minTop = chessboard.offsetTop + 10;
      const maxTop = chessboard.offsetTop + chessboard.clientHeight - 10;

      const col = Math.floor((e.clientX - chessboard.offsetLeft) / 60);
      const row = Math.floor((e.clientY - chessboard.offsetTop) / 60);
      const droppedSquare = row * 8 + col;

      if (
        e.clientX >= minLeft &&
        e.clientX <= maxLeft &&
        e.clientY >= minTop &&
        e.clientY <= maxTop &&
        grabbedSquare !== droppedSquare
      ) {
        let newBoard = board;
        newBoard[droppedSquare].piece = board[grabbedSquare].piece;
        newBoard[droppedSquare].color = board[grabbedSquare].color;
        newBoard[grabbedSquare].piece = PieceType.NONE;

        updateBoard(newBoard);
        currentPlayerRef.current = (currentPlayerRef.current === Color.WHITE) ? Color.BLACK : Color.WHITE;

      } else {
        grabbedPiece.style.position = "relative";
        grabbedPiece.style.top = "0px";
        grabbedPiece.style.left = "0px";
      }
    }

    setGrabbedPiece(null);
    setGrabbedSquare(null);
  };

  return (
    <div id="chessboard" ref={chessboardRef}>
      {board.map((squareState, idx) => (
        <span
          key={idx}
          onMouseDown={(e) => {
            grabPiece(e, idx);
          }}
          onMouseMove={(e) => {
            movePiece(e);
          }}
          onMouseUp={(e) => {
            dropPiece(e);
          }}
        >
          <Square {...squareState} />
        </span>
      ))}
    </div>
  );
}
