import React, { useState, useEffect, useRef } from "react";
import { getFlashcards } from "../services/flashcardService";
import FlashcardControls from "./FlashcardControls";
import { Tilt } from "react-tilt";
import GeminiInReact from "../Extra/Ai"; // Import the AI component

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState({});
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showAIResponse, setShowAIResponse] = useState(false);

  const flashcardContainerRef = useRef(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const data = await getFlashcards();
      setFlashcards(data);
    };

    fetchFlashcards();
  }, []);

  const handleFlip = (index) => {
    setFlippedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNext = () => {
    if (flashcardContainerRef.current) {
      const container = flashcardContainerRef.current;
      const cardWidth = container.children[0].offsetWidth;
      const newScrollLeft = Math.min(
        container.scrollLeft + cardWidth,
        container.scrollWidth - container.clientWidth
      );
      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (flashcardContainerRef.current) {
      const container = flashcardContainerRef.current;
      const cardWidth = container.children[0].offsetWidth;
      const newScrollLeft = Math.max(container.scrollLeft - cardWidth, 0);
      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleShowExplanation = (index) => {
    setSelectedCardIndex(index);
    setShowAIResponse(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {flashcards.length > 0 && (
        <>
          <div
            className="relative flex mt-8 justify-start items-center overflow-x-auto hide-scrollbar border border-stone-950 p-4"
            ref={flashcardContainerRef}
            style={{ width: '90vw', maxWidth: '1200px',height:'50vh' }}
          >
            {flashcards.map((flashcard, index) => (
              <div
                className="flex-shrink-0 w-full max-w-xs transition-transform duration-500 ease-in-out"
                key={index}
              >
                <Tilt
                  className="Tilt"
                  options={{ max: -25, scale: 1.05, speed: 400 }}
                  style={{ height: 200, width: 300 }}
                >
                  <div
                    className="w-full bg-white border border-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-[0.95]"
                    onClick={() => handleFlip(index)}
                  >
                    <div className="p-6 bg-gray-100">
                      <h2 className="text-xl font-bold text-center text-gray-800">
                        {flippedIndexes[index] ? flashcard.answer : flashcard.question}
                      </h2>
                      {flippedIndexes[index] && (
                        <button
                          className="text-black hover:underline mt-2"
                          onClick={() => handleShowExplanation(index)}
                        >
                          ? Explain
                        </button>
                      )}
                    </div>
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
          <FlashcardControls
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </>
      )}
      {showAIResponse && selectedCardIndex !== null && (
        <div className="mt-4 p-4 border border-gray-800 rounded-lg bg-gray-100">
          <h3 className="text-lg font-bold mb-2">AI Explanation:</h3>
          <GeminiInReact prompt={flashcards[selectedCardIndex].question + "answer is " + flashcards[selectedCardIndex].answer + "why?"} />
        </div>
      )}
    </div>
  );
};

export default FlashcardList;
