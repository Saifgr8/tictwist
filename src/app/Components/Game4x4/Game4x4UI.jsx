import React from "react";

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
  activeCell,
}) => {
  console.log("bot special move in ui is", botSpecialMove);
  return (
    <div className="min-h-screen flex flex-col justify-between bg-green-200">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 p-4">
        <div className="w-full sm:w-1/3 h-28 lg:h-32 bg-red-300 flex flex-col justify-center items-center text-lg sm:text-2xl p-4 shadow-xl rounded-lg">
          {winner ? (
            <div className="font-bold flex text-2xl items-center text-center ">
              {winner} has won the game!
            </div>
          ) : (
            <>
              <div className="flex justify-around items-center w-full">
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
      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 p-4">
        {/* Left Table: Points */}
        <div className="w-full sm:w-1/3 h-auto bg-blue-300 p-4 text-center text-lg sm:text-xl  shadow-xl rounded-lg">
          <div className="font-bold text-xl lg:text-3xl">Points</div>
          <div className="flex justify-around items-center lg:mt-4 lg:h-40">
            <div className="flex flex-col items-center">
              <div className=" text-3xl lg:text-5xl">You</div>
              <div className=" text-4xl lg:text-6xl lg:mt-3">
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
              <div className=" text-3xl lg:text-5xl">Bot</div>
              <div className=" text-4xl lg:text-6xl lg:mt-3">
                {player2Points}
              </div>
              {botSpecialMove && (
                <button className="mt-2 p-2 bg-green-300 shadow rounded-xl text-sm sm:text-lg">
                  Bot is using special ability
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="w-full sm:w-[450px] bg-red-400 p-4 flex flex-wrap justify-center items-center shadow-inner shadow-green-100 rounded-lg">
          {grid.map((rowArray, rowIndex) =>
            rowArray.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleMove(rowIndex * grid.length + colIndex)}
                className={`${
                  winner ? "cursor-not-allowed" : "cursor-pointer"
                } ${
                  highlightGrid[rowIndex][colIndex]
                    ? "shadow-inner shadow-green-400 rounded-2xl animate-bounce bg-blue-400"
                    : "bg-white"
                }  h-16 w-16 sm:h-20 transform rounded-sm transition-transform duration-200 hover:scale-125 sm:w-20 m-1 sm:m-2 text-4xl sm:text-6xl hover:bg-green-100 text-black flex items-center justify-center hover:rounded-xl hover:shadow-xl`}
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
            <li>Form a perfect line of 4 to claim victory!</li>
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

      {/* Bottom Section: Reset Button */}
      <div className="flex justify-center items-center p-4">
        <button
          onClick={handleReset}
          className="text-white p-3 bg-red-600 shadow-lg rounded-xl hover:scale-110 transition-transform duration-200 hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Game4x4UI;