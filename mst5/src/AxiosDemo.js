import React, { useState } from 'react';
import api from './api';

function AxiosDemo() {
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    userId: 1
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    });
  };

  const handlePostRequest = async () => {
    setLoading(true);
    try {
      const result = await api.post('/posts', postData);
      setResponse(result.data);
    } catch (error) {
      console.error('API request failed:', error);
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleTestRequest = async () => {
    setLoading(true);
    try {
      const result = await api.get('/posts/1');
      setResponse(result.data);
    } catch (error) {
      console.error('API request failed:', error);
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-teal-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-teal-800 mb-4">Axios Demo</h2>
      
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
          placeholder="Post Title"
          className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
        />
        <textarea
          name="body"
          value={postData.body}
          onChange={handleInputChange}
          placeholder="Post Body"
          className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
          rows="3"
        />
      </div>
      
      <button 
        onClick={handlePostRequest}
        disabled={loading}
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        {loading ? 'Posting...' : 'Post Data'}
      </button>
      
      <button 
        onClick={handleTestRequest}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Loading...' : 'Test GET Request'}
      </button>
      
      {response && (
        <div className="mt-4 p-2 bg-white rounded">
          <h3 className="font-bold text-gray-700 mb-2">Response:</h3>
          <pre className="text-xs overflow-x-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AxiosDemo;