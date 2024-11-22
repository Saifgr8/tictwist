/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gameBot4x4 } from "../GameBot4x4/page";
import { checkBoard } from "../Game/GameStandardRules";
import Game4x4UI from "./Game4x4UI";
import { initilaiseGrid } from "../Game/helperDiag";

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
  const [currPlayer, setcurrPlayer] = useState(player1);
  const scoredPositionsRow = useRef(new Set());
  const scoredPositionsCol = useRef(new Set());
  const scoredPointsLeftDiag = useRef(new Set());
  const scoredPointsRightDiag = useRef(new Set());
  const [specialMove, setSpecialMove] = useState(false);
  const [botSpecialMove, setbotSpecialMove] = useState(false);
  const [winner, setWinner] = useState("");
  const [illegalMove, setillegalMove] = useState("");
  const winnerFound = useRef(false);
  const [highlightGrid, setHighlightGrid] = useState(
    Array(grid.length)
      .fill(null)
      .map(() => Array(grid[0].length).fill(false))
  );
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    setGrid(initilaiseGrid(grid, 4));
    setPlayer1(localStorage.getItem("Player1"));
    setPlayer2(localStorage.getItem("Player2"));
    setcurrPlayer(localStorage.getItem("CurrPlayer"));
  }, []);

  //console.log(typeof botSpecialMove);

  useEffect(() => {
    let localWinnerFound = winnerFound.current; // Local variable to avoid relying on async state
    console.log("local winner is", localWinnerFound);

    // Early exit if a winner is already found
    if (localWinnerFound && localWinnerFound === player1) {
      startNewBoard();
    }

    // Update scores only if no winner is found
    updateScore();

    const flatGrid = grid.flat();

    // Check for draw condition

    checkDraw();

    // Handle special move
    if (specialMove) {
      console.log("Special move activated, setting player1's turn.");
      setcurrPlayer(player1);
      return;
    }

    // Handle bot's special move
    if (botSpecialMove) {
      console.log("Bot special move triggered,", currPlayer);
      handleBotMove(player2); // Bot takes a special move
      return;
    }

    // Handle bot's normal move
    if (
      currPlayer === player2 &&
      player1 &&
      flatGrid.includes(".") &&
      !localWinnerFound
    ) {
      console.log("Bot is making a normal move. ", localWinnerFound);
      handleBotMove(player2); // Normal bot move
    }
  }, [grid, winnerFound, botSpecialMove]);

  const handleReset = () => {
    router.push("/");
  };
  const applyHighlights = (highlights, won) => {
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
    if (!won) {
      setTimeout(() => {
        setHighlightGrid(
          (prev) => prev.map((row) => row.map(() => false)) // Reset highlights
        );
      }, 1000);
    }
  };

  const startNewBoard = () => {
    let winnerTimeOut;
    winnerTimeOut = setTimeout(() => {
      window.alert("Starting a 5x5 grid");
      window.localStorage.setItem("Player1", player1);
      window.localStorage.setItem("Player2", player2);
      window.localStorage.setItem("CurrPlayer", currPlayer);
      router.push("./Game5x5");
    }, 1500);

    return () => {
      clearTimeout(winnerTimeOut);
    };
  };

  const HandleplayAgain = () => {
    setHighlightGrid(
      (prev) => prev.map((row) => row.map(() => false)) // Reset highlights
    );
    setGrid(initilaiseGrid(grid, 4, true));
    setPlayer1Points(0);
    setPlayer2Points(0);
    scoredPointsLeftDiag.current.clear();
    scoredPointsRightDiag.current.clear();
    scoredPositionsRow.current.clear();
    scoredPositionsCol.current.clear();
    setWinner("");
    winnerFound.current = false;
    setSpecialMove(false);
    setbotSpecialMove(false);
    setPlayer1(localStorage.getItem("Player1"));
    setPlayer2(localStorage.getItem("Player2"));
    setcurrPlayer(localStorage.getItem("CurrPlayer"));
  };

  const checkDraw = () => {
    let open = grid.flat().filter((item) => item === ".");
    let drawTimeOut;
    if (open.length === 0) {
      setDraw(true);
      drawTimeOut = setTimeout(() => {
        window.alert("Starting a 5x5 grid");
        window.localStorage.setItem("Player1", player1);
        window.localStorage.setItem("Player2", player2);
        window.localStorage.setItem("CurrPlayer", currPlayer);
        router.push("./Game5x5");
      }, 1500);
    }

    return () => {
      clearTimeout(drawTimeOut);
    };
  };

  const updateScore = () => {
    const { highlight, verdict } = checkBoard(
      grid,
      scoredPositionsRow.current,
      scoredPositionsCol.current,
      scoredPointsLeftDiag.current,
      scoredPointsRightDiag.current
    );
    console.log("Verdit at op is ", verdict, highlight);
    if (!verdict) return;

    if (verdict[1] === player1 || verdict[1] === player2) {
      let won = true;
      applyHighlights(highlight, won);
      setWinner(verdict[1]);
      winnerFound.current = true;
      return;
    }

    if (verdict[0] === player1) {
      setPlayer1Points((prev) => prev + 1);
      applyHighlights(highlight);
    } else if (verdict[0] === player2) {
      setPlayer2Points((prev) => prev + 1);
      applyHighlights(highlight);
    }
  };

  const handleMove = (index) => {
    let row = Math.floor(index / grid.length);
    let col = index % grid.length;

    if (currPlayer !== player1) {
      let tm;
      setillegalMove("Not your move");
      tm = setTimeout(() => {
        setillegalMove("");
      }, 1000);

      return () => {
        clearTimeout(tm);
      };
    }

    // if (winnerFound.current) {
    //   window.alert("Game ended, try again");
    //   router.push("/");
    //   return;
    // }

    if (specialMove) {
      if (grid[row][col] === currPlayer) {
        window.alert("Select opponent cells");
        return;
      }

      setGrid((prev) => {
        let newGrid = prev.map((row) => [...row]);
        newGrid[row][col] = currPlayer;

        setSpecialMove(false); // End the special move
        setcurrPlayer(player2); // Pass the turn back to the bot after special move
        return newGrid;
      });
      return;
    }
    if (currPlayer === player1 && !winnerFound.current) {
      if (grid[row][col] === ".") {
        setGrid((prev) => {
          let newGrid = prev.map((row) => [...row]);
          newGrid[row][col] = currPlayer;

          let newPlayer = currPlayer === player1 ? player2 : player1;
          if (player1Points >= 2) {
            let crucialPoint = checkBoard(
              newGrid,
              scoredPositionsRow.current,
              scoredPositionsCol.current,
              scoredPointsLeftDiag.current,
              scoredPointsRightDiag.current
            );
            if (crucialPoint.verdict && crucialPoint.verdict[0] === player1) {
              console.log("Player 1 triggers a special move!");
              setSpecialMove(true);
              setcurrPlayer(player1); // Trigger special move for Player 1
              let won = true;
              applyHighlights(crucialPoint.highlight, won);
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
    if (
      currentPlayer === player2 &&
      grid.flat().includes(".") &&
      !winnerFound.current // Access the current value
    ) {
      let bot = player2;
      let human = player1;
      let time = botSpecialMove ? 2200 : 1500;

      setTimeout(() => {
        // Re-check `winnerFound` before proceeding
        if (winnerFound.current) {
          console.log("Bot move cancelled, winner found:", winnerFound.current);
          return;
        }

        // Special Move Handling
        if (botSpecialMove) {
          console.log("Bot is using its special move.");
          const move = gameBot4x4(grid, bot, human, botSpecialMove);

          if (move) {
            setGrid((prev) => {
              if (winnerFound.current) {
                console.log("Game ended during bot special move.");
                return prev; // Do not update grid if winner is found
              }
              let newGrid = prev.map((row) => [...row]);
              newGrid[move.row][move.col] = bot;

              setbotSpecialMove(false);
              setcurrPlayer(player1);
              console.log("Special move ends.");
              return newGrid;
            });
            return;
          }
        }

        // Normal Move Handling
        const move = gameBot4x4(grid, bot, human);

        if (move) {
          setGrid((prev) => {
            if (winnerFound.current) {
              console.log("Game ended during bot normal move.");
              return prev; // Do not update grid if winner is found
            }

            let newGrid = prev.map((row) => [...row]);
            newGrid[move.row][move.col] = bot;

            if (player2Points >= 2) {
              let newPoint = checkBoard(
                newGrid,
                scoredPositionsRow.current,
                scoredPositionsCol.current,
                scoredPointsLeftDiag.current,
                scoredPointsRightDiag.current
              );
              if (newPoint.verdict && newPoint.verdict[0] === player2) {
                console.log("Bot triggers a special move!");
                setbotSpecialMove(true);
                let won = true;
                applyHighlights(newPoint.highlight, won);
                setPlayer2Points(0);
                return newGrid; // Bot continues its turn
              }
            }

            setcurrPlayer(player1);
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
        botSpecialMove={botSpecialMove}
        draw={draw}
        illegalMove={illegalMove}
        HandleplayAgain={HandleplayAgain}
      />
    </div>
  );
};

export default Game4x4;
