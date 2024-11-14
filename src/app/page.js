"use client";
import { useState } from "react";
import GameLogic from "./Components/Game/GameStandard";
import LandingPage from "./Components/GamePage/page";

export default function Home() {
  const [startGame, setStartGame] = useState(false);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100">
      <main className="flex flex-col w-full max-w-screen-lg gap-8 items-center px-4 sm:px-8 bg-green-200">
        {/* Game Logic Component */}
        <div className="w-full ">
          {!startGame ? (
            <LandingPage onStartGame={() => setStartGame(true)} />
          ) : (
            <GameLogic />
          )}
        </div>
      </main>
    </div>
  );
}
