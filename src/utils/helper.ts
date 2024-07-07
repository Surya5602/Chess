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

export function updatePathInBoard(row: number, col: number, matrix: string[][], setPiece: React.Dispatch<React.SetStateAction<number[]>>, sethightlightValue: React.Dispatch<React.SetStateAction<number[][]>>, setReferenceVal: React.Dispatch<React.SetStateAction<number[][]>>, whosTurn: string, setTakeDown: React.Dispatch<React.SetStateAction<number[][]>>, kingPositions: { [key: string]: number[]; }) {
    const extractedPieceName = findPiece(matrix[row][col])
    setTakeDown((prevVal) => {
        prevVal = []
        return prevVal;
    })
    sethightlightValue((prevVal) => {
        prevVal = []
        return prevVal;
    })

    const possiblePathUpdation = ((possibelPathArray: number[][]) => {
        possibelPathArray = possibelPathArray.filter((path) => {
            const copyMatrix: string[][] = JSON.parse(JSON.stringify(matrix))
            copyMatrix[path[0]][path[1]] = copyMatrix[row][col]
            copyMatrix[row][col] = ""
            if (extractedPieceName.includes("king")) {
                const filterPathsChecks = whosTurn == "white" ? checkPathsofKingsCheck(copyMatrix, path, "black") : checkPathsofKingsCheck(copyMatrix, path, "white")
                return Object.keys(filterPathsChecks).length == 0
            }
            else {
                const filterPathsChecks = whosTurn == "white" ? checkPathsofKingsCheck(copyMatrix, kingPositions["whiteKing"], "black") : checkPathsofKingsCheck(copyMatrix, kingPositions["blackKing"], "white")
                return Object.keys(filterPathsChecks).length == 0
            }
        })
        return possibelPathArray
    })

    if ((extractedPieceName.includes("black") && whosTurn == "black") || (extractedPieceName.includes("white") && whosTurn == "white")) {
        // checking the possible moves        
        let possibelPathArray = findPosibilePosition(extractedPieceName, row, col, matrix, whosTurn);
        // Check whether the check is happened while moving 
        // this should happen when there is check 
        possibelPathArray = possiblePathUpdation(possibelPathArray)
        /// setting the capturing possibilitis
        if (possibelPathArray) {
            possibelPathArray.forEach((array) => {
                const theIntersectingPiece = findPiece(matrix[array[0]][array[1]])
                if (!theIntersectingPiece.includes(whosTurn) && theIntersectingPiece != "chess-coin") {
                    setTakeDown((preVal) => preVal = [...preVal, [array[0], array[1]]]);
                }
            })
        }
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

export function updateBoard(row: number, col: number, matrix: string[][], setMatrix: React.Dispatch<React.SetStateAction<string[][]>>, setReferenceVal: React.Dispatch<React.SetStateAction<number[][]>>, referenceVal: number[][], piece: number[], whosTurn: string, setWhosTurn: React.Dispatch<React.SetStateAction<string>>, sethightlightValue: React.Dispatch<React.SetStateAction<number[][]>>, setTakeDown: React.Dispatch<React.SetStateAction<number[][]>>, setCapturedPieces: React.Dispatch<React.SetStateAction<{ [key: string]: string[]; }>>, setKingPositions: React.Dispatch<React.SetStateAction<{ [key: string]: number[]; }>>) {
    const updatePieces = () => {
        // Changing of kings positions after the change of the kings piece
        const updatingPieceName = findPiece(matrix[piece[0]][piece[1]])
        if (updatingPieceName.includes("white-king")) {
            setKingPositions((prevVal) => {
                return { ...prevVal, "whiteKing": [row, col] }
            })
        }
        else if (updatingPieceName.includes("black-king")) {
            setKingPositions((prevVal) => {
                return { ...prevVal, "blackKing": [row, col] }
            })
        }
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
        setTakeDown((prevVal) => {
            prevVal = []
            return prevVal
        })
    }
    if (referenceVal) {
        referenceVal.map((move) => {
            if ((row == move[0] && col == move[1]) && (matrix[move[0]][move[1]] == '')) {
                updatePieces()
            }
            else if ((row == move[0] && col == move[1]) && (matrix[move[0]][move[1]] != '')) {
                const capturingPiece = findPiece(matrix[row][col]);
                const capturingPieceURL = matrix[row][col];
                setCapturedPieces((prev) => {
                    const preVal = JSON.parse(JSON.stringify(prev))
                    const key = capturingPiece.includes("white") ? "whitePieces" : "blackPieces"
                    preVal[key] = [...preVal[key], capturingPieceURL]
                    return { ...preVal }
                })
                updatePieces()
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

const findPosibilePosition = (pieceName: string, row: number, col: number, matrix: string[][], whosTurn: string) => {
    let possiblePaths: number[][] = []
    const temp = {
        upper: true,
        lower: true,
        left: true,
        right: true,
        leftUpper: true,
        rightLower: true,
        leftLower: true,
        rightUpper: true,
        blackPawnLeftCapture: true,
        blackPawnRightCapture: true,
        whitePawnLeftCapture: true,
        whitePawnRightCapture: true,
    }
    const handleMove = (r: number, c: number, direction: keyof typeof temp) => {
        if (!isValidMove(r, c) || !temp[direction]) return;
        if (matrix[r][c] !== '') {
            const updateMove = removePathsOfSameTeam(r, c, matrix, whosTurn);
            if (updateMove === "sameTeam") {
                temp[direction] = false;
            } else if (updateMove === "oppositeTeam") {
                possiblePaths.push([r, c]);
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
            // pawn moves when they have possible move to capture piece
            if (matrix[row + 1][col - 1] != "") handleMove(row + 1, col - 1, "blackPawnLeftCapture")
            if (matrix[row + 1][col + 1] != "") handleMove(row + 1, col + 1, "blackPawnRightCapture")
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
            // pawn moves when they have possible move to capture piece
            if (matrix[row - 1][col - 1] != "") handleMove(row - 1, col - 1, "blackPawnLeftCapture")
            if (matrix[row - 1][col + 1] != "") handleMove(row - 1, col + 1, "blackPawnRightCapture")
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
                let pieceEmpty = false
                if (bool) pieceEmpty = matrix[row + rowOffset][col + colOffset] == '' ? true : false
                const pieceIntersection = bool && pieceEmpty
                if (bool && pieceEmpty == false) {
                    const pieceName = findPiece(matrix[row + rowOffset][col + colOffset])
                    if ((pieceName.includes("black") && whosTurn == "white") || (pieceName.includes("white") && whosTurn == "black")) {
                        possiblePaths.push([row + rowOffset, col + colOffset]);
                    }
                }
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
                if (isValidMove(row + rowOffset, col + colOffset)) {
                    const updateMove = removePathsOfSameTeam(row + rowOffset, col + colOffset, matrix, whosTurn)
                    if (updateMove === "oppositeTeam" || updateMove === "emptyCoin")
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
        outputValue = "emptyCoin"
    }
    return outputValue
}
const checkPathsofKingsCheck = (matrix: string[][], kingPositions: number[], checkFor: string) => {
    interface checkObj {
        path: number[][];
        intersection: boolean;
    }

    interface DirectionalCheck {
        left: checkObj;
        right: checkObj;
        upper: checkObj;
        lower: checkObj;
        leftUpper: checkObj;
        leftLower: checkObj;
        rightUpper: checkObj;
        rightLower: checkObj;
        knightMoves: checkObj;
        pawnMoves: checkObj;
        kingMoves: checkObj;
    }

    const directionChecker: { [key: string]: boolean } = {
        upper: true,
        lower: true,
        left: true,
        right: true,
        leftUpper: true,
        rightLower: true,
        leftLower: true,
        rightUpper: true,
    }
    const tempCheckPath: DirectionalCheck = {
        left: {
            path: [],
            intersection: false,
        },
        right: {
            path: [],
            intersection: false,
        },
        upper: {
            path: [],
            intersection: false,
        },
        lower: {
            path: [],
            intersection: false,
        },
        leftUpper: {
            path: [],
            intersection: false,
        },
        leftLower: {
            path: [],
            intersection: false,
        },
        rightUpper: {
            path: [],
            intersection: false,
        },
        rightLower: {
            path: [],
            intersection: false,
        },
        knightMoves: {
            path: [],
            intersection: false,
        },
        pawnMoves: {
            path: [],
            intersection: false,
        },
        kingMoves: {
            path: [],
            intersection: false,
        }
    }
    let checkString: string = ''
    const findIntersection = (row: number, col: number, direction: string) => {
        const intersectingPiece = findPiece(matrix[row][col])
        if (intersectingPiece.includes(checkFor)) {
            if ((direction == "upper" || direction == "lower" || direction == "left" || direction == "right") && (intersectingPiece.includes("queen") || intersectingPiece.includes("rook"))) {
                checkString = "oppositeTeam"
            }
            else if ((direction == "leftUpper" || direction == "leftLower" || direction == "rightUpper" || direction == "rightLower") && (intersectingPiece.includes("queen") || intersectingPiece.includes("bishop"))) {
                checkString = "oppositeTeam"
            }
            else if ((direction == "knightMoves") && (intersectingPiece.includes("knight"))) {
                checkString = "oppositeTeam"
            }
            else if ((direction == "pawnMoves") && intersectingPiece == `${checkFor}-pawn`) {
                checkString = "oppositeTeam"
            }
            else if ((direction == "kingMoves") && intersectingPiece == `${checkFor}-king`) {
                checkString = "oppositeTeam"
            }
            else {
                checkString = "otherOppositeTeam"
            }
        }
        else if (intersectingPiece == "chess-coin") {
            checkString = "noIntersection"
        }
        else {
            checkString = "sameTeam"
        }
        return checkString
    }

    const updatingCheckPossiblePath = (row: number, col: number, direction: keyof (DirectionalCheck)) => {
        if (findIntersection(row, col, direction) == "noIntersection" && direction != "knightMoves") {
            tempCheckPath[direction].path.push([row, col])
        }
        else if (findIntersection(row, col, direction) == "sameTeam") {
            directionChecker[direction] = false
        }
        else if (findIntersection(row, col, direction) == "oppositeTeam") {
            tempCheckPath[direction].path.push([row, col])
            tempCheckPath[direction].intersection = true
            directionChecker[direction] = false
        }
        else if (findIntersection(row, col, direction) == "otherOppositeTeam") {
            directionChecker[direction] = false
        }
    }
    for (let i: number = 1; i <= 8; i++) {
        if (isValidMove(kingPositions[0] - i, kingPositions[1]) && directionChecker.upper) {
            const row = kingPositions[0] - i
            const col = kingPositions[1]
            updatingCheckPossiblePath(row, col, "upper")
        }
        if (isValidMove(kingPositions[0] + i, kingPositions[1]) && directionChecker.lower) {
            const row = kingPositions[0] + i
            const col = kingPositions[1]
            updatingCheckPossiblePath(row, col, "lower")

        }
        if (isValidMove(kingPositions[0], kingPositions[1] - i) && directionChecker.left) {
            const row = kingPositions[0]
            const col = kingPositions[1] - i
            updatingCheckPossiblePath(row, col, "left")

        }
        if (isValidMove(kingPositions[0], kingPositions[1] + i) && directionChecker.right) {
            const row = kingPositions[0]
            const col = kingPositions[1] + i
            updatingCheckPossiblePath(row, col, "right")
        }
        if (isValidMove(kingPositions[0] - i, kingPositions[1] - i) && directionChecker.leftUpper) {
            const row = kingPositions[0] - i
            const col = kingPositions[1] - i
            updatingCheckPossiblePath(row, col, "leftUpper")
        }
        if (isValidMove(kingPositions[0] + i, kingPositions[1] - i) && directionChecker.leftLower) {
            const row = kingPositions[0] + i
            const col = kingPositions[1] - i
            updatingCheckPossiblePath(row, col, "leftLower")
        }
        if (isValidMove(kingPositions[0] - i, kingPositions[1] + i) && directionChecker.rightUpper) {
            const row = kingPositions[0] - i
            const col = kingPositions[1] + i
            updatingCheckPossiblePath(row, col, "rightUpper")
        }
        if (isValidMove(kingPositions[0] + i, kingPositions[1] + i) && directionChecker.rightLower) {
            const row = kingPositions[0] + i
            const col = kingPositions[1] + i
            updatingCheckPossiblePath(row, col, "rightLower")
        }
    }
    const moveOffsets = [
        [-2, -1], [-2, +1],
        [-1, -2], [-1, +2],
        [+1, -2], [+1, +2],
        [+2, -1], [+2, +1]
    ];
    const pawnChecks: number[][] = checkFor == "white" ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]]
    const kingMoves: number[][] = [[0, 1], [0, -1], [1, 1], [-1, -1], [1, 0], [-1, 0], [1, -1], [-1, 1]];
    pawnChecks.forEach((path) => {
        const row = kingPositions[0] - path[0]
        const col = kingPositions[1] - path[1]
        if (isValidMove(row, col)) {
            updatingCheckPossiblePath(row, col, "pawnMoves")
        }
    })
    kingMoves.forEach((path) => {
        const row = kingPositions[0] - path[0]
        const col = kingPositions[1] - path[1]
        if (isValidMove(row, col)) {
            updatingCheckPossiblePath(row, col, "kingMoves")
        }
    })
    moveOffsets.forEach((paths) => {
        const row = kingPositions[0] - paths[0]
        const col = kingPositions[1] - paths[1]
        if (isValidMove(row, col)) {
            updatingCheckPossiblePath(row, col, "knightMoves")
        }
    })
    Object.entries(tempCheckPath).forEach(([key, value]) => {
        if (value.intersection == false) {
            delete tempCheckPath[key as keyof DirectionalCheck];
        }
    });
    return tempCheckPath
}

export const findGameEnds = (whosTurn: string, kingPositions: { [key: string]: number[]; }, matrix: string[][],setCheckMate: React.Dispatch<React.SetStateAction<{ isGameOver: boolean; winMessage: string; status: string; }>>) => {
    const possiblePathUpdation = ((possibelPathArray: number[][], row: number, col: number) => {
        possibelPathArray = possibelPathArray.filter((path) => {
            const copyMatrix: string[][] = JSON.parse(JSON.stringify(matrix))
            const extractedPieceName = findPiece(copyMatrix[row][col])
            copyMatrix[path[0]][path[1]] = copyMatrix[row][col]
            copyMatrix[row][col] = ""
            if (extractedPieceName.includes("king")) {
                const filterPathsChecks = whosTurn == "white" ? checkPathsofKingsCheck(copyMatrix, path, "black") : checkPathsofKingsCheck(copyMatrix, path, "white")
                return Object.keys(filterPathsChecks).length == 0
            }
            else {
                const filterPathsChecks = whosTurn == "white" ? checkPathsofKingsCheck(copyMatrix, kingPositions["whiteKing"], "black") : checkPathsofKingsCheck(copyMatrix, kingPositions["blackKing"], "white")
                return Object.keys(filterPathsChecks).length == 0
            }
        })
        return possibelPathArray
    })
    const possiblePathsFilter = ((possibelPathArray: number[][], currRow: number, currCol: number, matrix: string[][]) => {
        const tempMatrix = JSON.parse(JSON.stringify(matrix))
        const checkingPieceName = findPiece(tempMatrix[currRow][currCol])
        possibelPathArray = possibelPathArray.filter(() => {
            if (!checkingPieceName.includes("king")) {
                const filterPathsChecks = whosTurn == "white" ? checkPathsofKingsCheck(tempMatrix, kingPositions["whiteKing"], "black") : checkPathsofKingsCheck(tempMatrix, kingPositions["blackKing"], "white")
                return Object.keys(filterPathsChecks).length == 0
            }
        })
        return possibelPathArray
    })
    const findGameEnd = (whosTurn: string, matrix: string[][]) => {
        let copyMatrix = JSON.parse(JSON.stringify(matrix));
        interface objectVal {
            currentlyhavingCheck: boolean,
            otherPieceHaveMoves: boolean
        }
        const gameOutput: objectVal = {
            currentlyhavingCheck: false,
            otherPieceHaveMoves: false
        }
        const filterPathsChecks = whosTurn == "white" ? checkPathsofKingsCheck(copyMatrix, kingPositions["whiteKing"], "black") : checkPathsofKingsCheck(copyMatrix, kingPositions["blackKing"], "white")
        if (Object.keys(filterPathsChecks).length > 0) {
            gameOutput["currentlyhavingCheck"] = true
        }
        for (let i = 0; i < copyMatrix.length; i++) {
            for (let j = 0; j < copyMatrix[i].length; j++) {
                const pieceName = findPiece(copyMatrix[i][j])
                const currRow = i
                const currCol = j
                if (pieceName.startsWith(whosTurn)) {
                    let pathsOfPiece = findPosibilePosition(pieceName, currRow, currCol, copyMatrix, whosTurn)
                    pathsOfPiece = possiblePathsFilter(pathsOfPiece, currRow, currCol, matrix)
                    if (pathsOfPiece.length > 0) {
                        gameOutput["otherPieceHaveMoves"] = true
                        return gameOutput
                    }
                    else {
                        gameOutput["otherPieceHaveMoves"] = false
                        continue;
                    }
                }
            }
        }
        return gameOutput
    }
    const kingsName = whosTurn === "white" ? "white-king" : "black-king"
    const kingPosition = kingsName === "white-king" ? kingPositions.whiteKing : kingPositions.blackKing
    let kingsPossibleMoves = findPosibilePosition(kingsName, kingPosition[0], kingPosition[1], matrix, whosTurn)
    kingsPossibleMoves = possiblePathUpdation(kingsPossibleMoves, kingPosition[0], kingPosition[1])
    console.log("kingsPossibleMoves", kingsPossibleMoves)
    if (kingsPossibleMoves.length == 0) {
        const currGameSituation = findGameEnd(whosTurn, matrix)
        console.log("currGameSituation", currGameSituation)
        if (currGameSituation?.currentlyhavingCheck == true && !currGameSituation?.otherPieceHaveMoves) {
            setCheckMate((prevVal) => ({
                ...prevVal,
                isGameOver: true,
                winMessage: whosTurn === "black" ? "White wins the Game" : "Black wins the Game",
                status: "check Mate"
            }));
        }
        else if (currGameSituation?.currentlyhavingCheck == false && !currGameSituation?.otherPieceHaveMoves) {
            setCheckMate((prevVal) => ({
                ...prevVal,
                isGameOver: true,
                winMessage: "Game draw",
                status: "stale Mate"
            }));
        }
    }
}