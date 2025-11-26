import React from 'react';
import { useSelector } from 'react-redux';
import { selectCounterValue, selectIsCounterPositive, selectIsCounterNegative } from './store/selectors';

function CounterStats() {
  const count = useSelector(selectCounterValue);
  const isPositive = useSelector(selectIsCounterPositive);
  const isNegative = useSelector(selectIsCounterNegative);

  return (
    <div className="p-4 bg-purple-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-purple-800 mb-4">Counter Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded shadow">
          <p className="text-sm text-gray-600">Current Value</p>
          <p className="text-xl font-bold">{count}</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <p className="text-sm text-gray-600">Status</p>
          <p className={`text-xl font-bold ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'}`}>
            {isPositive ? 'Positive' : isNegative ? 'Negative' : 'Zero'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CounterStats;