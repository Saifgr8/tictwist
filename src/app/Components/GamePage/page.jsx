import React from "react";

const LandingPage = ({ onStartGame }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white font-mono">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="lg:text-6xl text-4xl font-extrabold animate-bounce  lg:pt-1 pt-12">
          🎉 Tic Tac Twist 🎉
        </h1>
        <p className="mt-4 text-2xl">
          The classic game you love, now with a funky twist! 🌀
        </p>
      </div>

      {/* Twisted Features */}
      <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-4">What&apos;s the Twist? 🤔</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>🔥 Special moves to outsmart your opponent.</li>
          <li>⚡ Earn points by forming tricky patterns.</li>
          <li>🤖 Beware of the Bot's ruthless strategies!</li>
          <li>🎯 A brand-new way to enjoy Tic Tac Toe!</li>
        </ul>
      </div>

      {/* Start Button */}
      <div className="mt-8">
        <button
          onClick={onStartGame}
          className="bg-green-500 px-6 py-3 text-2xl rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transform transition-all duration-300 ease-in-out"
        >
          Let&apos;s Twist! 🚀
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm opacity-70 pb-2 flex flex-col items-center justify-center text-center">
        <p>Created with ❤️ by Saif.</p>
        <p>Player vs Player, 6x6 board and new ability wll be released soon.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
