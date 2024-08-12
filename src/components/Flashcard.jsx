// src/components/Flashcard.js
import React from "react";
import Tilt from "react-tilt";

const Flashcard = ( flashcard, flipped, handleFlip ) => {
  return (
    <Tilt
      className="Tilt"
      options={{ max: 25, scale: 1.05, speed: 400 }}
      style={{ height: 200, width: 300 }}
    >
      <div
        className="w-full max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105"
        onClick={handleFlip}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-center">
            {flipped ? flashcard.answer : flashcard.question}
          </h2>
        </div>
      </div>
    </Tilt>
  );
};

export default Flashcard;
