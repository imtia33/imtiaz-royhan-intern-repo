import React, { useState, useMemo } from 'react';

function UseMemoDemo() {
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const expensiveCalculation = (numArray) => {
    console.log('Expensive calculation running...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += numArray.reduce((sum, num) => sum + num, 0);
    }
    return result;
  };

  const memoizedValue = useMemo(() => {
    return expensiveCalculation(numbers);
  }, [numbers]);

  const nonMemoizedValue = expensiveCalculation(numbers);

  return (
    <div className="p-4 bg-red-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-red-800 mb-4">useMemo Demo</h2>
      <p className="mb-2">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Increment
      </button>
      <div className="mt-4 p-2 bg-white rounded">
        <p className="text-gray-700">Memoized Value: {memoizedValue}</p>
        <p className="text-gray-700">Non-Memoized Value: {nonMemoizedValue}</p>
      </div>
    </div>
  );
}

export default UseMemoDemo;