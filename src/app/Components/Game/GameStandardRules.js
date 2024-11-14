export const checkBoard = (board) => {
    const checkRow = (board) => {
      for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const row = board[rowIndex];
        const set = [...new Set(row)];
        if (set.length === 1 && set[0] !== ".") {
          const highlights = row.map((_, colIndex) => [rowIndex, colIndex]);
          return { winner: set[0], highlights };
        }
      }
      return null;
    };
  
    const checkCol = (board) => {
      let colArr = [];
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
  
      for (let colIndex = 0; colIndex < colArr.length; colIndex++) {
        const col = colArr[colIndex];
        const set = [...new Set(col)];
        if (set.length === 1 && set[0] !== ".") {
          const highlights = col.map((_, rowIndex) => [rowIndex, colIndex]);
          return { winner: set[0], highlights };
        }
      }
      return null;
    };
  
    const checkDiagonal = (board) => {
      const leftDiagonal = (board) => {
        let diagArr = [];
        let highlights = [];
        for (let i = 0; i < board.length; i++) {
          diagArr.push(board[i][i]);
          highlights.push([i, i]);
        }
        const set = [...new Set(diagArr)];
        if (set.length === 1 && set[0] !== ".") {
          return { winner: set[0], highlights };
        }
        return null;
      };
  
      const rightDiagonal = (board) => {
        let diagArr = [];
        let highlights = [];
        for (let i = 0; i < board.length; i++) {
          diagArr.push(board[i][board.length - 1 - i]);
          highlights.push([i, board.length - 1 - i]);
        }
        const set = [...new Set(diagArr)];
        if (set.length === 1 && set[0] !== ".") {
          return { winner: set[0], highlights };
        }
        return null;
      };
  
      const leftResult = leftDiagonal(board);
      if (leftResult) return leftResult;
  
      const rightResult = rightDiagonal(board);
      if (rightResult) return rightResult;
  
      return null;
    };
  
    const rowResult = checkRow(board);
    if (rowResult) return rowResult;
  
    const colResult = checkCol(board);
    if (colResult) return colResult;
  
    const diagResult = checkDiagonal(board);
    if (diagResult) return diagResult;
  
    return { winner: null, highlights: [] };
  };