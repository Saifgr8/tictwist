import React from "react";
import { forwardRef } from "react";

const SpecialMoves = forwardRef(({ onClose }, ref) => {
  return (
    <dialog ref={ref}>
      <div className=" w-fit flex flex-col items-center px-6 py-2 shadow-xl bg-gradient-to-r from-blue-400 to-green-300 rounded-lg  text-white text-center">
        <h3 className="text-xl font-bold mb-2">Special Ability</h3>
        <p className="text-lg">
          <span className="font-semibold text-yellow-300">Power:</span> Override
          any cell on the board
          <br />
          <span className="font-semibold text-yellow-300">Bonus:</span> Get an
          extra move!
        </p>
        <button className="bg-red-400 my-2 py-2 px-4 rounded-xl shadow-2xl shadow-black transition-transform duration-200 hover:scale-110" onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
});

SpecialMoves.displayName = "SpecialMoves"

export default SpecialMoves;
