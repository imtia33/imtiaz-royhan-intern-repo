import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-green-800 mb-4">Counter Component</h2>
      <p className="text-lg mb-4">Count: <span className="font-bold">{count}</span></p>
      <button 
        onClick={increment}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Increment
      </button>
    </div>
  );
}

export default Counter;