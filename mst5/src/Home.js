import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Home Page</h1>
      <p className="mb-4 text-gray-700">Welcome to the Home Page!</p>
      <Link 
        to="/profile" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
      >
        Go to Profile
      </Link>
    </div>
  );
}

export default Home;