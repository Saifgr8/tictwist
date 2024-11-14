/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gameBot4x4 } from "../GameBot4x4/page";
import { checkBoard } from "./Game4x4Rules";
import Game4x4UI from "./Game4x4UI";

const Game4x4 = () => {
  const router = useRouter();
  const [grid, setGrid] = useState([
    [".", ".", ".", "."],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
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
    rightSmallTopDiagFlag: true,
    rightSmallBotDiagFlag: true,
    leftDiagMain: true,
    rightDiagMain: true,
  });
  const [specialMove, setSpecialMove] = useState(false);
  const [botSpecialMove, setbotSpecialMove] = useState(false);
  const [winner, setWinner] = useState("");
  const [activeCell, setactiveCell] = useState(null);
  const [highlightGrid, setHighlightGrid] = useState(
    Array(grid.length)
      .fill(null)
      .map(() => Array(grid[0].length).fill(false))
  );
  const [draw, setDraw] = useState(false);
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
      newGrid.push(flatGrid.splice(0, 4));
    }

    setGrid(newGrid);
  };

  useEffect(() => {
    initilaiseGrid();
    setPlayer1(localStorage.getItem("Player1"));
    setPlayer2(localStorage.getItem("Player2"));
    setcurrPlayer(localStorage.getItem("CurrPlayer"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateScore(); // Update scores after every move

    const flatGrid = grid.flat();
    if (winner || !flatGrid.includes(".")) {
      setPlayer1Points(0);
      setPlayer2Points(0);
      return;
    } // Stop if game is over or grid is full
    if (!grid.flat().includes(".")) {
      checkDraw();
      return;
    }
    if (specialMove) {
      setcurrPlayer(player1);
      return;
    }

    if (!winner && botSpecialMove) {
      console.log("Bot special move triggered,", currPlayer);
      handleBotMove(player2); // Explicitly pass player2 for the bot's turn
      return;
    }

    if (
      !winner &&
      currPlayer === player2 &&
      player1 &&
      flatGrid.includes(".")
    ) {
      console.log("Bot is making a normal move");
      handleBotMove(player2); // Explicitly pass player2 for normal move
    }
  }, [grid, winner, botSpecialMove]);

  const handleReset = () => {
    router.push("/");
  };
  const applyHighlights = (highlights) => {
    console.log("Highlights to apply:", highlights);

    setHighlightGrid((prev) => {
      const newHighlightGrid = prev.map((row) => row.map(() => false)); // Reset highlights
      highlights?.forEach(([r, c]) => {
        if (r >= 0 && r < prev.length && c >= 0 && c < prev[0].length) {
          newHighlightGrid[r][c] = true; // Set true for highlighted cells
        } else {
          console.error(`Invalid highlight index: row ${r}, col ${c}`);
        }
      });
      return newHighlightGrid;
    });

    // Clear highlights after 1 second
    setTimeout(() => {
      setHighlightGrid(
        (prev) => prev.map((row) => row.map(() => false)) // Reset highlights
      );
    }, 1000);
  };

  const checkDraw = () => {
    let open = grid.flat().filter((item) => item === ".");
    if (open.length === 0) {
      setDraw(true);
      window.alert("Even bigger boards soon!");
      handleReset();
    }
  };

  const updateScore = () => {
    const { highLight, verdict } = checkBoard(
      grid,
      scoredPositionsRow.current,
      scoredPositionsCol.current,
      flags.current
    );
    console.log("Verdit at op is ", verdict, highLight);
    if (!verdict) return;

    if (verdict[0] === player1) {
      setPlayer1Points((prev) => prev + 1);
      applyHighlights(highLight);
    } else if (verdict[0] === player2) {
      setPlayer2Points((prev) => prev + 1);
      applyHighlights(highLight);
    }

    if (verdict[1] === player1 || verdict[1] === player2) {
      setWinner(verdict[1]);
    }
  };

  const handleMove = (index) => {
    let row = Math.floor(index / grid.length);
    let col = index % grid.length;

    if (winner) {
      window.alert("Game ended, try again");
      router.push("/");
    }

    if (specialMove) {
      if (grid[row][col] === currPlayer) {
        window.alert("Select opponent cells");
        return;
      }

      setGrid((prev) => {
        let newGrid = prev.map((row) => [...row]);
        newGrid[row][col] = currPlayer;

        setSpecialMove(false); // End the special move
        setactiveCell(index);
        setTimeout(() => {
          setactiveCell(null);
        }, 1000);

        setcurrPlayer(player2); // Pass the turn back to the bot after special move
        return newGrid;
      });
      return;
    }
    if (currPlayer === player1 && !winner) {
      if (grid[row][col] === ".") {
        setGrid((prev) => {
          let newGrid = prev.map((row) => [...row]);
          newGrid[row][col] = currPlayer;

          setactiveCell(index);
          setTimeout(() => {
            setactiveCell(null);
          }, 2000);

          let newPlayer = currPlayer === player1 ? player2 : player1;
          if (player1Points === 2) {
            let crucialPoint = checkBoard(
              newGrid,
              scoredPositionsRow.current,
              scoredPositionsCol.current,
              flags.current
            );
            if (crucialPoint.verdict && crucialPoint.verdict[0] === player1) {
              console.log("Player 1 triggers a special move!");
              setSpecialMove(true);
              setcurrPlayer(player1); // Trigger special move for Player 1
              setPlayer1Points(0); // Reset points after special move
              return newGrid; // Allow Player 1 to play again
            }
          }

          setcurrPlayer(newPlayer);
          return newGrid;
        });
      }
    } else {
      console.log("Not your move");
    }
  };

  const handleBotMove = (currentPlayer) => {
    if (currentPlayer === player2 && grid.flat().includes(".")) {
      let bot = player2;
      let human = player1;
      let time = botSpecialMove ? 4000 : 2000;

      setTimeout(() => {
        // Special Move Handling
        if (botSpecialMove) {
          console.log("Bot is using its special move");
          const move = gameBot4x4(
            grid,
            bot,
            human,
            scoredPositionsRow.current,
            scoredPositionsCol.current,
            botSpecialMove
          );

          if (move) {
            setGrid((prev) => {
              let newGrid = prev.map((row) => [...row]);
              newGrid[move.row][move.col] = bot;

              setbotSpecialMove(false); // End special move
              setactiveCell(move.row * newGrid.length + move.col);
              setTimeout(() => {
                setactiveCell(null);
              }, 2000);

              setcurrPlayer(player1);
              console.log("Special move ends, but bot continues");
              return newGrid;
            });
            return;
          }
        }

        // Normal Move Handling
        const move = gameBot4x4(
          grid,
          bot,
          human,
          scoredPositionsRow.current,
          scoredPositionsCol.current
        );

        if (move) {
          setGrid((prev) => {
            let newGrid = prev.map((row) => [...row]);
            newGrid[move.row][move.col] = bot;
            console.log("move before bot bug ", move);
            if (player2Points === 2) {
              let newPoint = checkBoard(
                newGrid,
                scoredPositionsRow.current,
                scoredPositionsCol.current,
                flags.current
              );
              console.log("Crucial point for Bot: ", newPoint);
              console.log("Updated grid just before bot bug ", newGrid);
              console.log("move after grid is updated bot ", move);
              if (newPoint.verdict && newPoint.verdict[0] === player2) {
                console.log("Bot triggers a special move!");
                setbotSpecialMove(true);
                setPlayer2Points(0);
                return newGrid; // Bot continues its turn
              }
            }

            if (!botSpecialMove) {
              setcurrPlayer(player1); // Switch to player1 only if no special move
            }

            setactiveCell(move.row * newGrid.length + move.col);
            setTimeout(() => {
              setactiveCell(null);
            }, 2000);

            return newGrid;
          });
        }
      }, time);
    }
  };

  return (
    <div>
      <Game4x4UI
        handleMove={handleMove}
        winner={winner}
        player1={player1}
        player2={player2}
        currPlayer={currPlayer}
        specialMove={specialMove}
        player1Points={player1Points}
        player2Points={player2Points}
        grid={grid}
        handleReset={handleReset}
        highlightGrid={highlightGrid}
        activeCell={activeCell}
        botSpecialMove={botSpecialMove}
      />
    </div>
  );
};

export default Game4x4;
