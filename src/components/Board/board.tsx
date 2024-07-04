import { useState } from "react";
import {
  imageMatrix,
  updateBoard,
  updatePathInBoard,
} from "../../utils/helper";
import "./board.css";
function board() {
  const [referenceVal, setReferenceVal] = useState<number[][]>([]);
  const [piece, setPiece] = useState<number[]>([]);
  const [matrix, setMatrix] = useState<string[][]>(imageMatrix);
  const [hightlightValue, sethightlightValue] = useState<number[][]>([]);
  const [whosTurn, setWhosTurn] = useState("white");
  const [takeDown, setTakeDown] = useState<number[][]>([]);
  const [capturedPieces, setCapturedPieces] = useState<{
    [key: string]: string[];
  }>({
    whitePieces: [],
    blackPieces: [],
  });
  const [kingPositions , setKingPositions] = useState<{
    [key: string]: number[];
  }>({
    whiteKing: [7,4],
    blackKing: [0,4],
  });
  return (
    <>
      <div className="Player blackPlayer">
        <p>Player 1</p>
        <div className="capturedPieces">
          {capturedPieces["whitePieces"].map((element, index) => (
            <img key={index} src={element} alt={`Captured piece ${index}`} />
          ))}
        </div>
      </div>
      <div className="board">
        {Array.from({ length: 8 }).map((_, rowIndex) => {
          const row: number = rowIndex;
          return (
            <div key={rowIndex} className={`row ${`row${rowIndex}`}`}>
              {Array.from({ length: 8 }).map((_, colIndex) => {
                const col: number = colIndex;
                return (
                  <div
                    key={colIndex}
                    className={`${
                      (col + row) % 2 == 0 ? "yellowBox" : "greenBox"
                    } ${
                      hightlightValue.findIndex(
                        (value) => value[0] == row && value[1] == col
                      ) > -1
                        ? "possibleMove"
                        : ""
                    } ${
                      piece[0] == row &&
                      piece[1] == col &&
                      matrix[piece[0]][piece[1]]
                        ? "clickedBox"
                        : ""
                    } ${
                      takeDown.findIndex(
                        (value) => value[0] == row && value[1] == col
                      ) > -1
                        ? "cuttingPiece"
                        : ""
                    }`}
                    onClick={() => {
                      updatePathInBoard(
                        row,
                        col,
                        matrix,
                        setPiece,
                        sethightlightValue,
                        setReferenceVal,
                        whosTurn,
                        setTakeDown,
                        kingPositions
                      );
                      updateBoard(
                        row,
                        col,
                        JSON.parse(JSON.stringify(matrix)),
                        setMatrix,
                        setReferenceVal,
                        referenceVal,
                        piece,
                        whosTurn,
                        setWhosTurn,
                        sethightlightValue,
                        setTakeDown,
                        setCapturedPieces,
                        setKingPositions
                      );
                    }}
                  >
                    {matrix[row][col] && (
                      <img src={matrix[row][col]} alt="pieces" />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="Player blackPlayer">
        <p>Player 2</p>
        <div className="capturedPieces">
          {capturedPieces["blackPieces"].map((element, index) => (
            <img key={index} src={element} alt={`Captured piece ${index}`} />
          ))}
        </div>
      </div>
    </>
  );
}

export default board;
