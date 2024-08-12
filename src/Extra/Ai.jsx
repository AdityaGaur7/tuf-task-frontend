import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function GeminiInReact({ prompt }) {
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const genAI = useMemo(() => new GoogleGenerativeAI("AIzaSyB7V2s1arfoGPGwOAbgP9zEwTes-KHI3iY"), []);

  useEffect(() => {
    const fetchResponse = async () => {
      if (prompt) {
        prompt = prompt + " explain like explaining to a child";
        setLoading(true);
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const result = await model.generateContent(prompt);
          const response = await result.response.text();
          setPromptResponses([response]);
        } catch (error) {
          console.error(error);
          setPromptResponses(["Something went wrong"]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResponse();
  }, [prompt, genAI]);

  const handleSpeech = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.5;  // Speed of the speech
    utterance.pitch = 1;   // Pitch of the speech
    synth.speak(utterance);
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {promptResponses.map((response, index) => (
            <div key={index} className="mt-2 flex items-center">
              <div className={`response-text border-slate-800 border px-6 py-10 ${index === promptResponses.length - 1 ? 'fw-bold' : ''}`}>
                {response}
              </div>
              <button
                className="ml-2 text-blue-500 hover:text-blue-700 border border-black p-4"
                onClick={() => handleSpeech(response)}
                aria-label="Speak response"
              >
             listen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GeminiInReact;
