export const gameBot4x4 = (
  board,
  botSymbol,
  playerSymbol,
  scoredPositionsRow,
  scoredPositionsCol,

  botSpecialMove
) => {
  const findBestCellToOverwrite = (board, botSymbol, humanSymbol) => {
    //winning moves
    let move = findWinRow(board, botSymbol, humanSymbol);
    if (move) return move;

    move = findWinCol(board, botSymbol, humanSymbol);
    if (move) return move;

    move = findLeftDiagWin(board, botSymbol, humanSymbol);
    if (move) return move;

    move = findRightDiagWin(board, botSymbol, humanSymbol);
    if (move) return move;

    //blocking moves
  };

  const findWinRow = (board, symbol, humanSymbol) => {
    for (let i = 0; i < board.length; i++) {
      //win row
      let row = board[i];
      for (let j = 0; j < row.length - 3; j++) {
        if (
          row[j] === symbol &&
          row[j + 1] === symbol &&
          row[j + 2] === symbol &&
          (row[j + 3] === humanSymbol || row[j + 3] === ".")
        ) {
          return { row: i, col: j + 3 }; // Fill last cell
        }

        // Case 2: Empty cell at the start
        if (
          (row[j] === humanSymbol || row[j] === ".") &&
          row[j + 1] === symbol &&
          row[j + 2] === symbol &&
          row[j + 3] === symbol
        ) {
          return { row: i, col: j }; // Fill first cell
        }

        // Case 3: Empty cell in the second position
        if (
          row[j] === symbol &&
          (row[j + 1] === humanSymbol || row[j + 1] === ".") &&
          row[j + 2] === symbol &&
          row[j + 3] === symbol
        ) {
          return { row: i, col: j + 1 }; // Fill second cell
        }

        // Case 4: Empty cell in the third position
        if (
          row[j] === symbol &&
          row[j + 1] === symbol &&
          (row[j + 2] === humanSymbol || row[j + 2] === ".") &&
          row[j + 3] === symbol
        ) {
          return { row: i, col: j + 2 }; // Fill third cell
        }
      }
    }
    return null;
  };

  const findWinCol = (board, symbol, humanSymbol) => {
    for (let i = 0; i < board.length; i++) {
      //CHECK COL FOR WIN ----->
      let col = board.map((item) => item[i]);
      for (let j = 0; j < col.length - 3; j++) {
        if (
          col[j] === symbol &&
          col[j + 1] === symbol &&
          col[j + 2] === symbol &&
          (col[j + 3] === humanSymbol || col[j + 3] === ".")
        ) {
          return { row: j + 3, col: i }; // Fill last cell
        }

        // Case 2: Empty cell at the start
        if (
          (col[j] === humanSymbol || col[j] === ".") &&
          col[j + 1] === symbol &&
          col[j + 2] === symbol &&
          col[j + 3] === symbol
        ) {
          return { row: j, col: i }; // Fill first cell
        }

        // Case 3: Empty cell in the second position
        if (
          col[j] === symbol &&
          (col[j + 1] === humanSymbol || col[j + 1] === ".") &&
          col[j + 2] === symbol &&
          col[j + 3] === symbol
        ) {
          return { row: j + 1, col: i }; // Fill second cell
        }

        // Case 4: Empty cell in the third position
        if (
          col[j] === symbol &&
          col[j + 1] === symbol &&
          (col[j + 2] === humanSymbol || col[j + 2] === ".") &&
          col[j + 3] === symbol
        ) {
          return { row: j + 2, col: i }; // Fill third cell
        }
      }
    }
    return null;
  };

  const findRowPoints = (board, symbol, scoredPositionsRow) => {
    for (let i = 0; i < board.length; i++) {
      let row = board[i];

      for (let k = 0; k < row.length - 2; k++) {
        if (scoredPositionsRow.has(`${i}-${k}`)) {
          continue;
        }

        // Empty cell at the end
        if (
          row[k] === symbol &&
          row[k + 1] === symbol &&
          row[k + 2] === "." &&
          row[k] !== "."
        ) {
          scoredPositionsRow.add(`${i}-${k}`);
          return { row: i, col: k + 2 };
        }

        // Empty cell at the start
        if (
          row[k] === "." &&
          row[k + 1] === symbol &&
          row[k + 2] === symbol &&
          row[k + 2] !== "."
        ) {
          scoredPositionsRow.add(`${i}-${k}`);
          return { row: i, col: k };
        }

        // Empty cell in between
        if (
          row[k] === symbol &&
          row[k + 1] === "." &&
          row[k + 2] === symbol &&
          row[k] !== "." &&
          row[k + 2] !== "."
        ) {
          scoredPositionsRow.add(`${i}-${k}`);
          return { row: i, col: k + 1 };
        }
      }
    }
    return null;
  };

  const findColPoints = (board, symbol, scoredPositionsCol) => {
    for (let i = 0; i < board.length; i++) {
      let col = board.map((item) => item[i]);

      for (let k = 0; k < col.length - 2; k++) {
        if (scoredPositionsCol.has(`${i}-${k}`)) {
          continue;
        }

        // Empty cell at the end
        if (
          col[k] === symbol &&
          col[k + 1] === symbol &&
          col[k + 2] === "." &&
          col[k] !== "."
        ) {
          scoredPositionsCol.add(`${i}-${k}`);
          return { row: k + 2, col: i };
        }

        // Empty cell at the start
        if (
          col[k] === "." &&
          col[k + 1] === symbol &&
          col[k + 2] === symbol &&
          col[k + 2] !== "."
        ) {
          scoredPositionsCol.add(`${i}-${k}`);
          return { row: k, col: i };
        }

        // Empty cell in between
        if (
          col[k] === symbol &&
          col[k + 1] === "." &&
          col[k + 2] === symbol &&
          col[k] !== "." &&
          col[k + 2] !== "."
        ) {
          scoredPositionsCol.add(`${i}-${k}`);
          return { row: k + 1, col: i };
        }
      }
    }
    return null;
  };

  const findLeftDiagWin = (board, symbol, humanSymbol) => {
    // Main diagonal (4 cells)
    const mainDiagonal = [];
    for (let i = 0; i < board.length; i++) {
      mainDiagonal.push(board[i][i]);
    }

    /** 1. Check for Winning Moves */
    // Main diagonal: 4 consecutive symbols
    if (
      mainDiagonal.filter((cell) => cell === symbol).length === 3 &&
      mainDiagonal.some((cell) => cell === humanSymbol || cell === ".")
    ) {
      for (let i = 0; i < mainDiagonal.length; i++) {
        if (mainDiagonal[i] === humanSymbol || mainDiagonal[i] === ".") {
          return { row: i, col: i };
        }
      }
    }
    return null;
  };

  const findRightDiagWin = (board, symbol, humanSymbol) => {
    //main Diag 4 win
    let mainDiag = [];
    for (let i = 0; i < board.length; i++) {
      mainDiag.push(board[i][board.length - 1 - i]);
    }
    if (
      mainDiag.filter((cell) => cell === symbol).length === 3 &&
      mainDiag.some((cell) => cell === humanSymbol || cell === ".")
    ) {
      for (let i = 0; i < mainDiag.length; i++) {
        if (mainDiag[i] === humanSymbol || mainDiag[i] === ".") {
          return { row: i, col: board.length - 1 - i }; // Return the position of the empty cell
        }
      }
    }
    return null;
  };

  const findLeftDiagPoints = (board, symbol) => {
    const leftSmallDiag = [board[1][0], board[2][1], board[3][2]];
    const rightSmallDiag = [board[0][1], board[1][2], board[2][3]];
    const mainDiagonal = [];
    for (let i = 0; i < board.length; i++) {
      mainDiagonal.push(board[i][i]);
    }
    //points across diagonal
    for (let i = 0; i < mainDiagonal.length - 2; i++) {
      if (
        mainDiagonal[i] === symbol &&
        mainDiagonal[i + 1] === symbol &&
        mainDiagonal[i + 2] === "."
      ) {
        return { row: i + 2, col: i + 2 }; // Fill the gap to score
      }
      if (
        mainDiagonal[i] === symbol &&
        mainDiagonal[i + 1] === "." &&
        mainDiagonal[i + 2] === symbol
      ) {
        return { row: i + 1, col: i + 1 }; // Fill the middle gap to score
      }
      if (
        mainDiagonal[i] === "." &&
        mainDiagonal[i + 1] === symbol &&
        mainDiagonal[i + 2] === symbol
      ) {
        return { row: i, col: i }; // Fill the first gap to score
      }
    }
    //right small diag
    if (
      leftSmallDiag.filter((cell) => cell === symbol).length === 2 &&
      leftSmallDiag.includes(".")
    ) {
      for (let i = 1; i <= 3; i++) {
        if (board[i][i - 1] === ".") {
          return { row: i, col: i - 1 }; // Fill the empty cell to score
        }
      }
    }
    //left smalll dig
    if (
      rightSmallDiag.filter((cell) => cell === symbol).length === 2 &&
      rightSmallDiag.includes(".")
    ) {
      for (let i = 0; i < 3; i++) {
        if (board[i][i + 1] === ".") {
          return { row: i, col: i + 1 }; // Fill the empty cell to score
        }
      }
    }
    return null;
  };

  const findRightDiagPoints = (board, symbol) => {
    const topSmallDiag = [board[0][2], board[1][1], board[2][0]];
    const bottomSmallDiag = [board[1][3], board[2][2], board[3][1]];

    if (
      topSmallDiag.filter((cell) => cell === symbol).length === 2 &&
      topSmallDiag.includes(".")
    ) {
      // Mark as processed
      for (let i = 0; i < 3; i++) {
        if (board[i][2 - i] === ".") {
          return { row: i, col: 2 - i }; // Fill the empty cell
        }
      }
    }

    // Bottom small diagonal
    if (
      bottomSmallDiag.filter((cell) => cell === symbol).length === 2 &&
      bottomSmallDiag.includes(".")
    ) {
      // Mark as processed
      for (let i = 1; i <= 3; i++) {
        if (board[i][4 - i] === ".") {
          return { row: i, col: 4 - i }; // Fill the empty cell
        }
      }
    }
    const mainDiag = [];
    for (let i = 0; i < board.length; i++) {
      mainDiag.push(board[i][board.length - 1 - i]);
    }
    for (let i = 0; i < mainDiag.length - 2; i++) {
      if (mainDiag[i] === symbol) {
        if (
          mainDiag[i] === symbol &&
          mainDiag[i + 1] === symbol &&
          mainDiag[i + 2] === "."
        ) {
          // Mark as processed
          return { row: i + 2, col: board.length - 1 - (i + 2) };
        }

        if (
          mainDiag[i] === symbol &&
          mainDiag[i + 1] === "." &&
          mainDiag[i + 2] === symbol
        ) {
          // Mark as processed
          return { row: i + 1, col: board.length - 1 - (i + 1) };
        }

        if (
          mainDiag[i] === "." &&
          mainDiag[i + 1] === symbol &&
          mainDiag[i + 2] === symbol
        ) {
          // Mark as processed
          return { row: i, col: board.length - 1 - i };
        }
      }
    }
    return null;
  };

  //special move
  let move;
  if (botSpecialMove) {
    move = findBestCellToOverwrite(board, botSymbol, playerSymbol);
    console.log("Special move is; ", move);
    if (move) return move;
  }

  //winning move
  move = findWinRow(board, botSymbol);
  //console.log("Find Winning Row ", move);
  if (move) return move;

  move = findWinCol(board, botSymbol);
  //console.log("Find Winning Col ", move);
  if (move) return move;

  move = findLeftDiagWin(board, botSymbol);
  //console.log("Find Winning LDiag ", move);
  if (move) return move;

  move = findRightDiagWin(board, botSymbol);
  //console.log("Find Winning RDiag ", move);
  if (move) return move;

  //blocking moves

  move = findWinRow(board, playerSymbol);
  //console.log("Find blocking win row ", move);
  if (move) return move;

  move = findWinCol(board, playerSymbol);
  //console.log("Find blocking win col ", move);
  if (move) return move;

  move = findLeftDiagWin(board, playerSymbol);
  //console.log("Find blocking win leftD ", move);
  if (move) return move;

  move = findRightDiagWin(board, playerSymbol);
  //console.log("Find blocking win rightD ", move);
  if (move) return move;

  //winning points move
  move = findLeftDiagPoints(board, botSymbol);
  //console.log("Find winning leftD points ", move);
  if (move) return move;

  move = findRightDiagPoints(board, botSymbol);
  //console.log("Find winning rightD points ", move);
  if (move) return move;

  move = findRowPoints(board, botSymbol, scoredPositionsRow);
  //console.log("Find winning row points ", move);
  if (move) return move;

  move = findColPoints(board, botSymbol, scoredPositionsCol);
  //console.log("Find winning col points ", move);
  if (move) return move;

  //blocking points
  move = findRowPoints(board, playerSymbol, scoredPositionsRow);
  //console.log("Find blocking row points ", move);
  if (move) return move;

  move = findColPoints(board, playerSymbol, scoredPositionsCol);
  //console.log("Find blocking col points ", move);
  if (move) return move;

  move = findLeftDiagPoints(board, playerSymbol);
  //console.log("Find blocking leftD points ", move);
  if (move) return move;

  move = findRightDiagPoints(board, playerSymbol);
  //console.log("Find blocking rightD points ", move);
  if (move) return move;

  //random move
  let randInd = Math.floor(Math.random() * board.length);
  for (let i = 0; i < board.length; i++) {
    let rowInd = (i + randInd) % board.length;
    const emptyInd = board[rowInd].indexOf(".");
    if (emptyInd !== -1) {
      return { row: rowInd, col: emptyInd };
    }
  }
  return null;
};
