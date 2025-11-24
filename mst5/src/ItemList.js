import React, { useState } from 'react';

function ItemList() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="p-4 bg-purple-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-purple-800 mb-4">Item List</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter an item"
          className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
        />
        <button 
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Item
        </button>
      </form>
      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index} className="mb-1 text-purple-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;