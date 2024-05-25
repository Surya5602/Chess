import { useEffect, useState } from "react";
import { imageMatrix, updateBoard , updatePathInBoard } from '../../utils/helper'
import "./board.css";
function board() {
  const [referenceVal, setReferenceVal] = useState<number[][]>([]);
  const [piece , setPiece] = useState<number[]>([]);
  const [wrongMove , setWrongMove] = useState<number[]>([]);
  const [matrix, setMatrix] = useState<string[][]>(imageMatrix);
  const [hightlightValue , sethightlightValue] = useState<number[][]>([]);
  const [whosTurn , setWhosTurn] = useState('white');
  useEffect(()=>{
    console.log(whosTurn)
  },[whosTurn])
  return (
    <>
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
                    className={`${(col + row) % 2 == 0 ? "yellowBox" : "greenBox"
                      } ${hightlightValue.findIndex((value)=> value[0] == row && value[1]==col) > -1 ? "possibleMove" : ""} ${ piece[0]==row && piece[1] == col && matrix[piece[0]][piece[1]] ? "clickedBox" : ""} ${wrongMove[0] == row && wrongMove[1] == col ? "wrongMove" : ""}`}
                    onClick={() => {
                      updatePathInBoard(row, col, matrix, setMatrix, setPiece, sethightlightValue , setReferenceVal ,whosTurn );
                      updateBoard(row, col, matrix, setMatrix, setReferenceVal, referenceVal , piece ,setPiece , wrongMove , setWrongMove , whosTurn, setWhosTurn , sethightlightValue);
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
    </>
  );
}

export default board;
