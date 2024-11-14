'use client'
export const gameLogicBotMove = (board, botSymbol, playerSymbol) => {
  const findMove = (symbol) => {
    //check row
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      const index = row.indexOf(".");
      if (row.filter((item) => item === symbol).length === 2 && index !== -1) {
        return { row: i, col: index };
      }
      //check col
      let col = board.map((item) => item[i]);
      let colIndex = col.indexOf(".");
      if (
        col.filter((item) => item === symbol).length === 2 &&
        colIndex !== -1
      ) {
        return { row: colIndex, col: i };
      }
    }
    //check diagons
    const leftDiagnol = [board[0][0], board[1][1], board[2][2]];
    let leftDiagIndex = leftDiagnol.indexOf(".");
    if (
      leftDiagnol.filter((item) => item === symbol).length === 2 &&
      leftDiagIndex !== -1
    ) {
      return { row: leftDiagIndex, col: leftDiagIndex };
    }

    const rightDiagonl = [board[0][2], board[1][1], board[2][0]];
    let rightDiagIndex = rightDiagonl.indexOf(".");
    if (
      rightDiagonl.filter((item) => item === symbol).length === 2 &&
      rightDiagIndex !== -1
    ) {
      return { row: rightDiagIndex, col: 2 - rightDiagIndex };
    }
    return null;
  };
  
  //winning move
  let move = findMove(botSymbol);
  if (move) return move;

  //blocking move
  move = findMove(playerSymbol);
  console.log(move);
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
