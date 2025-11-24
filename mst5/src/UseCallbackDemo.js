import React, { useState, useCallback } from 'react';

function ChildComponent({ onButtonClick }) {
  console.log('Child component rendered');
  return (
    <button 
      onClick={onButtonClick}
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
    >
      Click me (Child Component)
    </button>
  );
}

function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  const handleClickWithoutUseCallback = () => {
    setCount(count + 1);
  };

  const handleClickWithUseCallback = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div className="p-4 bg-indigo-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-indigo-800 mb-4">useCallback Demo</h2>
      <p className="mb-2">Count: {count}</p>
      <p className="mb-2">Other State: {otherState}</p>
      <button 
        onClick={() => setOtherState(otherState + 1)}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
      >
        Update Other State
      </button>
      
      <div className="mt-4 p-2 bg-white rounded">
        <h3 className="font-bold text-gray-700 mb-2">Without useCallback:</h3>
        <ChildComponent onButtonClick={handleClickWithoutUseCallback} />
      </div>
      
      <div className="mt-4 p-2 bg-white rounded">
        <h3 className="font-bold text-gray-700 mb-2">With useCallback:</h3>
        <ChildComponent onButtonClick={handleClickWithUseCallback} />
      </div>
    </div>
  );
}

export default UseCallbackDemo;