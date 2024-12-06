// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD63qnPwJpMGHrNoZpcl1J3l4lI6r2s_lk",
  authDomain: "budget-app-5ebeb.firebaseapp.com",
  projectId: "budget-app-5ebeb",
  storageBucket: "budget-app-5ebeb.firebasestorage.app",
  messagingSenderId: "313837253181",
  appId: "1:313837253181:web:64d58da3085443c4593054"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);