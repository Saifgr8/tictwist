/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gameBot5x5 } from "../GameBot5v5/page";

const Game5x5 = () => {
  const router = useRouter();
  const [grid, setGrid] = useState([
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
  ]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [currPlayer, setcurrPlayer] = useState("");
  const scoredPositionsRow = useRef(new Set());
  const scoredPositionsCol = useRef(new Set());
  const flags = useRef({
    leftSmallLeftDiagFlag: true,
    leftSmallRightDiagFlag: true,
    leftTinyLeftDiagFlag: true,
    leftTinyRightDiagFlag: true,
    rightSmallTopDiagFlag: true,
    rightSmallBotDiagFlag: true,
    rightTinyTopDiagFlag: true,
    rightTinyBotDiagFlag: true,
    leftDiagMain: true,
    rightDiagMain: true,
  });
  const [specialMove, setSpecialMove] = useState(false);
  const [winner, setWinner] = useState("");
  //console.log("main fucntion:", scoredPositionsRow);

  const initilaiseGrid = () => {
    let flatGrid = grid.flat();

    let randomX = Math.floor(Math.random() * flatGrid.length);
    let randomO = Math.floor(Math.random() * flatGrid.length);

    while (randomX === randomO) {
      randomO = Math.floor(Math.random() * flatGrid.length);
    }
    flatGrid[randomX] = "X";
    flatGrid[randomO] = "O";

    let newGrid = [];
    while (flatGrid.length) {
      newGrid.push(flatGrid.splice(0, 5));
    }
    //console.log(newGrid);
    setGrid(newGrid);
  };
  console.log(grid);
  const checkBoard = (board, scoredPositionsCol, scoredPositionsRow, flags) => {
    //console.log("this is anayseboard", scoredPositionsRow);
    const checkRow = (board, scoredPositionsRow) => {
      let verdict = [];

      for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        let row = board[rowIndex];

        // Check for 3 consecutive symbols for scoring points
        for (let i = 0; i < row.length - 2; i++) {
          if (scoredPositionsRow.has(`${rowIndex}-${i}`)) {
            continue;
          }
          if (
            row[i] === row[i + 1] &&
            row[i + 1] === row[i + 2] &&
            row[i] !== "."
          ) {
            verdict[0] = row[i]; // Scoring 3 consecutive symbols
            scoredPositionsRow.add(`${rowIndex}-${i}`); // Mark the sequence as scored
          }
        }

        // Check for 5 consecutive symbols for winning
        for (let i = 0; i < row.length - 4; i++) {
          if (
            row[i] === row[i + 1] &&
            row[i + 1] === row[i + 2] &&
            row[i + 2] === row[i + 3] &&
            row[i + 3] === row[i + 4] &&
            row[i] !== "."
          ) {
            verdict[1] = row[i]; // Winning 5 consecutive symbols
            break; // No need to check further for a winner in this row
          }
        }
      }

      if (verdict[0] === undefined) {
        verdict[0] = null; // No points scored
      }
      if (verdict[1] === undefined) {
        verdict[1] = null; // No winner found
      }

      return verdict;
    };

    const checkCol = (board, scoredPositionsCol) => {
      let colArr = []; // To store columns
      let verdict = [];

      // Construct columns from the board
      for (let i = 0; i < board[0].length; i++) {
        let col = board.map((row) => row[i]);
        colArr.push(col);
      }

      // Iterate through each column
      for (let colIndex = 0; colIndex < colArr.length; colIndex++) {
        let col = colArr[colIndex];

        // Check for 3 consecutive symbols (points)
        for (let i = 0; i < col.length - 2; i++) {
          if (scoredPositionsCol.has(`${i}-${colIndex}`)) {
            continue;
          }
          if (
            col[i] === col[i + 1] &&
            col[i + 1] === col[i + 2] &&
            col[i] !== "."
          ) {
            verdict[0] = col[i]; // Record symbol for 3 consecutive points
            scoredPositionsCol.add(`${i}-${colIndex}`); // Mark this position as scored
          }
        }

        // Check for 5 consecutive symbols (win condition)
        for (let i = 0; i < col.length - 4; i++) {
          if (
            col[i] === col[i + 1] &&
            col[i + 1] === col[i + 2] &&
            col[i + 2] === col[i + 3] &&
            col[i + 3] === col[i + 4] &&
            col[i] !== "."
          ) {
            verdict[1] = col[i]; // Record winner
            break; // No need to check further for a winner in this column
          }
        }
      }

      if (verdict[0] === undefined) verdict[0] = null; // No points scored
      if (verdict[1] === undefined) verdict[1] = null; // No winner found

      return verdict;
    };

    const checkDiagonal = (board, flags) => {
      const leftDiagonal = (board, flags) => {
        let verdict = [null, null]; // [points, winner]

        // Define diagonals
        const mainDiagonal = []; // Main diagonal (5 cells)
        const topSmallDiag = [
          board[0][1],
          board[1][2],
          board[2][3],
          board[3][4],
        ]; // 4 cells
        const bottomSmallDiag = [
          board[1][0],
          board[2][1],
          board[3][2],
          board[4][3],
        ]; // 4 cells
        const topTinyDiag = [board[0][2], board[1][3], board[2][4]]; // 3 cells
        const bottomTinyDiag = [board[2][0], board[3][1], board[4][2]]; // 3 cells

        // Build main diagonal
        for (let i = 0; i < board.length; i++) {
          mainDiagonal.push(board[i][i]);
        }

        // Helper function to check points in a diagonal
        const checkDiagonalPoints = (
          diagonal,
          flagName,
          rowOffsets,
          colOffsets
        ) => {
          if (!flags[flagName]) return null;

          // Check for 3 consecutive symbols for points
          for (let i = 0; i < diagonal.length - 2; i++) {
            if (
              diagonal[i] === diagonal[i + 1] &&
              diagonal[i + 1] === diagonal[i + 2] &&
              diagonal[i] !== "."
            ) {
              flags[flagName] = false;
              verdict[0] = diagonal[i]; // Points scored
              return { row: rowOffsets[i], col: colOffsets[i] }; // Return the position
            }
          }
        };

        // Helper function to check for winner in a diagonal
        const checkDiagonalWinner = (diagonal) => {
          for (let i = 0; i < diagonal.length - 4; i++) {
            if (
              diagonal[i] === diagonal[i + 1] &&
              diagonal[i + 1] === diagonal[i + 2] &&
              diagonal[i + 2] === diagonal[i + 3] &&
              diagonal[i + 3] === diagonal[i + 4] &&
              diagonal[i] !== "."
            ) {
              verdict[1] = diagonal[i]; // Winner found
              return;
            }
          }
        };

        // Check all diagonals for points and winner
        checkDiagonalPoints(
          mainDiagonal,
          "leftDiagMain",
          [0, 1, 2, 3, 4],
          [0, 1, 2, 3, 4]
        );
        checkDiagonalPoints(
          topSmallDiag,
          "leftSmallRightDiagFlag",
          [0, 1, 2, 3],
          [1, 2, 3, 4]
        );
        checkDiagonalPoints(
          bottomSmallDiag,
          "leftSmallLeftDiagFlag",
          [1, 2, 3, 4],
          [0, 1, 2, 3]
        );
        checkDiagonalPoints(
          topTinyDiag,
          "leftTinyRightDiagFlag",
          [0, 1, 2],
          [2, 3, 4]
        );
        checkDiagonalPoints(
          bottomTinyDiag,
          "leftTinyLeftDiagFlag",
          [2, 3, 4],
          [0, 1, 2]
        );

        // Check for winner in main diagonal
        checkDiagonalWinner(mainDiagonal);

        // Return verdict
        return verdict;
      };

      const rightDiagonal = (board, flags) => {
        let verdict = [null, null]; // [points, winner]

        // Define diagonals
        const mainDiagonal = []; // Main diagonal (5 cells)
        const topSmallDiag = [
          board[0][3],
          board[1][2],
          board[2][1],
          board[3][0],
        ]; // 4 cells
        const bottomSmallDiag = [
          board[1][4],
          board[2][3],
          board[3][2],
          board[4][1],
        ]; // 4 cells
        const topTinyDiag = [board[0][2], board[1][1], board[2][0]]; // 3 cells
        const bottomTinyDiag = [board[2][4], board[3][3], board[4][2]]; // 3 cells

        // Build main diagonal (right-to-left)
        for (let i = 0; i < board.length; i++) {
          mainDiagonal.push(board[i][board.length - 1 - i]);
        }

        // Helper function to check points in a diagonal
        const checkDiagonalPoints = (
          diagonal,
          flagName,
          rowOffsets,
          colOffsets
        ) => {
          if (!flags[flagName]) return null;

          // Check for 3 consecutive symbols for points
          for (let i = 0; i < diagonal.length - 2; i++) {
            if (
              diagonal[i] === diagonal[i + 1] &&
              diagonal[i + 1] === diagonal[i + 2] &&
              diagonal[i] !== "."
            ) {
              flags[flagName] = false;
              verdict[0] = diagonal[i]; // Points scored
              return { row: rowOffsets[i], col: colOffsets[i] }; // Return the position
            }
          }
        };

        // Helper function to check for winner in a diagonal
        const checkDiagonalWinner = (diagonal) => {
          for (let i = 0; i < diagonal.length - 4; i++) {
            if (
              diagonal[i] === diagonal[i + 1] &&
              diagonal[i + 1] === diagonal[i + 2] &&
              diagonal[i + 2] === diagonal[i + 3] &&
              diagonal[i + 3] === diagonal[i + 4] &&
              diagonal[i] !== "."
            ) {
              verdict[1] = diagonal[i]; // Winner found
              return;
            }
          }
        };

        // Check all diagonals for points and winner
        checkDiagonalPoints(
          mainDiagonal,
          "rightDiagMain",
          [0, 1, 2, 3, 4],
          [4, 3, 2, 1, 0]
        );
        checkDiagonalPoints(
          topSmallDiag,
          "rightSmallTopDiagFlag",
          [0, 1, 2, 3],
          [3, 2, 1, 0]
        );
        checkDiagonalPoints(
          bottomSmallDiag,
          "rightSmallBotDiagFlag",
          [1, 2, 3, 4],
          [4, 3, 2, 1]
        );
        checkDiagonalPoints(
          topTinyDiag,
          "rightTinyTopDiagFlag",
          [0, 1, 2],
          [2, 1, 0]
        );
        checkDiagonalPoints(
          bottomTinyDiag,
          "rightTinyBotDiagFlag",
          [2, 3, 4],
          [4, 3, 2]
        );

        // Check for winner in main diagonal
        checkDiagonalWinner(mainDiagonal);

        // Return verdict
        return verdict;
      };

      let leftDiagVerdict = leftDiagonal(board, flags);
      if (leftDiagVerdict[0] !== null || leftDiagVerdict[1] !== null) {
        return leftDiagVerdict;
      }

      let rightDiagVerdict = rightDiagonal(board, flags);
      if (rightDiagVerdict[0] !== null || rightDiagVerdict[1] !== null) {
        return rightDiagVerdict;
      }

      return [null, null];
    };

    let rowVerdict = checkRow(board, scoredPositionsRow);
    if (rowVerdict[0] !== null || rowVerdict[1] !== null) {
      return rowVerdict;
    }
    let colVerdict = checkCol(board, scoredPositionsCol);
    if (colVerdict[0] !== null || colVerdict[1] !== null) {
      return colVerdict;
    }
    let diagVerdict = checkDiagonal(board, flags);
    if (diagVerdict[0] !== null || diagVerdict[1] !== null) {
      return diagVerdict;
    }
    return [null, null];
  };

  useEffect(() => {
    initilaiseGrid();
    setPlayer1(localStorage.getItem("Player1"));
    setPlayer2(localStorage.getItem("Player2"));
    setcurrPlayer(localStorage.getItem("CurrPlayer"));
  }, [initilaiseGrid]);

  const handleReset = () => {
    router.push("/");
  };

  const updateScore = () => {
    const verdict = checkBoard(
      grid,
      scoredPositionsRow.current,
      scoredPositionsCol.current,
      flags.current
    );
    console.log("verdict at op ", verdict);
    if (verdict === null) return;

    if (verdict[0] === "X") {
      setPlayer1Points((prev) => prev + 1);
    } else if (verdict[0] === "O") {
      setPlayer2Points((prev) => prev + 1);
    }
    if (verdict[1] === "X" || verdict[1] === "O") {
      setWinner(verdict[1]);
    }
  };

  useEffect(() => {
    updateScore();
    if (
      !winner &&
      player1 &&
      player2 &&
      currPlayer === player2 &&
      grid.flat().includes(".")
    ) {
      handleBotMove();
    }
  }, [grid]);

  console.log(specialMove);

  const handleSpecialMove = (user) => {
    if (user === player1) {
      setPlayer1Points(0);
    }
    if (user === player2) {
      setPlayer2Points(0);
    }
    let specialPlayer = currPlayer === player1 ? player2 : player1;
    setcurrPlayer(specialPlayer);
    setSpecialMove(true);
  };

  const handleMove = (index) => {
    let row = Math.floor(index / grid.length);
    let col = index % grid.length;

    if (specialMove) {
      if (grid[row][col] === currPlayer) {
        window.alert("Slect opponent cells");
      }
      setGrid((prev) => {
        let newGrid = prev.map((row) => [...row]);
        newGrid[row][col] = currPlayer;
        let newPlayer = currPlayer === player1 ? player2 : player1;
        setcurrPlayer(newPlayer);
        return newGrid;
      });
    }

    if (grid[row][col] === ".") {
      setGrid((prev) => {
        let newGrid = prev.map((row) => [...row]);
        newGrid[row][col] = currPlayer;
        let newPlayer = currPlayer === player1 ? player2 : player1;
        setcurrPlayer(newPlayer);
        return newGrid;
      });
    }
    return grid;
  };

  const handleBotMove = () => {
    //special move
    if (currPlayer === player2 && grid.flat().includes(".")) {
      let bot = player2;
      let human = player1;
      const move = gameBot5x5(
        grid,
        bot,
        human,
        scoredPositionsRow.current,
        scoredPositionsCol.current,
        flags.current
      );

      if (move) {
        setGrid((prev) => {
          let newGrid = prev.map((item) => [...item]);
          newGrid[move.row][move.col] = bot;

          setcurrPlayer(player1);
          return newGrid;
        });
      }
    }
  };
  //console.log(checkBoard(grid));
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen">
      <div className="h-28 w-96 bg-red-300 flex flex-col justify-start items-center text-2xl">
        {winner && (
          <div className="font-bold text-2xl items-center text-center pt-10">
            {winner} has won the game!
          </div>
        )}
        {!winner && (
          <>
            <div className="flex justify-around items-center w-full ">
              <div>Player1: {player1}</div>
              <div>Player2: {player2}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              Current player
              <span>
                {currPlayer}
                {specialMove && <span> &apos; special move</span>}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-row justify-center items-center w-full gap-10">
        <div className="h-96 w-40 bg-red-500 flex flex-col justify-evenly text-center text-4xl">
          <div className="text-xl h-1/4">Points</div>
          <div className="flex flex-row items-start justify-center h-3/4 ">
            <div className=" flex flex-col border-2 w-1/2 h-full pt-2">
              <span>{player1}</span>
              {player1Points}
              {player1Points >= 3 && (
                <button
                  onClick={() => handleSpecialMove(player1)}
                  className="m-2 p-2 bg-green-300 shadow-xl rounded-xl text-xl"
                >
                  Special ability
                </button>
              )}
            </div>
            <div className="flex flex-col border-2 w-1/2 h-full pt-2">
              <span>{player2}</span>
              {player2Points}
              {player2Points >= 3 && (
                <button
                  onClick={() => handleSpecialMove(player2)}
                  className="m-2 p-2 bg-green-300 shadow-xl rounded-xl text-xl"
                >
                  Special ability
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="h-[500px] w-[480px] bg-red-300 flex flex-row flex-wrap overflow-hidden">
          {grid.flat().map((cell, index) => {
            return (
              <div
                key={index}
                onClick={() => handleMove(index)}
                className={`${
                  winner ? "cursor-not-allowed" : "cursor-pointer"
                } h-20 w-20 bg-white m-2 text-6xl text-black flex items-center justify-center hover:rounded-xl hover:shadow-xl`}
              >
                {cell}
              </div>
            );
          })}
        </div>
        {/* <div className="h-96 w-80 bg-red-500">Rules</div> */}
      </div>
      <button
        onClick={handleReset}
        className="text-white m-2 p-2 bg-red-700 shadow-xl rounded-xl hover:scale-125"
      >
        {" "}
        Reset
      </button>
    </div>
  );
};

export default Game5x5;
