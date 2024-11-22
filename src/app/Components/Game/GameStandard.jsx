/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { gameLogicBotMove } from "../GameBot/page";
import GameStandardUI from "./GameStandardUI";
import { checkBoard } from "./GameStandardRules";

const GameLogic = () => {
  const router = useRouter();
  const [grid, setGrid] = useState([
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ]);
  const [player1, setPlayer1] = useState("");
  const [player2, setplayer2] = useState("");
  const [currPlayer, setcurrPlayer] = useState("");
  const [winner, setWinner] = useState(null);
  const playerWin = useRef("");
  const [illegalMove, setillegalMove] = useState("");
  const [draw, setDraw] = useState(false);
  const [highlightGrid, setHighlightGrid] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(false))
  );

  useEffect(() => {
    let winnerTimeOut;
    // Check for a winner or draw
    const { verdict, highlight } = checkBoard(grid);

    console.log(verdict, highlight);
    if (verdict[1]) {
      setWinner(verdict[1]); // Update the winner
      playerWin.current = verdict[1];
      console.log("Winner:", verdict[1]);
      console.log("Winning Highlights:", highlight);

      // Apply highlights for the winning cells
      if (highlight.length > 0) {
        applyHighlights(highlight);
      }
      console.log(playerWin);
      if (playerWin.current === player1) {
        console.log("i am in");
        winnerTimeOut = setTimeout(() => {
          window.alert("Starting 4x4 board!");
          router.push("/Components/Game4x4");
        }, 1500);
      }
    } else if (!grid.flat().includes(".")) {
      checkDraw(); // Check if it's a draw
    } else if (
      !winner &&
      player1 &&
      player2 &&
      currPlayer === player2 &&
      grid.flat().includes(".")
    ) {
      console.log("Bot's turn...");
      handleBotTurn(); // Trigger the bot's move
    }
    return () => {
      if (winnerTimeOut) {
        clearTimeout(winnerTimeOut);
      }
    };
  }, [grid]);

  const handleReset = () => {
    setPlayer1("");
    setplayer2("");
    setGrid([
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ]);
    setcurrPlayer("");
    setWinner("");
  };

  const assignPlayer = (letter) => {
    let updatedPlayer1 = letter;
    let updatedPlayer2 = letter === "X" ? "O" : "X";
    setPlayer1(updatedPlayer1);
    setplayer2(updatedPlayer2);
    setcurrPlayer(updatedPlayer1);
  };
  const checkDraw = () => {
    let open = grid.flat().filter((cell) => cell === ".");
    console.log(open, open.length);
    if (open.length === 0 && !winner) {
      setDraw(true);
      setTimeout(() => {
        window.alert("Starting a 4x4 grid");
        window.localStorage.setItem("Player1", player1);
        window.localStorage.setItem("Player2", player2);
        window.localStorage.setItem("CurrPlayer", currPlayer);
        router.push("/Components/Game4x4");
      }, 1500);
    }
  };
  const playAgain = () => {
    handleReset();
    setWinner(null);
  };

  const applyHighlights = (highlights) => {
    setHighlightGrid((prev) => {
      const newHighlightGrid = Array(3)
        .fill(null)
        .map(() => Array(3).fill(false)); // Initialize a 3x3 grid with `false`

      highlights.forEach(([row, col]) => {
        newHighlightGrid[row][col] = true; // Set `true` for highlighted cells
      });

      return newHighlightGrid;
    });

    // Clear highlights after 1 second
    setTimeout(() => {
      setHighlightGrid(
        (prev) => prev.map((row) => row.map(() => false)) // Reset highlights to `false`
      );
    }, 1000);
  };

  const handleMove = (index) => {
    if (currPlayer !== player1) {
      setillegalMove("Not your turn");
      setTimeout(() => {
        setillegalMove("");
      }, 1000);
      return;
    }

    let row = Math.floor(index / grid.length);
    let col = index % grid.length;

    if (grid[row][col] === ".") {
      setGrid((prevGrid) => {
        let newGrid = prevGrid.map((row) => [...row]);

        newGrid[row][col] = currPlayer;

        let nextPlayer = currPlayer === player1 ? player2 : player1;

        setcurrPlayer(nextPlayer);
        return newGrid;
      });
    } else {
      return grid;
    }
  };
  const handleBotTurn = () => {
    if (currPlayer === player2 && grid.flat().includes(".")) {
      setTimeout(() => {
        let bot = player2;
        let human = player1;
        const move = gameLogicBotMove(grid, bot, human);

        if (move) {
          setGrid((prev) => {
            let newGrid = prev.map((item) => [...item]);
            newGrid[move.row][move.col] = bot;

            setcurrPlayer(player1);
            return newGrid;
          });
        }
      }, 500);
    }
  };

  return (
    <div>
      <GameStandardUI
        winner={winner}
        player1={player1}
        player2={player2}
        currPlayer={currPlayer}
        grid={grid}
        handleReset={handleReset}
        assignPlayer={assignPlayer}
        highlightGrid={highlightGrid}
        playAgain={playAgain}
        handleMove={handleMove}
        draw={draw}
        illegalMove={illegalMove}
      />
    </div>
  );
};

export default GameLogic;
