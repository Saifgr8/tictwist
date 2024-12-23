"use client";
import React, { useRef } from "react";
import { useState } from "react";
import SpecialMoves from "../Game/SpecialMoves";

const Game4x4UI = ({
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
  draw,
  illegalMove,
  HandleplayAgain,
}) => {
  //console.log(typeof botSpecialMove);
  const [showModal, setshowModal] = useState(false);
  const ref = useRef();
  const [showRules, setshowRules] = useState(false);
  // console.log("bot special move in ui is", botSpecialMove);

  const handleModalOpen = () => {
    ref.current?.showModal();
    setshowModal(true);
  };
  const handleModalClose = () => {
    ref.current?.close();
    setshowModal(false);
  };
  const handleShowRules = () => {
    setshowRules((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-green-200">
      {/* Top Section */}
      <div
        className={`  ${
          winner ? "w-11/12 md:w-4/6 lg:w-3/6" : "w-4/5 md:w-3/6"
        } bg-gradient-to-b from-blue-300 to-red-400 mt-3 rounded-xl shadow-2xl`}
      >
        <div className="w-full flex flex-row justify-evenly items-center">
          <div className="m-2 p-2 flex flex-col justify-center items-center gap-3">
            {winner ? (
              <div className="text-center sm:text-xl">
                {winner === player1 ? (
                  <span className="font-bold w-full text-center">
                    You have won the game!, starting bigger board.
                  </span>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-bold">Ai Bot has won the game</span>
                    <span>Better luck next time..</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center w-full">
                <div className="flex flex-col items-center w-full gap-5 lg:text-2xl ">
                  <div className="flex justify-between items-center w-full gap-4">
                    <div className="text-center">You: {player1}</div>
                    <div className="text-center">AI Bot: {player2}</div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-4 lg:text-2xl w-full">
                  <div className="text-center">Current Player</div>
                  <div className="font-bold flex flex-col justify-center items-center mt-2">
                    {draw && (
                      <div className="animate-pulse w-full text-center">
                        Bot is starting bigger board
                      </div>
                    )}
                    {!specialMove &&
                      !botSpecialMove &&
                      !draw &&
                      (currPlayer === player1 ? "You" : "Bot")}

                    {specialMove && (
                      <span className="w-full text-center">
                        Your Special Move
                      </span>
                    )}
                    {botSpecialMove && (
                      <span className="w-full text-center">
                        Bot Special Move
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="m-2 p-2 flex flex-col justify-center items-center gap-1 w-1/2">
            <div className="font-bold text-xl lg:text-2xl lg:m-1 lg:p-1 md:m-2 md:p-2">
              Points
            </div>
            <div className="flex justify-around items-center lg:mt-4 gap-5">
              <div className="flex flex-col items-center">
                <div className="  md:text-xl lg:text-2xl">You</div>
                <div className="text-xl md:text-2xl lg:text-4xl lg:mt-3">
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
                <div className="  md:text-xl lg:text-2xl">AI Bot</div>
                <div className=" text-xl md:text-2xl lg:text-4xl lg:mt-3">
                  {player2Points}
                </div>
                {botSpecialMove && (
                  <div className="mt-2 p-2 bg-green-300 shadow rounded-xl text-sm sm:text-lg animate-pulse w-full text-center">
                    Bot is using special ability
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="italic text-xs md:text-sm lg:text-base items-center shadow-inner shadow-blue-400 px-2 rounded-xl text-center m-2 p-2">
        Beat the AI or hold it to a draw to unlock the latest 5x5 grid 😎!
      </span>
      {winner === player2 && (
        <div>
          <button
            onClick={HandleplayAgain}
            className="m-2 p-4 bg-blue-500 rounded-xl shadow-xl text-white transition-transform duration-200 ease-in-out hover:scale-110"
          >
            Try again?
          </button>
        </div>
      )}

      <div className="w-full flex items-center justify-center">
        {illegalMove && (
          <div className="text-red-500 mb-4 text-lg font-semibold animate-pulse ">
            {illegalMove}
          </div>
        )}
      </div>
      {/* Main Game Section */}
      <div className="flex flex-col md:flex-row justify-center sm:items-start items-center gap-2 pb-4 sm:h-[calc(100%/4-0.5rem)]">
        {/* Game Board */}
        <div
          className="w-11/12 max-w-[450px] sm:max-w-[400px] bg-red-400 p-4 flex flex-wrap justify-center items-center shadow-inner shadow-green-100 rounded-lg"
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
                    ? "shadow-inner shadow-white rounded-2xl animate-bounce bg-blue-400"
                    : "bg-white"
                } h-[calc(100%/4-0.5rem)] w-[calc(100%/4-0.5rem)] transform rounded-sm transition-transform duration-200 hover:scale-125 m-1 text-5xl ${
                  illegalMove ? "" : "hover:bg-green-100"
                }  text-black flex items-center justify-center hover:rounded-xl hover:shadow-xl`}
              >
                {cell}
              </div>
            ))
          )}
        </div>

        {/* Right Table: Rules */}
        <div
          className={`${
            showRules
              ? "w-11/12 sm:w-1/3 md:w-2/5 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 bg-gray-100 p-4 text-center text-lg sm:text-xl border-2 shadow-2xl rounded-lg transition-all duration-1000 ease-in-out"
              : "w-fit sm:fixed sm:right-0 sm:top-1/2 sm:transform sm:-translate-y-1/2 p-2 bg-gray-100 rounded-xl shadow-2xl transition-all duration-1000 ease-in-out"
          }`}
        >
          <div
            className=" cursor-pointer w-full flex flex-col justify-center items-center"
            onClick={handleShowRules}
          >
            <div className="flex flex-col justify-center items-center">
              <span className="font-bold">Game Rules</span>
              <span className="text-xs font-sans">
                hide for best experience
              </span>
            </div>

            {showRules ? (
              <div className="flex flex-col justify-center items-center gap-1">
                <span className="text-blue-600 ">
                  {"<"} Hide me {">"}
                </span>
                <div className="animate-bounce">⬆️ </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-1">
                <span className="text-blue-600">
                  {"<"} Show me {">"}
                </span>
                <div className="">⬇️ </div>
              </div>
            )}
          </div>
          {showRules && (
            <ul className="list-disc px-6 mt-4 text-left text-sm md:text-sm">
              <li>Take turns to leave your mark and outwit your opponent!</li>
              <li>Form a perfect line of 4 to claim victory!</li>
              <li>
                Craft combos of 3 in rows, columns, or diagonals to score
                points!
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
                Watch out! The bot gets fierce with its special moves—stay
                sharp!
              </li>
              <li>
                Most importantly, play smart, have fun, and enjoy the challenge!
              </li>
            </ul>
          )}
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
          {draw ? <span>Play Again</span> : <span>Reset</span>}
        </button>
      </div>
    </div>
  );
};

export default Game4x4UI;
