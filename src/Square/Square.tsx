import { Color, PieceType } from "../consts";
import './Square.css';

export type SquareState = {
    row: number;
    col: number;
    piece: number;
    color: Color | null;
    highlighted?: boolean;
}

export default function Square(props: SquareState) {
    const color = (props.row + props.col + 1) % 2 ? Color.WHITE : Color.BLACK;
    let className = "cell";
    className += (color === Color.WHITE) ? " cell-white" : " cell-black";
    className += props.highlighted ? "-highlighted" : "";

    let piece = null;
    if (props.piece) {
        if (props.color === Color.WHITE) {
            switch(props.piece) {
              case PieceType.PAWN:
                piece = 'assets/pawn_w.png'
                break;
              case PieceType.BISHOP:
                piece = 'assets/bishop_w.png'
                break;
              case PieceType.ROOK:
                piece = 'assets/rook_w.png'
                break;
              case PieceType.KING:
                piece = 'assets/king_w.png'
                break
              case PieceType.KNIGHT:
                piece = 'assets/knight_w.png'
                break
              case PieceType.QUEEN:
                piece = 'assets/queen_w.png'
                break
            }
        }
        else if (props.color === Color.BLACK) {
          switch(props.piece) {
            case PieceType.PAWN:
              piece = 'assets/pawn_b.png'
              break;
            case PieceType.BISHOP:
              piece = 'assets/bishop_b.png'
              break;
            case PieceType.ROOK:
              piece = 'assets/rook_b.png'
              break;
            case PieceType.KING:
              piece = 'assets/king_b.png'
              break
            case PieceType.KNIGHT:
              piece = 'assets/knight_b.png'
              break
            case PieceType.QUEEN:
              piece = 'assets/queen_b.png'
              break
          }
      }
    }

    return <span className={className}>
        {piece && <div style={{backgroundImage: `url(${piece})`}} className="chess-piece"></div> }
    </span> 
}
