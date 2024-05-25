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

export function updatePathInBoard(row: number, col: number, matrix: string[][], setMatrix: React.Dispatch<React.SetStateAction<string[][]>>, setPiece: React.Dispatch<React.SetStateAction<number[]>>, sethightlightValue: React.Dispatch<React.SetStateAction<number[][]>>, setReferenceVal: React.Dispatch<React.SetStateAction<number[][]>>, whosTurn: string) {
    const extractedPieceName = findPiece(matrix[row][col])
    if ((extractedPieceName.includes("black") && whosTurn == "black") || (extractedPieceName.includes("white") && whosTurn == "white")) {
        const possibelPathArray = findPosibilePosition(extractedPieceName, row, col, setMatrix, matrix, whosTurn);

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

export function updateBoard(row: number, col: number, matrix: string[][], setMatrix: React.Dispatch<React.SetStateAction<string[][]>>, setReferenceVal: React.Dispatch<React.SetStateAction<number[][]>>, referenceVal: number[][], piece: number[], setPiece: React.Dispatch<React.SetStateAction<number[]>>, wrongMove: number[], setWrongMove: React.Dispatch<React.SetStateAction<number[]>>, whosTurn: string, setWhosTurn: React.Dispatch<React.SetStateAction<string>>, sethightlightValue: React.Dispatch<React.SetStateAction<number[][]>>) {
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


            }
            // else{
            //     setWrongMove((prevMove)=>{
            //         prevMove = [row , col]
            //         return prevMove
            //     })
            // }
        })
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

const findPosibilePosition = (pieceName: string, row: number, col: number, setMatrix: React.Dispatch<React.SetStateAction<string[][]>>, matrix: string[][], whosTurn: string) => {
    let possiblePaths: number[][] = []
    switch (pieceName) {
        case "black-pawn":
            if (row == 1) {
                let firstPossible: number[] = [row + 1, col]
                let secondPossible: number[] = [row + 2, col]
                possiblePaths.push(firstPossible)
                possiblePaths.push(secondPossible)
            }
            else {
                let firstPossible: number[] = [row + 1, col]
                possiblePaths.push(firstPossible)
            }
            break;
        case "white-pawn":
            if (row == 6) {
                let firstPossible: number[] = [row - 1, col]
                let secondPossible: number[] = [row - 2, col]
                possiblePaths.push(firstPossible)
                possiblePaths.push(secondPossible)
            }
            else {
                let firstPossible: number[] = [row - 1, col]
                possiblePaths.push(firstPossible)
            }
            break;
        case "white-rook":
        case "black-rook":
            for (let i: number = 1; i <= 8; i++) {
                if (isValidMove(row - i, col)) {
                    let upperPosssibleMove: number[] = [row - i, col]
                    possiblePaths.push(upperPosssibleMove)
                }
                if (isValidMove(row + i, col)) {
                    let lowerPossibleMove: number[] = [row + i, col]

                    possiblePaths.push(lowerPossibleMove)
                }
            }
            for (let i: number = 1; i <= 8; i++) {
                if (isValidMove(row, col - i)) {
                    let leftPossibleMove: number[] = [row, col - i]
                    possiblePaths.push(leftPossibleMove)
                }
                if (isValidMove(row, col - i) && isValidMove(row, col + i)) {
                    let rightPossibleMove: number[] = [row, col + i]
                    possiblePaths.push(rightPossibleMove)
                }
            }
            possiblePaths = removePathsOfSameTeam(row, col, possiblePaths, matrix)
            console.log("rookPossible Moves", possiblePaths)
            break;
        case "black-bishop":
        case "white-bishop":
            for (let i: number = 1; i <= 8; i++) {
                if (isValidMove(row - i, col - i)) {
                    let leftUpper: number[] = [row - i, col - i]
                    possiblePaths.push(leftUpper)
                }
                if (isValidMove(row + i, col - i)) {
                    let leftLower: number[] = [row + i, col - i]
                    possiblePaths.push(leftLower)
                }
            }
            for (let i: number = 1; i < 8; i++) {
                if (isValidMove(row - i, col + i)) {
                    let rightUpper: number[] = [row - i, col + i]
                    possiblePaths.push(rightUpper)
                }
                if (isValidMove(row + i, col + i)) {
                    let rightLower: number[] = [row + i, col + i]
                    possiblePaths.push(rightLower)
                }
            }
            possiblePaths = removePathsOfSameTeam(row, col, possiblePaths, matrix)
            break;
        case "black-queen":
        case "white-queen":
            for (let i: number = 1; i <= 8; i++) {
                if (isValidMove(row - i, col)) {
                    let upperPosssibleMove: number[] = [row - i, col]
                    possiblePaths.push(upperPosssibleMove)
                }
                if (isValidMove(row + i, col)) {
                    let lowerPossibleMove: number[] = [row + i, col]
                    possiblePaths.push(lowerPossibleMove)
                }
            }
            for (let i: number = 1; i <= 8; i++) {
                if (isValidMove(row, col - i)) {
                    let leftPossibleMove: number[] = [row, col - i]
                    possiblePaths.push(leftPossibleMove)

                }
                if (isValidMove(row, col + i)) {
                    let rightPossibleMove: number[] = [row, col + i]
                    possiblePaths.push(rightPossibleMove)
                }
            }
            for (let i: number = 1; i <= 8; i++) {
                if (isValidMove(row - i, col - i)) {
                    let leftUpper: number[] = [row - i, col - i]
                    possiblePaths.push(leftUpper)
                }
                if (isValidMove(row + i, col - i)) {
                    let leftLower: number[] = [row + i, col - i]
                    possiblePaths.push(leftLower)
                }
            }
            for (let i: number = 1; i < 8; i++) {
                if (isValidMove(row - i, col + i)) {
                    let rightUpper: number[] = [row - i, col + i]
                    possiblePaths.push(rightUpper)
                }
                if (isValidMove(row + i, col + i)) {
                    let rightLower: number[] = [row + i, col + i]
                    possiblePaths.push(rightLower)
                }
            }

            possiblePaths = removePathsOfSameTeam(row, col, possiblePaths, matrix)
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
                if (bool) {
                    possiblePaths.push([(row + rowOffset), col + colOffset]);

                }
            }
            possiblePaths = removePathsOfSameTeam(row, col, possiblePaths, matrix)
            break;
        case "white-king":
        case "black-king":
            const kingMoveOffsets = [
                [0, 1], [0, -1],
                [1, 1], [-1, -1],
                [1, 0], [-1, 0], [1, -1], [-1, 1]
            ];
            for (const [rowOffset, colOffset] of kingMoveOffsets) {
                possiblePaths.push([(row + rowOffset), col + colOffset]);
            }
            break;

    }
    return possiblePaths;
}

const isValidMove = (row: number, col: number) => {
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        return true;
    }
    else {
        return false
    }
}

const removePathsOfSameTeam = (row: number, col: number, possiblePaths: number[][], matrix: string[][]) => {
    let optimizedPaths: number[][] = possiblePaths
    possiblePaths.map((move: number[]) => {
        if (matrix[move[0]][move[1]] != '') {
            const clickedPiece: string = findPiece(matrix[row][col])
            const intersectingPiece: string = findPiece(matrix[move[0]][move[1]])
            if ((intersectingPiece.includes("black") && clickedPiece.includes("black") || (intersectingPiece.includes("white") && clickedPiece.includes("white")))) {
                optimizedPaths = optimizedPaths.filter(item => item != move)
            }
            else if ((intersectingPiece.includes("white") && clickedPiece.includes("black") || (intersectingPiece.includes("black") && clickedPiece.includes("white")))) {

            }
        }
    })
    return optimizedPaths
}