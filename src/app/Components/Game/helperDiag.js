export const getLeftDiags = (arr) => {
  let diagonals = [];
  let allDiag = [];

  const rows = arr.length;
  const cols = arr[0].length;

  // Bottom-left diagonals (starting from first column)
  for (let row = rows - 1; row >= 0; row--) {
    let temp = [];
    let i = row;
    let j = 0; // Always start from the first column
    while (i < rows && j < cols) {
      temp.push([i, j]);
      i++; // Move down
      j++; // Move right
    }
    diagonals.push(temp);
  }

  // Top-right diagonals (starting from first row)
  for (let col = 1; col < cols; col++) {
    let temp = [];
    let i = 0; // Always start from the first row
    let j = col;
    while (i < rows && j < cols) {
      temp.push([i, j]);
      i++; // Move down
      j++; // Move right
    }
    diagonals.push(temp);
  }

  diagonals = diagonals.filter((item) => item.length > 2);
  for (let i = 0; i < diagonals.length; i++) {
    let row = diagonals[i];
    if (row.length > 3) {
      for (let j = 0; j < row.length - 2; j++) {
        let temp = [row[j], row[j + 1], row[j + 2]];
        allDiag.push(temp);
      }
    } else {
      allDiag.push(row);
    }
  }

  return allDiag;
};
export const getRightDiags = (arr) => {
  let diagonals = [];
  let allDiag = [];

  const rows = arr.length;
  const cols = arr[0].length;

  // Top-left diagonals (starting from first column)
  for (let row = 0; row < rows; row++) {
    let temp = [];
    let i = row;
    let j = 0; // Always start from the first column
    while (i >= 0 && j < cols) {
      temp.push([i, j]);
      i--; // Move up
      j++; // Move right
    }
    diagonals.push(temp);
  }

  // Bottom-right diagonals (starting from first row)
  for (let col = 1; col < cols; col++) {
    let temp = [];
    let i = rows - 1; // Always start from the last row
    let j = col;
    while (i >= 0 && j < cols) {
      temp.push([i, j]);
      i--; // Move up
      j++; // Move right
    }
    diagonals.push(temp);
  }

  // Filter diagonals with length > 2
  diagonals = diagonals.filter((item) => item.length > 2);

  // Break down longer diagonals into groups of 3
  for (let i = 0; i < diagonals.length; i++) {
    let row = diagonals[i];
    if (row.length > 3) {
      for (let j = 0; j < row.length - 2; j++) {
        let temp = [row[j], row[j + 1], row[j + 2]];
        allDiag.push(temp);
      }
    } else {
      allDiag.push(row);
    }
  }

  return allDiag;
};
export const initilaiseGrid = (grid, len, again) => {
  let flatGrid;
  if (again) {
    flatGrid = grid.map((row) => row.fill("."));
  }
  flatGrid = grid.flat();

  let randomX = Math.floor(Math.random() * flatGrid.length);
  let randomO = Math.floor(Math.random() * flatGrid.length);

  while (randomX === randomO) {
    randomO = Math.floor(Math.random() * flatGrid.length);
  }
  flatGrid[randomX] = "X";
  flatGrid[randomO] = "O";

  let newGrid = [];
  while (flatGrid.length) {
    newGrid.push(flatGrid.splice(0, len));
  }

  return newGrid;
};
