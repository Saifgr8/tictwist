import React from "react";

const GameStandardUI = ({
  winner,
  player1,
  player2,
  currPlayer,
  handleReset,
  assignPlayer,
  grid,
  highlightGrid,
  playAgain,
  handleMove,
}) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-200">
      {/* Player Information and Current Turn */}
      <div className="w-full flex flex-col justify-center items-center py-6">
        {/* Player Information */}
        <div className="w-full flex gap-2 justify-evenly items-center mb-4">
          <div className="h-40 w-80 bg-red-300 rounded-lg shadow-xl p-4 flex flex-col justify-evenly items-center">
            <div className="text-2xl">
              You: <span className=" text-3xl">{player1}</span>
            </div>
            <div className="text-2xl">
              AI Bot: <span className="text-3xl">{player2}</span>
            </div>
          </div>
          {/* Current Turn */}
          <div className="h-40 w-80 bg-blue-300 rounded-lg shadow-xl p-4 flex justify-center text-center items-center text-2xl lg:text-4xl">
            {!winner ? (
              <span>
                {currPlayer === player1 ? (
                  <span className="italic">You are playing</span>
                ) : (
                  <span className="italic">Bot is playing</span>
                )}
              </span>
            ) : (
              <span>
                {winner} <span className="italic">has won!</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex justify-center items-center">
        <div className="w-80 h-80 bg-red-400 p-4 rounded-lg shadow-lg flex flex-wrap justify-center items-center">
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
                } h-20 w-20 m-2 text-6xl transform transition-transform duration-200 hover:scale-125 hover:bg-green-100 text-black flex items-center justify-center hover:rounded-xl hover:shadow-xl`}
              >
                {cell}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reset Button */}
      <div className="w-full flex justify-center items-center py-6">
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-700 text-2xl"
        >
          Reset
        </button>
      </div>

      {/* Player Selection Screen */}
      {!player1 && (
        <div className="absolute lg:top-0 lg:left-0 lg:right-0 h-screen w-screen bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <div className="bg-red-300 h-64 w-96 rounded-lg shadow-lg flex flex-col justify-evenly items-center p-6">
            <div className="text-2xl font-bold mb-4">
              Select Player 1 Letter
            </div>
            <div className="flex flex-row justify-center items-center gap-6">
              <div
                onClick={() => assignPlayer("X")}
                className="h-20 w-20 bg-green-400 text-white text-6xl flex justify-center items-center hover:shadow-xl hover:rounded-xl cursor-pointer"
              >
                X
              </div>
              <div
                onClick={() => assignPlayer("O")}
                className="h-20 w-20 cursor-pointer bg-green-400 text-white text-6xl flex justify-center items-center hover:shadow-xl hover:rounded-xl"
              >
                O
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStandardUI;
