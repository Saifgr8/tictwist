"use client";
import { getLeftDiags, getRightDiags } from "../Game/helperDiag";

export const gameBot4x4 = (
  board,
  botSymbol,
  playerSymbol,
  
  botSpecialMove,
  
) => {
  
  // console.log(typeof botSpecialMove);
  const findBestCellToOverwrite = (
    board,
    botSymbol,
    humanSymbol,
   
  ) => {
    console.log("using special move");
    //winning moves
    let move = findWinRow(board, botSymbol, humanSymbol);
    console.log(move);
    if (move) return move;

    move = findWinCol(board, botSymbol, humanSymbol);
    console.log(move);
    if (move) return move;

    move = findLeftDiagWin(board, botSymbol, humanSymbol);
    console.log(move);
    if (move) return move;

    move = findRightDiagWin(board, botSymbol, humanSymbol);
    console.log(move);
    if (move) return move;

    //winning points
    move = findRowPoints(board, botSymbol, humanSymbol);
    console.log(move);
    if (move) return move;

    move = findColPoints(board, botSymbol, humanSymbol);
    console.log(move);
    if (move) return move;

    move = findLeftDiagPoints(
      board,
      botSymbol,
      humanSymbol
    );
    if (move) return move;

    move = findRightDiagPoints(
      board,
      botSymbol,
      humanSymbol
    );
    if (move) return move;
  };

  const findWinRow = (board, symbol, humanSymbol) => {
    for (let i = 0; i < board.length; i++) {
      // Iterate over sequences of 5 cells
      let row = board[i];
      let botCount = row.filter((item) => item === symbol).length;
      let overrideIndex = -1;
      if (botCount === board.length - 1) {
        overrideIndex = row.findIndex((item) => item !== symbol);
        if (humanSymbol && row[overrideIndex] === humanSymbol) {
          //overriding
          return { row: i, col: overrideIndex };
        }
        if (row[overrideIndex] === "x") {
          return { row: i, col: overrideIndex };
        }
      }
    }
    return null;
  };

  const findWinCol = (board, symbol, humanSymbol) => {
    for (let col = 0; col < board[0].length; col++) {
      // Extract the column for index `col`
      let column = board.map((row) => row[col]);
      let botCount = column.filter((item) => item === symbol).length;
      let overrideIndex = -1;

      // Check if the bot can win in this column
      if (botCount === board.length - 1) {
        overrideIndex = column.findIndex((item) => item !== symbol);

        if (humanSymbol && column[overrideIndex] === humanSymbol) {
          // Overriding humanSymbol
          return { row: overrideIndex, col };
        }

        if (column[overrideIndex] === ".") {
          // Fill empty cell
          return { row: overrideIndex, col };
        }
      }
    }

    return null; // No winning column found
  };

  const findRowPoints = (board, symbol, humanSymbol) => {
    for (let i = 0; i < board.length; i++) {
      let row = board[i];

      for (let k = 0; k < row.length - 2; k++) {
       

        // Empty cell at the end
        if (
          row[k] === symbol &&
          row[k + 1] === symbol &&
          (row[k + 2] === "." || row[k + 2] === humanSymbol) &&
          row[k] !== "."
        ) {
          
          return { row: i, col: k + 2 };
        }

        // Empty cell at the start
        if (
          (row[k] === "." || row[k] === humanSymbol) &&
          row[k + 1] === symbol &&
          row[k + 2] === symbol &&
          row[k + 2] !== "."
        ) {
          
          return { row: i, col: k };
        }

        // Empty cell in between
        if (
          row[k] === symbol &&
          (row[k + 1] === "." || row[k + 1] === humanSymbol) &&
          row[k + 2] === symbol &&
          row[k] !== "." &&
          row[k + 2] !== "."
        ) {
          
          return { row: i, col: k + 1 };
        }
      }
    }
    return null;
  };

  const findColPoints = (board, symbol, humanSymbol) => {
    for (let i = 0; i < board.length; i++) {
      let col = board.map((item) => item[i]);

      for (let k = 0; k < col.length - 2; k++) {


        // Empty cell at the end
        if (
          col[k] === symbol &&
          col[k + 1] === symbol &&
          (col[k + 2] === "." || col[k + 2] === humanSymbol) &&
          col[k] !== "."
        ) {
          
          return { row: k + 2, col: i };
        }

        // Empty cell at the start
        if (
          (col[k] === "." || col[k + 2] === humanSymbol) &&
          col[k + 1] === symbol &&
          col[k + 2] === symbol &&
          col[k + 2] !== "."
        ) {
         
          return { row: k, col: i };
        }

        // Empty cell in between
        if (
          col[k] === symbol &&
          (col[k + 1] === "." || col[k + 2] === humanSymbol) &&
          col[k + 2] === symbol &&
          col[k] !== "." &&
          col[k + 2] !== "."
        ) {
          
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
      mainDiagonal.filter((cell) => cell === symbol).length ===
        board.length - 1 &&
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

  const findLeftDiagPoints = (
    board,
    symbol,
    humanSymbol,
  ) => {
    const allDiag = getLeftDiags(board);
    //console.log(allDiag);

    for (let i = 0; i < allDiag.length; i++) {
      
      let item = allDiag[i];
      let oneIndex1 = item[0][0];
      let oneIndex2 = item[0][1];
      let twoIndex1 = item[1][0];
      let twoIndex2 = item[1][1];
      let threeIndex1 = item[2][0];
      let threeIndex2 = item[2][1];
      if (
        (board[oneIndex1][oneIndex2] === "." ||
          board[oneIndex1][oneIndex2] === humanSymbol) &&
        board[twoIndex1][twoIndex2] === symbol &&
        board[threeIndex1][threeIndex2] === symbol 
        
      ) {
       
        return { row: oneIndex1, col: oneIndex2 };
      }
      if (
        board[oneIndex1][oneIndex2] === symbol &&
        (board[twoIndex1][twoIndex2] === "." ||
          board[twoIndex1][twoIndex1] === humanSymbol) &&
        board[threeIndex1][threeIndex2] === symbol 
      ) {
      
        return { row: twoIndex1, col: twoIndex2 };
      }
      if (
        board[oneIndex1][oneIndex2] === symbol &&
        board[twoIndex1][twoIndex2] === symbol &&
        (board[threeIndex1][threeIndex2] === "." ||
          board[threeIndex1][threeIndex2] === humanSymbol) 
      ) {
        
        return { row: threeIndex1, col: threeIndex2 };
      }
    }
    return null;
  };

  const findRightDiagPoints = (
    board,
    symbol,
    humanSymbol,
    
  ) => {
    const allDiag = getRightDiags(board);
    //console.log(allDiag);

    for (let i = 0; i < allDiag.length; i++) {
      

      let item = allDiag[i];
      let oneIndex1 = item[0][0];
      let oneIndex2 = item[0][1];
      let twoIndex1 = item[1][0];
      let twoIndex2 = item[1][1];
      let threeIndex1 = item[2][0];
      let threeIndex2 = item[2][1];
      if (
        (board[oneIndex1][oneIndex2] === "." ||
          board[oneIndex1][oneIndex2] === humanSymbol) &&
        board[twoIndex1][twoIndex2] === symbol &&
        board[threeIndex1][threeIndex2] === symbol 
      ) {
        
        return { row: oneIndex1, col: oneIndex2 };
      }
      if (
        board[oneIndex1][oneIndex2] === symbol &&
        (board[twoIndex1][twoIndex2] === "." ||
          board[twoIndex1][twoIndex1] === humanSymbol) &&
        board[threeIndex1][threeIndex2] === symbol
      ) {
      
        return { row: twoIndex1, col: twoIndex2 };
      }
      if (
        board[oneIndex1][oneIndex2] === symbol &&
        board[twoIndex1][twoIndex2] === symbol &&
        (board[threeIndex1][threeIndex2] === "." ||
          board[threeIndex1][threeIndex2] === humanSymbol) 
      ) {
       
        return { row: threeIndex1, col: threeIndex2 };
      }
    }
    return null;
  };

  //special move
  let move;
  if (botSpecialMove === true) {
    console.log(botSpecialMove);
    move = findBestCellToOverwrite(board, botSymbol, playerSymbol);
    console.log("Special move is; ", move);
    if (move) return move;
  }

  //winning move
  move = findWinRow(board, botSymbol);
  console.log("Find Winning Row ", move);
  if (move) return move;

  move = findWinCol(board, botSymbol);
  console.log("Find Winning Col ", move);
  if (move) return move;

  move = findLeftDiagWin(board, botSymbol);
  console.log("Find Winning LDiag ", move);
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
  move = findRowPoints(board, botSymbol);
  //console.log("Find winning row points ", move);
  if (move) return move;

  move = findColPoints(board, botSymbol);
  //console.log("Find winning col points ", move);
  if (move) return move;

  move = findLeftDiagPoints(board, botSymbol);
  //console.log("Find winning leftD points ", move);
  if (move) return move;

  move = findRightDiagPoints(board, botSymbol);
  //console.log("Find winning rightD points ", move);
  if (move) return move;

  //blocking points
  move = findRowPoints(board, playerSymbol);
  //console.log("Find blocking row points ", move);
  if (move) return move;

  move = findColPoints(board, playerSymbol);
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
