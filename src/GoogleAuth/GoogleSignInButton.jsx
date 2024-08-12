import React, { useEffect, useState } from "react";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";
import "./style.css"
const GoogleSignInButton = () => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);

        const user = data.user;
        console.log("User signed in: ", user);
    
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
      });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      {value ? (
        <Home />
      ) : (
    
        <button type="button" className="login-with-google-btn" onClick={handleClick} >
        Sign in with Google
      </button>
      )}
    </div>
  );
};

export default GoogleSignInButton;
