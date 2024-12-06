import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";


const FirebaseAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: email.split('@')[0],
      });
      const userName = auth.currentUser.displayName;
      alert(`User ${userName} signed up!`);
      setEmail('');
      setPassword('');
      navigate('/'); // Redirect to the home page or dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userName = auth.currentUser.displayName;
      alert(`User ${userName} signed in!`);
      setEmail('');
      setPassword('');
      navigate('/'); 
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      if (auth.currentUser) {
        const userName = auth.currentUser.displayName;
        await signOut(auth);
        alert(`User ${userName} signed out!`);
      } else {
        alert('No user logged in');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Firebase Auth</h2>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleSignin}
        >
          Sign In
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default FirebaseAuth;
