import React, { useState } from 'react';
import api, { cancelRequest, cancelAllRequests } from './api';

function AxiosAbortTest() {
  const [testResults, setTestResults] = useState([]);
  const [activeRequests, setActiveRequests] = useState([]);

  const testCancelSingleRequest = async () => {
    setTestResults(prev => [...prev, 'Test: Cancel single request...']);
    
    try {
      const request = api.get('/posts?delay=5000');
      
      const requestId = request.config?.headers['X-Request-ID'] || 'unknown';
      setActiveRequests(prev => [...prev, requestId]);
      
      setTestResults(prev => [...prev, `Request started with ID: ${requestId}`]);
      
      setTimeout(() => {
        cancelRequest(requestId);
        setTestResults(prev => [...prev, `Request ${requestId} cancelled`]);
        setActiveRequests(prev => prev.filter(id => id !== requestId));
      }, 1000);
      
      const response = await request;
      setTestResults(prev => [...prev, `Request completed unexpectedly: ${response.status}`]);
    } catch (error) {
      if (error.code === 'ERR_CANCELED' || error.name === 'AbortError') {
        setTestResults(prev => [...prev, '✓ Request cancellation works correctly']);
      } else {
        setTestResults(prev => [...prev, `✗ Unexpected error: ${error.message}`]);
      }
    }
  };

  const testCancelAllRequests = async () => {
    setTestResults(prev => [...prev, 'Test: Cancel all requests...']);
    
    try {
      const request1 = api.get('/posts/1');
      const request2 = api.get('/posts/2');
      const request3 = api.get('/posts/3');
      
      const id1 = request1.config?.headers['X-Request-ID'] || 'unknown1';
      const id2 = request2.config?.headers['X-Request-ID'] || 'unknown2';
      const id3 = request3.config?.headers['X-Request-ID'] || 'unknown3';
      
      setActiveRequests(prev => [...prev, id1, id2, id3]);
      
      setTestResults(prev => [...prev, `Started requests: ${id1}, ${id2}, ${id3}`]);
      
      setTimeout(() => {
        cancelAllRequests();
        setTestResults(prev => [...prev, 'All requests cancelled']);
        setActiveRequests([]);
      }, 500);
      
      const [res1, res2, res3] = await Promise.all([request1, request2, request3]);
      setTestResults(prev => [...prev, 'Requests completed unexpectedly']);
    } catch (error) {
      if (error.code === 'ERR_CANCELED' || error.name === 'AbortError') {
        setTestResults(prev => [...prev, '✓ All requests cancellation works correctly']);
      } else {
        setTestResults(prev => [...prev, `✗ Unexpected error: ${error.message}`]);
      }
    }
  };

  const testNormalRequest = async () => {
    setTestResults(prev => [...prev, 'Test: Normal request...']);
    
    try {
      const response = await api.get('/posts/1');
      setTestResults(prev => [
        ...prev, 
        `✓ Normal request successful. Status: ${response.status}`,
        `✓ Post title: ${response.data.title}`
      ]);
    } catch (error) {
      setTestResults(prev => [...prev, `✗ Normal request failed: ${error.message}`]);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 bg-amber-50 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-6 text-center">Axios AbortController Testing</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={testNormalRequest}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          Test Normal Request
        </button>
        
        <button
          onClick={testCancelSingleRequest}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          Test Cancel Single
        </button>
        
        <button
          onClick={testCancelAllRequests}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          Test Cancel All
        </button>
      </div>
      
      <div className="mb-6">
        <button
          onClick={clearResults}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Clear Results
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-bold text-amber-700 mb-3">Active Requests</h2>
        {activeRequests.length > 0 ? (
          <ul className="space-y-1">
            {activeRequests.map((id, index) => (
              <li key={index} className="p-2 bg-amber-100 rounded">
                Request ID: {id}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No active requests</p>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold text-amber-700 mb-3">Test Results</h2>
        <div className="h-96 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50">
          {testResults.length > 0 ? (
            <ul className="space-y-2">
              {testResults.map((result, index) => (
                <li 
                  key={index} 
                  className={`p-2 rounded ${
                    result.startsWith('✓') ? 'bg-green-100 text-green-800' :
                    result.startsWith('✗') ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}
                >
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No tests run yet. Click a test button above to begin.</p>
          )}
        </div>
      </div>
      
      <div className="mt-6 bg-amber-100 p-4 rounded-lg border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">AbortController Implementation:</h3>
        <ul className="list-disc pl-5 space-y-1 text-amber-700">
          <li>Each request is assigned an AbortController in the request interceptor</li>
          <li>Request IDs are generated dynamically and attached to headers</li>
          <li>cancelRequest() function can cancel a specific request by ID</li>
          <li>cancelAllRequests() function can cancel all active requests</li>
          <li>Controllers are cleaned up after requests complete or fail</li>
        </ul>
      </div>
    </div>
  );
}

export default AxiosAbortTest;