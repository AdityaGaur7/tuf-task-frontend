import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleSignInButton from "./GoogleAuth/GoogleSignInButton";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleSignInButton />} />
      </Routes>
    </Router>
  );
}

export default App;
