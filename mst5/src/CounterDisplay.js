import React from 'react';
import { useSelector } from 'react-redux';
import { selectCounterValue, selectCounterMessage } from './store/selectors';

function CounterDisplay() {
  const count = useSelector(selectCounterValue);
  const message = useSelector(selectCounterMessage);

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Counter Display</h2>
      <p className="text-lg mb-2">Current Count: <span className="font-bold">{count}</span></p>
      <p className="text-md italic">{message}</p>
    </div>
  );
}

export default CounterDisplay;