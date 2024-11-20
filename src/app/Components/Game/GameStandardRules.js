import { getLeftDiags, getRightDiags } from "./helperDiag";

export const checkBoard = (
  board,
  scoredPositionsRow,
  scoredPositionsCol,
  scoredPointsLeftDiag,
  scoredPointsRightDiag
) => {
  const checkRow = (board, scoredPositionsRow) => {
    let verdict = [];
    let highlight = [];
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      const row = board[rowIndex];

      //winner condition for all boards
      const set = [...new Set(row)];
      if (set.length === 1 && set[0] !== ".") {
        console.log("hi");
        const highlight = row.map((_, colIndex) => [rowIndex, colIndex]);
        verdict[0] = null;
        verdict[1] = set[0];
        return { verdict, highlight };
      }

      //check for points
      //[. . . x x x x . .] //set ->035 046
      for (let i = 0; i < row.length - 2; i++) {
        if (
          row[i] === row[i + 1] &&
          row[i + 1] === row[i + 2] &&
          row[i] !== "." &&
          !scoredPositionsRow.has(`${rowIndex}${i}${i + 2}`)
        ) {
          verdict[0] = row[i];
          scoredPositionsRow.add(`${rowIndex}${i}${i + 2}`);
          highlight.push([rowIndex, i], [rowIndex, i + 1], [rowIndex, i + 2]);
        }
      }
    }
    if (verdict[0] === undefined) verdict[0] = null;
    if (verdict[1] === undefined) verdict[1] = null;
    //console.log(highlight);
    return { verdict, highlight };
  };

  const checkCol = (board, scoredPositionsCol) => {
    console.log("hi im in col");
    //convert grid from rows -> cols
    let colArr = [];
    let verdict = [];
    let highlight = [];
    board.forEach((_, index) => {
      colArr.push(board.map((item) => item[index]));
    });

    for (let colIndex = 0; colIndex < colArr.length; colIndex++) {
      const col = colArr[colIndex];
      //check for winner
      const set = [...new Set(col)];
      if (set.length === 1 && set[0] !== ".") {
        const highlight = col.map((_, rowIndex) => [rowIndex, colIndex]);
        verdict[0] = null;
        verdict[1] = set[0];
        return { verdict, highlight };
      }

      //check for points
      for (let i = 0; i < col.length - 2; i++) {
        if (
          col[i] === col[i + 1] &&
          col[i + 1] === col[i + 2] &&
          col[i] !== "." &&
          !scoredPositionsCol.has(`${colIndex}${i}${i + 2}`)
        ) {
          verdict[0] = col[i];
          scoredPositionsCol.add(`${colIndex}${i}${i + 2}`);
          highlight.push([i, colIndex], [i + 1, colIndex], [i + 2, colIndex]);
        }
      }
    }
    if (verdict[0] === undefined) verdict[0] = null;
    if (verdict[1] === undefined) verdict[1] = null;
    console.log(verdict, highlight);
    return { verdict, highlight };
  };

  const checkDiagonal = (
    board,
    scoredPointsLeftDiag,
    scoredPointsRightDiag
  ) => {
    let verdict = [];
    let highlight = [];
    const leftDiagonal = (board, scoredPointsLeftDiag) => {
      let verdict = [];
      let highlight = [];

      //3x3 board
      if (board.length === 3) {
        let diagArr = [];
        for (let i = 0; i < board.length; i++) {
          diagArr.push(board[i][i]);
          highlight.push([i, i]);
        }
        const set = [...new Set(diagArr)];
        if (set.length === 1 && set[0] !== ".") {
          verdict[0] = null;
          verdict[1] = set[0];
          return { verdict, highlight };
        }
        if (verdict[0] === undefined) verdict[0] = null;
        if (verdict[1] === undefined) verdict[1] = null;
        return { verdict, highlight };
      }
      //win condition //[0 4 7 9]
      let winArr = [];
      for (let i = 0; i < board.length; i++) {
        winArr.push(board[i][i]);
      }
      let set = [...new Set(winArr)];
      if (set.length === 1 && set[0] !== ".") {
        for (let i = 0; i < board.length; i++) {
          highlight.push([i, i]);
        }
        verdict[0] = null;
        verdict[1] = set[0];
        return { verdict, highlight };
      }

      //points
      const allDiag = getLeftDiags(board);
      //console.log(allDiag);
      for (let i = 0; i < allDiag.length; i++) {
        if (scoredPointsLeftDiag.has(i)) {
          continue;
        }

        let item = allDiag[i];
        let oneIndex1 = item[0][0];
        let oneIndex2 = item[0][1];
        let twoIndex1 = item[1][0];
        let twoIndex2 = item[1][1];
        let threeIndex1 = item[2][0];
        let threeIndex2 = item[2][1];
        console.log("hi before diag");
        if (
          board[oneIndex1][oneIndex2] === board[twoIndex1][twoIndex2] &&
          board[twoIndex1][twoIndex2] === board[threeIndex1][threeIndex2] &&
          !scoredPointsLeftDiag.has(i) &&
          board[oneIndex1][oneIndex2] !== "."
        ) {
          scoredPointsLeftDiag.add(i);
          highlight = item;
          //console.log(scoredPointsLeftDiag, highlight, item);
          verdict[0] = board[oneIndex1][oneIndex2];
          verdict[1] = null;
          return { verdict, highlight };
        }
      }
      if (verdict[0] === undefined) verdict[0] = null;
      if (verdict[1] === undefined) verdict[1] = null;
      return { verdict, highlight };
    };

    const rightDiagonal = (board, scoredPointsRightDiag) => {
      let diagArr = [];
      let highlight = [];

      if (board.length === 3) {
        for (let i = 0; i < board.length; i++) {
          diagArr.push(board[i][board.length - 1 - i]);
          highlight.push([i, board.length - 1 - i]);
        }
        const set = [...new Set(diagArr)];
        if (set.length === 1 && set[0] !== ".") {
          verdict[0] = null;
          verdict[1] = set[0];
          return { verdict, highlight };
        }
        if (verdict[0] === undefined) verdict[0] = null;
        if (verdict[1] === undefined) verdict[1] = null;
        return { verdict, highlight };
      }

      //win condition //[0 4 7 9]
      let winArr = [];
      for (let i = 0; i < board.length; i++) {
        winArr.push(board[i][board.length - 1 - i]);
      }
      let set = [...new Set(winArr)];
      if (set.length === 1 && set[0] !== ".") {
        for (let i = 0; i < board.length; i++) {
          highlight.push([i, board.length - 1 - i]);
        }
        verdict[0] = null;
        verdict[1] = set[0];
        return { verdict, highlight };
      }

      //points
      const allDiag = getRightDiags(board);

      for (let i = 0; i < allDiag.length; i++) {
        if (scoredPointsRightDiag.has(i)) {
          continue;
        }
        let item = allDiag[i];
        let oneIndex1 = item[0][0];
        let oneIndex2 = item[0][1];
        let twoIndex1 = item[1][0];
        let twoIndex2 = item[1][1];
        let threeIndex1 = item[2][0];
        let threeIndex2 = item[2][1];
        if (
          board[oneIndex1][oneIndex2] === board[twoIndex1][twoIndex2] &&
          board[twoIndex1][twoIndex2] === board[threeIndex1][threeIndex2] &&
          !scoredPointsRightDiag.has(i) &&
          board[oneIndex1][oneIndex2] !== "."
        ) {
          scoredPointsRightDiag.add(i);
          highlight = item;
          verdict[0] = board[oneIndex1][oneIndex2];
          verdict[1] = null;
          return { verdict, highlight };
        }
      }
      if (verdict[0] === undefined) verdict[0] = null;
      if (verdict[1] === undefined) verdict[1] = null;
      return { verdict, highlight };
    };

    const leftResult = leftDiagonal(board, scoredPointsLeftDiag);
    if (leftResult.verdict[0] !== null || leftResult.verdict[1] !== null)
      return leftResult;

    const rightResult = rightDiagonal(board, scoredPointsRightDiag);
    if (rightResult) return rightResult;

    if (verdict[0] === undefined) verdict[0] = null;
    if (verdict[1] === undefined) verdict[1] = null;
    return { verdict, highlight };
  };

  const rowResult = checkRow(board, scoredPositionsRow);
  if (rowResult.verdict[0] !== null || rowResult.verdict[1] !== null)
    return rowResult;

  const colResult = checkCol(board, scoredPositionsCol);
  if (colResult.verdict[0] !== null || colResult.verdict[1] !== null)
    return colResult;

  const diagResult = checkDiagonal(
    board,
    scoredPointsLeftDiag,
    scoredPointsRightDiag
  );
  if (diagResult) return diagResult;

  let verdict = [null, null];
  let highlight = [];
  return { verdict, highlight };
};
