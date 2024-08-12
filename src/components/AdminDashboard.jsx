import React, { useState, useEffect } from "react";
import { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } from "../services/flashcardService";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const data = await getFlashcards();
      setFlashcards(data);
    };

    fetchFlashcards();
  }, []);

  const Toast = (operation) => {
    toast.success(`${operation} successfully`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => window.location.reload(), 4000);
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editingIndex !== null) {
        const updatedFlashcard = { question, answer };
        await updateFlashcard(editingIndex, updatedFlashcard);
        Toast("Updated")
      } else {
        const newFlashcard = { question, answer };
        await addFlashcard(newFlashcard);
        Toast("Added")
      }
    } catch (error) {
      alert('An error occurred. Please try again.' + error);
    } finally {
      setQuestion("");
      setAnswer("");
      setEditingIndex(null);
    }
  };

  const handleEdit = (id) => {
    const index = flashcards.findIndex(flashcard => flashcard.id === id);
    setQuestion(flashcards[index].question);
    setAnswer(flashcards[index].answer);
    setEditingIndex(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFlashcard(id);
      Toast("Deleted");
    } catch (error) {
      alert('An error occurred. Please try again.' + error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          className="border rounded p-2 mr-2"
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          className="border rounded p-2 mr-2"
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={handleAddOrUpdate}
        >
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <div className="overflow-y-auto h-80">
        {flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className="flex justify-between items-center mb-2 p-2 border-b"
          >
            <div className="w-80 text-left">
              <strong>Q:</strong> {flashcard.question} <br />
              <strong>A:</strong> {flashcard.answer} <br />
              <strong>ID:</strong> {flashcard.id}
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600"
                onClick={() => handleEdit(flashcard.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(flashcard.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
