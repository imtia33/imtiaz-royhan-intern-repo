import React from 'react';

function HelloWorld({ name }) {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-800">Hello, {name}!</h1>
      <p className="mt-2 text-gray-600">Welcome to our React application with Tailwind CSS</p>
    </div>
  );
}

export default HelloWorld;