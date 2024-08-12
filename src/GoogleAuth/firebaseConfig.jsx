// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2BzM4t8TBCGLFgMEiu4Cdmm-KYHmHbqI",
  authDomain: "edtech-2c330.firebaseapp.com",
  projectId: "edtech-2c330",
  storageBucket: "edtech-2c330.appspot.com",
  messagingSenderId: "40052846010",
  appId: "1:40052846010:web:3ce0663b49aea1af9fc183",
  measurementId: "G-S0GLJ4N9GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider =  new GoogleAuthProvider();

export { auth ,provider};  
