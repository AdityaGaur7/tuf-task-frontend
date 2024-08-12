// src/components/FlashcardControls.js
import React from "react";

const FlashcardControls = ({ handleNext, handlePrevious }) => {
  return (
    <div className="flex justify-between w-full max-w-xs mt-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default FlashcardControls;
