import React, { useState, useEffect } from 'react';

function UseEffectDemo() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('Component mounted');
    
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);

  const fetchData = async () => {
    setTimeout(() => {
      setData(`Data fetched at count: ${count}`);
    }, 1000);
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-yellow-800 mb-4">useEffect Demo</h2>
      <p className="mb-2">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Increment
      </button>
      <button 
        onClick={fetchData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Fetch Data
      </button>
      {data && (
        <div className="mt-4 p-2 bg-white rounded">
          <p className="text-gray-700">{data}</p>
        </div>
      )}
    </div>
  );
}

export default UseEffectDemo;