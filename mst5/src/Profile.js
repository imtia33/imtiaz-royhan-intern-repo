import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="p-4 bg-green-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Profile Page</h1>
      <p className="mb-4 text-gray-700">This is the Profile Page!</p>
      <Link 
        to="/" 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default Profile;