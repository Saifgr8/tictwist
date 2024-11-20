"use client";
import React, { useRef } from "react";
import { useState } from "react";
import SpecialMoves from "../Game/SpecialMoves";

const Game5x5UI = ({
  handleMove,
  player1,
  player2,
  player1Points,
  player2Points,
  currPlayer,
  grid,
  handleReset,
  highlightGrid,
  specialMove,
  winner,
  botSpecialMove,
  draw
}) => {
  //console.log(typeof botSpecialMove);
  const [showModal, setshowModal] = useState(false);
  const ref = useRef();
  // console.log("bot special move in ui is", botSpecialMove);
  console.log(grid);
  const handleModalOpen = () => {
    ref.current?.showModal();
    setshowModal(true);
  };
  const handleModalClose = () => {
    ref.current?.close();
    setshowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-green-200">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 p-4 w-full">
        <div className="w-full sm:w-3/4 md:w-2/6 md:mr-6 lg:mr-1 h-28 lg:h-32 bg-red-300 flex flex-col justify-center items-center text-lg sm:text-2xl p-4 shadow-xl rounded-lg">
          {winner ? (
            <div className="text-center text-2xl">
              {winner === player1 ? (
                <span className="font-bold">You have won the game!</span>
              ) : (
                <div className="flex flex-col">
                  <span className="font-bold">Ai Bot has won the game</span>
                  <span>Better luck next time..</span>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex justify-around items-center w-full ">
                <div>You: {player1}</div>
                <div>AI Bot: {player2}</div>
              </div>
              <div className="flex flex-col items-center justify-center mt-2">
                Current Player:
                <span className="font-bold">
                  {!specialMove &&
                    !botSpecialMove &&
                    (currPlayer === player1 ? "You" : "Bot")}

                  {specialMove && <span>Your Special Move</span>}
                  {botSpecialMove && <span>Bot Special Move</span>}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Game Section */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-2 p-4 h-full w-full">
        {/* Left Table: Points */}
        <div className="w-full sm:w-1/3 h-auto bg-blue-300 px-4 py-2 text-center text-lg sm:text-xl  shadow-xl rounded-lg">
          <div className="font-bold text-xl lg:text-3xl lg:m-1 lg:p-1 md:m-2 md:p-2">
            Points
          </div>
          <div className="flex justify-around items-center lg:mt-4 lg:h-40">
            <div className="flex flex-col items-center">
              <div className=" text-xl lg:text-4xl">You</div>
              <div className="text-3xl md:text-2xl lg:text-4xl lg:mt-3">
                {player1Points}
              </div>
              {specialMove && (
                <button className="mt-2 p-2 bg-green-300 shadow rounded-xl text-sm sm:text-lg">
                  Use your{" "}
                  <span
                    title="You can rewrite any opponent cell"
                    className="underline italic"
                  >
                    Special Ability
                  </span>
                </button>
              )}
            </div>
            <div className="flex flex-col items-center">
              <div className=" text-xl lg:text-4xl">AI Bot</div>
              <div className=" text-3xl md:text-2xl lg:text-4xl lg:mt-3">
                {player2Points}
              </div>
              {botSpecialMove && (
                <div className="mt-2 p-2 bg-green-300 shadow rounded-xl text-sm sm:text-lg animate-pulse">
                  Bot is using special ability
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div
          className="w-full max-w-[450px] sm:max-w-[500px] bg-red-400 p-4 flex flex-wrap justify-center items-center shadow-inner shadow-green-100 rounded-lg"
          style={{ aspectRatio: "1" }} // Maintain square aspect ratio
        >
          {grid.map((rowArray, rowIndex) =>
            rowArray.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleMove(rowIndex * grid.length + colIndex)}
                className={`${
                  winner ? "cursor-not-allowed" : "cursor-pointer"
                } ${
                  highlightGrid[rowIndex][colIndex] && winner
                    ? "shadow-inner shadow-white rounded-2xl animate-bounce bg-yellow-400"
                    : highlightGrid[rowIndex][colIndex]
                    ? "shadow-inner shadow-green-400 rounded-2xl animate-bounce bg-blue-400"
                    : "bg-white"
                } h-[calc(100%/5-0.5rem)] w-[calc(100%/5-0.5rem)] transform rounded-sm transition-transform duration-200 hover:scale-125 m-1 text-5xl hover:bg-green-100 text-black flex items-center justify-center hover:rounded-xl hover:shadow-xl`}
              >
                {cell}
              </div>
            ))
          )}
        </div>

        {/* Right Table: Rules */}
        <div className="w-full sm:w-1/3 h-auto bg-gray-100 p-4 text-center text-lg sm:text-xl border-2  shadow-xl rounded-lg">
          <div className="font-bold text-xl">Game Rules</div>
          <ul className="list-disc px-6 mt-4 text-left text-sm sm:text-lg">
            <li>Take turns to leave your mark and outwit your opponent!</li>
            <li>Form a perfect line of 5 to claim victory!</li>
            <li>
              Craft combos of 3 in rows, columns, or diagonals to score points!
            </li>
            <li>
              Score 3 points to unleash your game-changing{" "}
              <span
                title="Ability to override opponent cell"
                className="underline italic"
              >
                special move
              </span>
            </li>
            <li>
              Watch out! The bot gets fierce with its special moves—stay sharp!
            </li>
            <li>
              Most importantly, play smart, have fun, and enjoy the challenge!
            </li>
          </ul>
        </div>
      </div>
      <button
        onClick={handleModalOpen}
        className="mx-2 px-4 my-2 py-2 bg-gradient-to-r from-blue-400 to-green-300 rounded-xl shadow-xl"
      >
        See Special Move
      </button>
      <SpecialMoves ref={ref} onClose={handleModalClose} />
      {/* Bottom Section: Reset Button */}
      <div className="flex justify-center items-center p-4">
        <button
          onClick={handleReset}
          className="text-white p-3 bg-red-600 shadow-lg rounded-xl hover:scale-110 transition-transform duration-200 hover:bg-red-700"
        >
          {draw ? <span>Play Again</span> : <span>Reset</span>}Reset
        </button>
      </div>
    </div>
  );
};

export default Game5x5UI;