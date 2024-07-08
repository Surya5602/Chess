import "./modal.css";

interface ModalProps {
  value: string;
  onPieceSelect: (piece: string) => void;
}

const Modal: React.FC<ModalProps> = ({ value , onPieceSelect }) => {
  const pieceName = value !== "white" ? "b" : "w";
  const imageArray: string[][] = [
    [
      `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${pieceName}q.png`,
      "queen",
    ],
    [
      `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${pieceName}b.png`,
      "bishop",
    ],
    [
      `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${pieceName}n.png`,
      "knight",
    ],
    [
      `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${pieceName}r.png`,
      "rook",
    ],
  ];
  return (
    <div className="pawnUpdation">
      {imageArray.map((element, index) => (
        <div className="modal" key={index} onClick={() => onPieceSelect(element[0])}>
          <img src={element[0]} alt={element[1]} />
        </div>
      ))}
    </div>
  );
};
export default Modal;
