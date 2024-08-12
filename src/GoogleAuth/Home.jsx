import React, { useEffect, useState } from 'react';

import FlashcardList from ".././components/FlashcardList";
import Dashboard from ".././components/AdminDashboard";
import Ai from ".././Extra/Ai"

const Home = () => {
    const [showDashboard, setShowDashboard] = useState(false);
    const [email,setemail]=useState("");

    const toggleDashboard = () => {
        setShowDashboard(!showDashboard);
    };
    useEffect(()=>{
       let user = localStorage.getItem("email");
        
       setemail(user.split('@')[0]);
    },[])

    const logout = () => {
        localStorage.removeItem("email");
        window.location.reload();
    };

    return (
        <div className="min-h-screen mt-8 flex flex-col items-center justify-center bg-blue-50">
            <div className="mb-6">
                <div className="relative App">
                    <h1 className="text-3xl font-bold text-center my-4">FLASHCARD LEARNING TOOLS</h1>
                    <FlashcardList />

                    {/* Toggle Dashboard Button */}
                    <button
                        className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600"
                        onClick={toggleDashboard}
                    >
                        {showDashboard ? "Close Dashboard" : "Open Dashboard"}
                    </button>

                    {/* Conditional Rendering of Dashboard */}
                    {showDashboard && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-120 max-w-3xl">
                                <Dashboard />
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    onClick={toggleDashboard}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    )}
                    <Ai />
                </div>
            </div>

            {/* Logout Button positioned in the top left corner */}
            <div className="fixed top-4 left-4 flex flex-col">
            <button
                onClick={logout}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Logout
            </button>
           <div>User: <p className='text-pink-700'>{email}</p></div> 
            </div >
           
        </div>
    );
};

export default Home;
