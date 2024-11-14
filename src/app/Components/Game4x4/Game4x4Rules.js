export const checkBoard = (board, scoredPositionsCol, scoredPositionsRow, flags) => {
    //console.log("this is anayseboard", scoredPositionsRow);
    const checkRow = (board, scoredPositionsRow) => {
      let verdict = [];
      let highLight = [];
      for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        let row = board[rowIndex];
        for (let i = 0; i < row.length - 2; i++) {
          //console.log("inside loop", scoredPositionsRow);
          if (scoredPositionsRow.has(`${rowIndex}-${i}`)) {
            continue;
          }
          if (
            row[i] === row[i + 1] &&
            row[i + 1] === row[i + 2] &&
            row[i] !== "."
          ) {
            verdict[0] = row[i];
            highLight.push(
              [rowIndex, i],
              [rowIndex, i + 1],
              [rowIndex, i + 2],
            );
            scoredPositionsRow.add(`${rowIndex}-${i}`);
          }
        }

        // Check if the entire row has the same letter (4 in a row for 4x4 grid)
        const set = [...new Set(row)];
        if (set.length === 1 && set[0] !== ".") {
          verdict[1] = set[0];
          highLight = row.map((_, colIndex) => [rowIndex, colIndex]);
        }
      }
      if (verdict[0] === undefined) {
        verdict[0] = null;
      }
      if (verdict[1] === undefined) {
        verdict[1] = null;
      }
      //console.log("row highlight ", highLight);
      return { verdict, highLight };
    };

    const checkCol = (board, scoredPositionsCol) => {
      let colArr = [];
      let verdict = [];
      let highLight = [];
      let flatBoard = board.flat();
      for (let i = 0; i < board[0].length; i++) {
        let startIndex = i;
        let tempArr = [];
        while (startIndex < flatBoard.length) {
          tempArr.push(flatBoard[startIndex]);
          startIndex = startIndex + board.length;
        }
        colArr.push(tempArr);
      }
      //console.log(colArr);
      for (let colIndex = 0; colIndex < board.length; colIndex++) {
        let col = colArr[colIndex];
        for (let i = 0; i < col.length; i++) {
          if (scoredPositionsCol.has(`${colIndex}-${i}`)) {
            continue;
          }
          if (
            col[i] === col[i + 1] &&
            col[i + 1] === col[i + 2] &&
            col[i] !== "."
          ) {
            verdict[0] = col[i];
            scoredPositionsCol.add(`${colIndex}-${i}`);
            highLight = [
              [i, colIndex],
              [i + 1, colIndex],
              [i + 2, colIndex],
            ];
          }
        }
        const set = [...new Set(col)];
        if (set.length === 1 && set[0] !== ".") {
          verdict[1] = set[0];
          highLight = col.map((_, rowIndex) => [rowIndex, colIndex]);
        }
      }
      if (verdict[0] === undefined) verdict[0] = null;
      if (verdict[1] === undefined) verdict[1] = null;
      console.log("col highlight ", highLight);
      return { verdict, highLight };
    };

    const checkDiagonal = (board, flags) => {
      //leftDiag fucntion
      //rightDiag Function
      const leftDiagonal = (board, flags) => {
        let verdict = [null, null]; // [points, winner]
        let highLight = [];

        // Small diagonals (length 3)
        const leftSmallDiag = [board[1][0], board[2][1], board[3][2]];
        const rightSmallDiag = [board[0][1], board[1][2], board[2][3]];

        // Main diagonal (length 4)
        const mainDiagonal = [];
        for (let i = 0; i < board.length; i++) {
          mainDiagonal.push(board[i][i]);
        }

        // 1. Check Small Diagonals (Length 3)
        const leftSmallSet = [...new Set(leftSmallDiag)];
        const rightSmallSet = [...new Set(rightSmallDiag)];

        if (
          leftSmallSet.length === 1 &&
          leftSmallSet[0] !== "." &&
          flags.leftSmallLeftDiagFlag
        ) {
          flags.leftSmallLeftDiagFlag = false;
          verdict[0] = leftSmallSet[0];
          highLight = [
            [1, 0],
            [2, 1],
            [3, 2], // Indices of left small diagonal cells
          ]; // Points for left small diagonal
        }

        if (
          rightSmallSet.length === 1 &&
          rightSmallSet[0] !== "." &&
          flags.leftSmallRightDiagFlag
        ) {
          flags.leftSmallRightDiagFlag = false;
          verdict[0] = rightSmallSet[0];
          highLight = [
            [0, 1],
            [1, 2],
            [2, 3], // Indices of right small diagonal cells
          ];
          // Points for right small diagonal
        }

        // 2. Check Main Diagonal (Length 4)
        for (let i = 0; i < mainDiagonal.length - 2; i++) {
          if (
            mainDiagonal[i] === mainDiagonal[i + 1] &&
            mainDiagonal[i + 1] === mainDiagonal[i + 2] &&
            mainDiagonal[i] !== "." &&
            flags.leftDiagMain
          ) {
            flags.leftDiagMain = false;
            verdict[0] = mainDiagonal[i];
            highLight = [
              [i, i],
              [i + 1, i + 1],
              [i + 2, i + 2], // Indices of the three consecutive cells
            ]; // Points for three consecutive symbols
          }
        }

        if (
          new Set(mainDiagonal).size === 1 &&
          mainDiagonal[0] !== "." &&
          flags.leftDiagMain
        ) {
          flags.leftDiagMain = false;
          verdict[1] = mainDiagonal[0];
          highLight = [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3], // Indices of the full main diagonal cells
          ]; // Win for all four same symbols
        }

        // Return the verdict
        //console.log(highLights);
        //console.log("leftDiag high", highLight);
        return { verdict, highLight };
      };

      const rightDiagonal = (board, flags) => {
        let verdict = [null, null]; // [points, winner]
        let highLight = []; // To store highlighted cell indices

        // Small diagonals (length 3)
        const topSmallDiag = [board[0][2], board[1][1], board[2][0]];
        const bottomSmallDiag = [board[1][3], board[2][2], board[3][1]];

        // Main diagonal (right-to-left, length 4)
        const mainDiagonal = [];
        for (let i = 0; i < board.length; i++) {
          mainDiagonal.push(board[i][board.length - 1 - i]);
        }

        // 1. Check Small Diagonals (Length 3)
        const topSet = [...new Set(topSmallDiag)];
        const bottomSet = [...new Set(bottomSmallDiag)];

        if (
          topSet.length === 1 &&
          topSet[0] !== "." &&
          flags.rightSmallTopDiagFlag
        ) {
          flags.rightSmallTopDiagFlag = false;
          verdict[0] = topSet[0]; // Points for top small diagonal
          highLight = [
            [0, 2],
            [1, 1],
            [2, 0], // Indices for top small diagonal
          ];
        }

        if (
          bottomSet.length === 1 &&
          bottomSet[0] !== "." &&
          flags.rightSmallBotDiagFlag
        ) {
          flags.rightSmallBotDiagFlag = false;
          verdict[0] = bottomSet[0]; // Points for bottom small diagonal
          highLight = [
            [1, 3],
            [2, 2],
            [3, 1], // Indices for bottom small diagonal
          ];
        }

        // 2. Check Main Diagonal (Right-to-Left, Length 4)
        for (let i = 0; i < mainDiagonal.length - 2; i++) {
          if (
            mainDiagonal[i] === mainDiagonal[i + 1] &&
            mainDiagonal[i + 1] === mainDiagonal[i + 2] &&
            mainDiagonal[i] !== "." &&
            flags.rightDiagMain
          ) {
            flags.rightDiagMain = false;
            verdict[0] = mainDiagonal[i]; // Points for three consecutive symbols
            highLight = [
              [i, board.length - 1 - i],
              [i + 1, board.length - 2 - i],
              [i + 2, board.length - 3 - i], // Indices for three consecutive symbols
            ];
          }
        }

        if (
          new Set(mainDiagonal).size === 1 &&
          mainDiagonal[0] !== "." &&
          flags.rightDiagMain
        ) {
          flags.rightDiagMain = false;
          verdict[1] = mainDiagonal[0]; // Win for all four same symbols
          highLight = [
            [0, 3],
            [1, 2],
            [2, 1],
            [3, 0], // Indices for full main diagonal
          ];
        }
        return { verdict, highLight };
      };

      let leftDiagVerdict = leftDiagonal(board, flags);
      //console.log("left diag verdict at middle ", leftDiagVerdict);
      if (
        leftDiagVerdict.verdict[0] !== null ||
        leftDiagVerdict.verdict[1] !== null
      ) {
        return leftDiagVerdict;
      }

      let rightDiagVerdict = rightDiagonal(board, flags);
      if (
        rightDiagVerdict.verdict[0] !== null ||
        rightDiagVerdict.verdict[1] !== null
      ) {
        return rightDiagVerdict;
      }

      return { verdict: null, highLight: null };
    };

    let rowVerdict = checkRow(board, scoredPositionsRow);
    //console.log("row verdict at end of fn is ",rowVerdict);
    if (rowVerdict.verdict[0] !== null || rowVerdict.verdict[1] !== null) {
      return rowVerdict;
    }
    let colVerdict = checkCol(board, scoredPositionsCol);
    //console.log("col verdit at end of fn ", colVerdict);
    if (colVerdict.verdict[0] !== null || colVerdict.verdict[1] !== null) {
      return colVerdict;
    }
    let diagVerdict = checkDiagonal(board, flags);
    //console.log("dialog verdict at end of main check ", diagVerdict);
    if (diagVerdict.verdict !== null || diagVerdict.verdict !== null) {
      return diagVerdict;
    }
    // let diagVerdict = checkDiagonal(board, flags);
    // console.log(diagVerdict);
    // if (diagVerdict?.verdict[0] !== null || diagVerdict?.verdict[1] !== null) {
    //   return diagVerdict;
    // }
    return { verdict: null, highLight: null };
  };