"use client";
export const gameBot5x5 = (
  board,
  botSymbol,
  playerSymbol,
  scoredPositionsRow,
  scoredPositionsCol,
  flags
) => {
  const findWinRow = (board, symbol) => {
    for (let i = 0; i < board.length; i++) {
      // Win row
      let row = board[i];

      for (let j = 0; j < row.length - 4; j++) {
        // Case 1: Empty cell at the end
        if (
          row[j] === symbol &&
          row[j + 1] === symbol &&
          row[j + 2] === symbol &&
          row[j + 3] === symbol &&
          row[j + 4] === "."
        ) {
          return { row: i, col: j + 4 }; // Fill last cell
        }

        // Case 2: Empty cell at the start
        if (
          row[j] === "." &&
          row[j + 1] === symbol &&
          row[j + 2] === symbol &&
          row[j + 3] === symbol &&
          row[j + 4] === symbol
        ) {
          return { row: i, col: j }; // Fill first cell
        }

        // Case 3: Empty cell in the second position
        if (
          row[j] === symbol &&
          row[j + 1] === "." &&
          row[j + 2] === symbol &&
          row[j + 3] === symbol &&
          row[j + 4] === symbol
        ) {
          return { row: i, col: j + 1 }; // Fill second cell
        }

        // Case 4: Empty cell in the third position
        if (
          row[j] === symbol &&
          row[j + 1] === symbol &&
          row[j + 2] === "." &&
          row[j + 3] === symbol &&
          row[j + 4] === symbol
        ) {
          return { row: i, col: j + 2 }; // Fill third cell
        }

        // Case 5: Empty cell in the fourth position
        if (
          row[j] === symbol &&
          row[j + 1] === symbol &&
          row[j + 2] === symbol &&
          row[j + 3] === "." &&
          row[j + 4] === symbol
        ) {
          return { row: i, col: j + 3 }; // Fill fourth cell
        }
      }
    }
    return null; // No winning move found
  };

  const findWinCol = (board, symbol) => {
    for (let i = 0; i < board.length; i++) {
      // Create a column by mapping rows at index `i`
      let col = board.map((row) => row[i]);

      // Check for all winning cases in the column
      for (let j = 0; j < col.length - 4; j++) {
        // Case 1: Empty cell at the end
        if (
          col[j] === symbol &&
          col[j + 1] === symbol &&
          col[j + 2] === symbol &&
          col[j + 3] === symbol &&
          col[j + 4] === "."
        ) {
          return { row: j + 4, col: i }; // Fill last cell
        }

        // Case 2: Empty cell at the start
        if (
          col[j] === "." &&
          col[j + 1] === symbol &&
          col[j + 2] === symbol &&
          col[j + 3] === symbol &&
          col[j + 4] === symbol
        ) {
          return { row: j, col: i }; // Fill first cell
        }

        // Case 3: Empty cell in the second position
        if (
          col[j] === symbol &&
          col[j + 1] === "." &&
          col[j + 2] === symbol &&
          col[j + 3] === symbol &&
          col[j + 4] === symbol
        ) {
          return { row: j + 1, col: i }; // Fill second cell
        }

        // Case 4: Empty cell in the third position
        if (
          col[j] === symbol &&
          col[j + 1] === symbol &&
          col[j + 2] === "." &&
          col[j + 3] === symbol &&
          col[j + 4] === symbol
        ) {
          return { row: j + 2, col: i }; // Fill third cell
        }

        // Case 5: Empty cell in the fourth position
        if (
          col[j] === symbol &&
          col[j + 1] === symbol &&
          col[j + 2] === symbol &&
          col[j + 3] === "." &&
          col[j + 4] === symbol
        ) {
          return { row: j + 3, col: i }; // Fill fourth cell
        }
      }
    }
    return null; // No winning move found
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

  const findLeftDiagWin = (board, symbol) => {
    // Main diagonal (5 cells for 5x5 grid)
    const mainDiagonal = [];
    for (let i = 0; i < board.length; i++) {
      mainDiagonal.push(board[i][i]);
    }

    /** Check for Winning Moves */
    // Main diagonal: 5 consecutive symbols
    for (let i = 0; i < mainDiagonal.length - 4; i++) {
      // Case 1: Empty cell at the end
      if (
        mainDiagonal[i] === symbol &&
        mainDiagonal[i + 1] === symbol &&
        mainDiagonal[i + 2] === symbol &&
        mainDiagonal[i + 3] === symbol &&
        mainDiagonal[i + 4] === "."
      ) {
        return { row: i + 4, col: i + 4 };
      }

      // Case 2: Empty cell at the start
      if (
        mainDiagonal[i] === "." &&
        mainDiagonal[i + 1] === symbol &&
        mainDiagonal[i + 2] === symbol &&
        mainDiagonal[i + 3] === symbol &&
        mainDiagonal[i + 4] === symbol
      ) {
        return { row: i, col: i };
      }

      // Case 3: Empty cell in the second position
      if (
        mainDiagonal[i] === symbol &&
        mainDiagonal[i + 1] === "." &&
        mainDiagonal[i + 2] === symbol &&
        mainDiagonal[i + 3] === symbol &&
        mainDiagonal[i + 4] === symbol
      ) {
        return { row: i + 1, col: i + 1 };
      }

      // Case 4: Empty cell in the third position
      if (
        mainDiagonal[i] === symbol &&
        mainDiagonal[i + 1] === symbol &&
        mainDiagonal[i + 2] === "." &&
        mainDiagonal[i + 3] === symbol &&
        mainDiagonal[i + 4] === symbol
      ) {
        return { row: i + 2, col: i + 2 };
      }

      // Case 5: Empty cell in the fourth position
      if (
        mainDiagonal[i] === symbol &&
        mainDiagonal[i + 1] === symbol &&
        mainDiagonal[i + 2] === symbol &&
        mainDiagonal[i + 3] === "." &&
        mainDiagonal[i + 4] === symbol
      ) {
        return { row: i + 3, col: i + 3 };
      }
    }

    return null; // No winning move found
  };

  const findRightDiagWin = (board, symbol) => {
    // Main right diagonal (5 cells for 5x5 grid)
    let mainDiag = [];
    for (let i = 0; i < board.length; i++) {
      mainDiag.push(board[i][board.length - 1 - i]);
    }

    /** Check for Winning Moves */
    // Main diagonal: 5 consecutive symbols
    for (let i = 0; i < mainDiag.length - 4; i++) {
      // Case 1: Empty cell at the end
      if (
        mainDiag[i] === symbol &&
        mainDiag[i + 1] === symbol &&
        mainDiag[i + 2] === symbol &&
        mainDiag[i + 3] === symbol &&
        mainDiag[i + 4] === "."
      ) {
        return { row: i + 4, col: board.length - 1 - (i + 4) };
      }

      // Case 2: Empty cell at the start
      if (
        mainDiag[i] === "." &&
        mainDiag[i + 1] === symbol &&
        mainDiag[i + 2] === symbol &&
        mainDiag[i + 3] === symbol &&
        mainDiag[i + 4] === symbol
      ) {
        return { row: i, col: board.length - 1 - i };
      }

      // Case 3: Empty cell in the second position
      if (
        mainDiag[i] === symbol &&
        mainDiag[i + 1] === "." &&
        mainDiag[i + 2] === symbol &&
        mainDiag[i + 3] === symbol &&
        mainDiag[i + 4] === symbol
      ) {
        return { row: i + 1, col: board.length - 1 - (i + 1) };
      }

      // Case 4: Empty cell in the third position
      if (
        mainDiag[i] === symbol &&
        mainDiag[i + 1] === symbol &&
        mainDiag[i + 2] === "." &&
        mainDiag[i + 3] === symbol &&
        mainDiag[i + 4] === symbol
      ) {
        return { row: i + 2, col: board.length - 1 - (i + 2) };
      }

      // Case 5: Empty cell in the fourth position
      if (
        mainDiag[i] === symbol &&
        mainDiag[i + 1] === symbol &&
        mainDiag[i + 2] === symbol &&
        mainDiag[i + 3] === "." &&
        mainDiag[i + 4] === symbol
      ) {
        return { row: i + 3, col: board.length - 1 - (i + 3) };
      }
    }

    return null; // No winning move found
  };

  const findLeftDiagPoints = (board, symbol, flags) => {
    // Main diagonal: 5 cells
    const mainDiagonal = [];
    for (let i = 0; i < board.length; i++) {
      mainDiagonal.push(board[i][i]);
    }

    // Left small diagonal 1: 4 cells (from second row, first column)
    const leftSmallDiag1 = [board[1][0], board[2][1], board[3][2], board[4][3]];

    // Left small diagonal 2: 4 cells (from first row, second column)
    const leftSmallDiag2 = [board[0][1], board[1][2], board[2][3], board[3][4]];

    // Left tiny diagonal 1: 3 cells (from third row, first column)
    const leftTinyDiag1 = [board[2][0], board[3][1], board[4][2]];

    // Left tiny diagonal 2: 3 cells (from first row, third column)
    const leftTinyDiag2 = [board[0][2], board[1][3], board[2][4]];

    // Helper to check scoring opportunities in a diagonal
    const checkDiagonalPoints = (diagonal, flagName, offset) => {
      if (!flags[flagName]) return null;

      for (let i = 0; i < diagonal.length - 2; i++) {
        // Empty cell at the end
        if (
          diagonal[i] === symbol &&
          diagonal[i + 1] === symbol &&
          diagonal[i + 2] === "."
        ) {
          flags[flagName] = false; // Mark this diagonal as scored
          return { row: i + 2 + offset.row, col: i + 2 + offset.col };
        }

        // Empty cell in the middle
        if (
          diagonal[i] === symbol &&
          diagonal[i + 1] === "." &&
          diagonal[i + 2] === symbol
        ) {
          flags[flagName] = false; // Mark this diagonal as scored
          return { row: i + 1 + offset.row, col: i + 1 + offset.col };
        }

        // Empty cell at the start
        if (
          diagonal[i] === "." &&
          diagonal[i + 1] === symbol &&
          diagonal[i + 2] === symbol
        ) {
          flags[flagName] = false; // Mark this diagonal as scored
          return { row: i + offset.row, col: i + offset.col };
        }
      }
      return null;
    };

    /** Main diagonal points */
    const mainDiagonalMove = checkDiagonalPoints(mainDiagonal, "leftDiagMain", {
      row: 0,
      col: 0,
    });
    if (mainDiagonalMove) return mainDiagonalMove;

    /** Left small diagonal 1 points */
    const smallDiag1Move = checkDiagonalPoints(
      leftSmallDiag1,
      "leftSmallLeftDiagFlag",
      {
        row: 1,
        col: 0,
      }
    );
    if (smallDiag1Move) return smallDiag1Move;

    /** Left small diagonal 2 points */
    const smallDiag2Move = checkDiagonalPoints(
      leftSmallDiag2,
      "leftSmallRightDiagFlag",
      {
        row: 0,
        col: 1,
      }
    );
    if (smallDiag2Move) return smallDiag2Move;

    /** Left tiny diagonal 1 points */
    const tinyDiag1Move = checkDiagonalPoints(
      leftTinyDiag1,
      "leftTinyLeftDiagFlag",
      {
        row: 2,
        col: 0,
      }
    );
    if (tinyDiag1Move) return tinyDiag1Move;

    /** Left tiny diagonal 2 points */
    const tinyDiag2Move = checkDiagonalPoints(
      leftTinyDiag2,
      "leftTinyRightDiagFlag",
      {
        row: 0,
        col: 2,
      }
    );
    if (tinyDiag2Move) return tinyDiag2Move;

    // No points found
    return null;
  };

  const findRightDiagPoints = (board, symbol, flags) => {
    // Main diagonal: 5 cells ([0][4], [1][3], [2][2], [3][1], [4][0])
    const mainDiagonal = [];
    for (let i = 0; i < board.length; i++) {
      mainDiagonal.push(board[i][board.length - 1 - i]);
    }

    // Top small diagonal: 4 cells ([0][3], [1][2], [2][1], [3][0])
    const topSmallDiag = [board[0][3], board[1][2], board[2][1], board[3][0]];

    // Bottom small diagonal: 4 cells ([1][4], [2][3], [3][2], [4][1])
    const bottomSmallDiag = [
      board[1][4],
      board[2][3],
      board[3][2],
      board[4][1],
    ];

    // Tiny top diagonal: 3 cells ([0][2], [1][1], [2][0])
    const tinyTopDiag = [board[0][2], board[1][1], board[2][0]];

    // Tiny bottom diagonal: 3 cells ([2][4], [3][3], [4][2])
    const tinyBottomDiag = [board[2][4], board[3][3], board[4][2]];

    // Helper to check diagonal points
    const checkDiagonalPoints = (
      diagonal,
      flagName,
      rowOffsets,
      colOffsets
    ) => {
      if (!flags[flagName]) return null;

      for (let i = 0; i < diagonal.length - 2; i++) {
        // Empty cell at the end
        if (
          diagonal[i] === symbol &&
          diagonal[i + 1] === symbol &&
          diagonal[i + 2] === "."
        ) {
          flags[flagName] = false;
          return {
            row: rowOffsets[i + 2],
            col: colOffsets[i + 2],
          };
        }

        // Empty cell in the middle
        if (
          diagonal[i] === symbol &&
          diagonal[i + 1] === "." &&
          diagonal[i + 2] === symbol
        ) {
          flags[flagName] = false;
          return {
            row: rowOffsets[i + 1],
            col: colOffsets[i + 1],
          };
        }

        // Empty cell at the start
        if (
          diagonal[i] === "." &&
          diagonal[i + 1] === symbol &&
          diagonal[i + 2] === symbol
        ) {
          flags[flagName] = false;
          return {
            row: rowOffsets[i],
            col: colOffsets[i],
          };
        }
      }
      return null;
    };

    // Main diagonal
    const mainDiagMove = checkDiagonalPoints(
      mainDiagonal,
      "rightDiagMain",
      [0, 1, 2, 3, 4],
      [4, 3, 2, 1, 0]
    );
    if (mainDiagMove) return mainDiagMove;

    // Top small diagonal
    const topSmallDiagMove = checkDiagonalPoints(
      topSmallDiag,
      "rightSmallTopDiagFlag",
      [0, 1, 2, 3],
      [3, 2, 1, 0]
    );
    if (topSmallDiagMove) return topSmallDiagMove;

    // Bottom small diagonal
    const bottomSmallDiagMove = checkDiagonalPoints(
      bottomSmallDiag,
      "rightSmallBotDiagFlag",
      [1, 2, 3, 4],
      [4, 3, 2, 1]
    );
    if (bottomSmallDiagMove) return bottomSmallDiagMove;

    // Tiny top diagonal
    const tinyTopDiagMove = checkDiagonalPoints(
      tinyTopDiag,
      "rightTinyTopDiagFlag",
      [0, 1, 2],
      [2, 1, 0]
    );
    if (tinyTopDiagMove) return tinyTopDiagMove;

    // Tiny bottom diagonal
    const tinyBottomDiagMove = checkDiagonalPoints(
      tinyBottomDiag,
      "rightTinyBotDiagFlag",
      [2, 3, 4],
      [4, 3, 2]
    );
    if (tinyBottomDiagMove) return tinyBottomDiagMove;

    // No points found
    return null;
  };

  //winning move
  let move = findWinRow(board, botSymbol);
  console.log("Find Winning Row ", move);
  if (move) return move;

  move = findWinCol(board, botSymbol);
  console.log("Find Winning Col ", move);
  if (move) return move;

  move = findLeftDiagWin(board, botSymbol);
  console.log("Find Winning LDiag ", move);
  if (move) return move;

  move = findRightDiagWin(board, botSymbol);
  console.log("Find Winning RDiag ", move);
  if (move) return move;

  //blocking moves

  move = findWinRow(board, playerSymbol);
  console.log("Find blocking win row ", move);
  if (move) return move;

  move = findWinCol(board, playerSymbol);
  console.log("Find blocking win col ", move);
  if (move) return move;

  move = findLeftDiagWin(board, playerSymbol);
  console.log("Find blocking win leftD ", move);
  if (move) return move;

  move = findRightDiagWin(board, playerSymbol);
  console.log("Find blocking win rightD ", move);
  if (move) return move;

  //blocking points
  move = findRowPoints(board, playerSymbol, scoredPositionsRow);
  console.log("Find blocking row points ", move);
  if (move) return move;

  move = findColPoints(board, playerSymbol, scoredPositionsCol);
  console.log("Find blocking col points ", move);
  if (move) return move;

  move = findLeftDiagPoints(board, playerSymbol, flags);
  console.log("Find blocking leftD points ", move);
  if (move) return move;

  move = findRightDiagPoints(board, playerSymbol, flags);
  console.log("Find blocking rightD points ", move);
  if (move) return move;

  //winning points move
  move = findRowPoints(board, botSymbol, scoredPositionsRow);
  console.log("Find winning row points ", move);
  if (move) return move;

  move = findColPoints(board, botSymbol, scoredPositionsCol);
  console.log("Find winning col points ", move);
  if (move) return move;

  move = findLeftDiagPoints(board, botSymbol, flags);
  console.log("Find winning leftD points ", move);
  if (move) return move;

  move = findRightDiagPoints(board, botSymbol, flags);
  console.log("Find winning rightD points ", move);
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
