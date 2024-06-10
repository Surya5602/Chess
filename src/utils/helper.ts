export const imageMatrix = [
    [
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png",
    ],
    [
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
    ],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    [
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
    ],
    [
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png",
        "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png",
    ],
]

export function updatePathInBoard(row: number, col: number, matrix: string[][], setMatrix: React.Dispatch<React.SetStateAction<string[][]>>, setPiece: React.Dispatch<React.SetStateAction<number[]>>, sethightlightValue: React.Dispatch<React.SetStateAction<number[][]>>, setReferenceVal: React.Dispatch<React.SetStateAction<number[][]>>, whosTurn: string, takeDown: number[][], setTakeDown: React.Dispatch<React.SetStateAction<number[][]>>
) {
    const extractedPieceName = findPiece(matrix[row][col])
    if ((extractedPieceName.includes("black") && whosTurn == "black") || (extractedPieceName.includes("white") && whosTurn == "white")) {
        const possibelPathArray = findPosibilePosition(extractedPieceName, row, col, setMatrix, matrix, whosTurn, takeDown, setTakeDown);
        setPiece((clickedPiece) => {
            clickedPiece = [row, col]
            return clickedPiece
        })
        sethightlightValue((prevVal: any) => {
            prevVal = possibelPathArray
            return prevVal
        })
        setReferenceVal((referenceVal) => {
            referenceVal = possibelPathArray
            return referenceVal
        });
        return possibelPathArray
    }
}

export function updateBoard(row: number, col: number, matrix: string[][], setMatrix: React.Dispatch<React.SetStateAction<string[][]>>, setReferenceVal: React.Dispatch<React.SetStateAction<number[][]>>, referenceVal: number[][], piece: number[], setPiece: React.Dispatch<React.SetStateAction<number[]>>, wrongMove: number[], setWrongMove: React.Dispatch<React.SetStateAction<number[]>>, whosTurn: string, setWhosTurn: React.Dispatch<React.SetStateAction<string>>, sethightlightValue: React.Dispatch<React.SetStateAction<number[][]>>, takeDown: number[][], setTakeDown: React.Dispatch<React.SetStateAction<number[][]>>
) {
    if (referenceVal) {
        referenceVal.map((move) => {
            if (row == move[0] && col == move[1]) {
                matrix[row][col] = matrix[piece[0]][piece[1]]
                matrix[piece[0]][piece[1]] = ""
                if (whosTurn == "white") {
                    setWhosTurn("black");
                }
                else {
                    setWhosTurn("white")
                }
                sethightlightValue((prevVal) => {
                    prevVal = []
                    return prevVal;
                })
                setReferenceVal((referenceVal) => {
                    referenceVal = []
                    return referenceVal
                });
                setTakeDown((prevVal) =>{
                    prevVal = []
                    return prevVal
                })
            }
        })
        setMatrix(matrix)
    }

}

const findPiece = (piece: string) => {
    let arrNameOfPiece = piece.split("/");
    let nameOfPiece = arrNameOfPiece[arrNameOfPiece.length - 1]
    let pieceName = ""
    switch (nameOfPiece) {
        case "bp.png":
            pieceName = "black-pawn"
            break;
        case "br.png":
            pieceName = "black-rook"
            break;
        case "bn.png":
            pieceName = "black-knight"
            break;
        case "bb.png":
            pieceName = "black-bishop"
            break;
        case "bk.png":
            pieceName = "black-king"
            break;
        case "bq.png":
            pieceName = "black-queen"
            break;
        case "wp.png":
            pieceName = "white-pawn"
            break;
        case "wr.png":
            pieceName = "white-rook"
            break;
        case "wn.png":
            pieceName = "white-knight"
            break;
        case "wb.png":
            pieceName = "white-bishop"
            break;
        case "wk.png":
            pieceName = "white-king"
            break;
        case "wq.png":
            pieceName = "white-queen"
            break;
        default:
            pieceName = "chess-coin"
            break;
    }
    return pieceName;
}

const findPosibilePosition = (pieceName: string, row: number, col: number, setMatrix: React.Dispatch<React.SetStateAction<string[][]>>, matrix: string[][], whosTurn: string, takeDown: number[][], setTakeDown: React.Dispatch<React.SetStateAction<number[][]>>) => {
    let possiblePaths: number[][] = []
    const temp = {
        upper: true,
        lower: true,
        left: true,
        right: true,
        leftUpper: true,
        rightLower: true,
        leftLower: true,
        rightUpper: true
    }
    const handleMove = (r: number, c: number, direction: keyof typeof temp) => {
        if (!isValidMove(r, c) || !temp[direction]) return;
        if (matrix[r][c] !== '') {
            const updateMove = removePathsOfSameTeam(r, c, matrix, whosTurn);
            if (updateMove === "sameTeam") {
                temp[direction] = false;
            } else if (updateMove === "oppositeTeam") {
                setTakeDown((preVal) => preVal = [...preVal, [r, c]]);
                temp[direction] = false;
            }
        } else {
            possiblePaths.push([r, c]);
        }
    };
    switch (pieceName) {
        case "black-pawn":
            if (row == 1) {
                if (isValidMove(row + 2, col) && matrix[row + 2][col] == '') {
                    let secondPossible: number[] = [row + 2, col]
                    possiblePaths.push(secondPossible)
                }
            }
            if (isValidMove(row + 1, col) && matrix[row + 1][col] == '') {
                let firstBlackPossible: number[] = [row + 1, col]
                possiblePaths.push(firstBlackPossible)
            }
            break;
        case "white-pawn":
            if (row == 6) {
                if (isValidMove(row - 2, col) && matrix[row - 2][col] == '') {
                    let secondPossible: number[] = [row - 2, col]
                    possiblePaths.push(secondPossible)
                }
            }
            if (isValidMove(row - 1, col) && matrix[row - 1][col] == '') {
                let firstWhitePossible: number[] = [row - 1, col]
                possiblePaths.push(firstWhitePossible)
            }
            break;
        case "white-rook":
        case "black-rook":
            for (let i: number = 1; i <= 8; i++) {
                if (isValidMove(row - i, col) && temp.upper) {
                    handleMove(row - i, col, "upper")
                }
                if (isValidMove(row + i, col) && temp.lower) {
                    handleMove(row + i, col, "lower")
                }
                if (isValidMove(row, col - i) && temp.left) {
                    handleMove(row, col - i, "left")

                }
                if (isValidMove(row, col + i) && temp.right) {
                    handleMove(row, col + i, "right")
                }
            }
            break;
        case "black-bishop":
        case "white-bishop":
            for (let i: number = 1; i <= 8; i++) {
                if (isValidMove(row - i, col - i) && temp.leftUpper) {
                    handleMove(row - i, col - i, "leftUpper")
                }
                if (isValidMove(row + i, col - i) && temp.leftLower) {
                    handleMove(row + i, col - i, "leftLower")
                }
                if (isValidMove(row - i, col + i) && temp.rightUpper) {
                    handleMove(row - i, col + i, "rightUpper")

                }
                if (isValidMove(row + i, col + i) && temp.rightLower) {
                    handleMove(row + i, col + i, "rightLower")
                }
            }
            break;
        case "black-queen":
        case "white-queen":
            for (let i: number = 1; i <= 8; i++) {
                if (isValidMove(row - i, col) && temp.upper) {
                    handleMove(row - i, col, "upper")
                }
                if (isValidMove(row + i, col) && temp.lower) {
                    handleMove(row + i, col, "lower")
                }
                if (isValidMove(row, col - i) && temp.left) {
                    handleMove(row, col - i, "left")

                }
                if (isValidMove(row, col + i) && temp.right) {
                    handleMove(row, col + i, "right")
                }
                if (isValidMove(row - i, col - i) && temp.leftUpper) {
                    handleMove(row - i, col - i, "leftUpper")
                }
                if (isValidMove(row + i, col - i) && temp.leftLower) {
                    handleMove(row + i, col - i, "leftLower")
                }
                if (isValidMove(row - i, col + i) && temp.rightUpper) {
                    handleMove(row - i, col + i, "rightUpper")

                }
                if (isValidMove(row + i, col + i) && temp.rightLower) {
                    handleMove(row + i, col + i, "rightLower")
                }
            }
            break;
        case "black-knight":
        case "white-knight":
            const moveOffsets = [
                [-2, -1], [-2, +1],
                [-1, -2], [-1, +2],
                [+1, -2], [+1, +2],
                [+2, -1], [+2, +1]
            ];
            for (const [rowOffset, colOffset] of moveOffsets) {
                let bool = isValidMove(row + rowOffset, col + colOffset)
                const pieceIntersection = bool && matrix[row + rowOffset][col + colOffset] == '' ? true : false
                if (bool && pieceIntersection) {
                    possiblePaths.push([(row + rowOffset), col + colOffset]);

                }
            }
            break;
        case "white-king":
        case "black-king":
            const kingMoveOffsets = [
                [0, 1], [0, -1],
                [1, 1], [-1, -1],
                [1, 0], [-1, 0], [1, -1], [-1, 1]
            ];
            for (const [rowOffset, colOffset] of kingMoveOffsets) {
                if (isValidMove(row + rowOffset, col + colOffset) && matrix[row + rowOffset][col + colOffset] == '') {
                    possiblePaths.push([(row + rowOffset), col + colOffset]);
                }
            }
            break;

    }
    return possiblePaths;
}

const isValidMove = (row: number, col: number) => {
    return row >= 0 && row < 8 && col >= 0 && col < 8
}

const removePathsOfSameTeam = (row: number, col: number, matrix: string[][], whosTurn: string) => {
    const clickedPiece: string = findPiece(matrix[row][col])
    let outputValue: string = '';
    if ((clickedPiece.includes('black') && whosTurn == 'black') || (clickedPiece.includes('white') && whosTurn == 'white')) {
        outputValue = "sameTeam"
    }
    else if ((clickedPiece.includes('black') && whosTurn == 'white') || (clickedPiece.includes('white') && whosTurn == 'black')) {
        outputValue = "oppositeTeam"
    }
    else {
        outputValue = ""
    }

    return outputValue
}