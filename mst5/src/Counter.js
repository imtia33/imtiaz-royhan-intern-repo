import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCounterValue } from './store/selectors';
import { increment, decrement } from './store/counterSlice';

function Counter() {
  const count = useSelector(selectCounterValue);
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-green-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-green-800 mb-4">Counter Component</h2>
      <p className="text-lg mb-4">Count: <span className="font-bold">{count}</span></p>
      <div className="space-x-2">
        <button 
          onClick={() => dispatch(increment())}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Increment
        </button>
        <button 
          onClick={() => dispatch(decrement())}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;