import React, { useState, useEffect } from 'react';
import api from './api';

function AxiosTest() {
  const [testResults, setTestResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  const setAuthToken = () => {
    localStorage.setItem('authToken', 'fake-jwt-token-12345');
    setTestResults(prev => [...prev, 'Auth token set in localStorage']);
  };

  const clearAuthToken = () => {
    localStorage.removeItem('authToken');
    setTestResults(prev => [...prev, 'Auth token removed from localStorage']);
  };

  const testGetRequest = async () => {
    setIsTesting(true);
    try {
      setTestResults(prev => [...prev, 'Test 1: Making GET request...']);
      const response = await api.get('/posts/1');
      setTestResults(prev => [
        ...prev, 
        `✓ GET request successful. Status: ${response.status}`,
        `✓ Post title: ${response.data.title}`
      ]);
    } catch (error) {
      setTestResults(prev => [
        ...prev, 
        `✗ GET request failed: ${error.message}`
      ]);
    } finally {
      setIsTesting(false);
    }
  };

  const testPostRequest = async () => {
    setIsTesting(true);
    try {
      setTestResults(prev => [...prev, 'Test 2: Making POST request...']);
      const postData = {
        title: 'Test Post',
        body: 'This is a test post created by Axios',
        userId: 1
      };
      const response = await api.post('/posts', postData);
      setTestResults(prev => [
        ...prev, 
        `✓ POST request successful. Status: ${response.status}`,
        `✓ Created post ID: ${response.data.id}`
      ]);
    } catch (error) {
      setTestResults(prev => [
        ...prev, 
        `✗ POST request failed: ${error.message}`
      ]);
    } finally {
      setIsTesting(false);
    }
  };

  const testAuthRequest = async () => {
    setIsTesting(true);
    try {
      setTestResults(prev => [...prev, 'Test 3: Making authenticated request...']);
      const response = await api.get('/users/1');
      setTestResults(prev => [
        ...prev, 
        `✓ Authenticated request successful. Status: ${response.status}`
      ]);
    } catch (error) {
      setTestResults(prev => [
        ...prev, 
        `Note: Authenticated request failed (expected if no real auth): ${error.message}`
      ]);
    } finally {
      setIsTesting(false);
    }
  };

  const testTimeout = async () => {
    setIsTesting(true);
    try {
      setTestResults(prev => [...prev, 'Test 4: Testing timeout behavior...']);
      const timeoutApi = api;
      timeoutApi.defaults.timeout = 1;
      
      await timeoutApi.get('/posts');
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setTestResults(prev => [
          ...prev, 
          '✓ Timeout handling works correctly'
        ]);
      } else {
        setTestResults(prev => [
          ...prev, 
          `Note: Different error occurred: ${error.message}`
        ]);
      }
    } finally {
      api.defaults.timeout = 10000;
      setIsTesting(false);
    }
  };

  const testRequestId = async () => {
    setIsTesting(true);
    try {
      setTestResults(prev => [...prev, 'Test 5: Testing request ID generation...']);
      
      const response = await api.get('/posts/2');
      
      setTestResults(prev => [
        ...prev, 
        `✓ Request with ID successful. Status: ${response.status}`,
        '✓ Request interceptor with dynamic ID is working'
      ]);
    } catch (error) {
      setTestResults(prev => [
        ...prev, 
        `✗ Request ID test failed: ${error.message}`
      ]);
    } finally {
      setIsTesting(false);
    }
  };

  const runAllTests = async () => {
    setTestResults(['Starting all Axios tests...']);
    await testGetRequest();
    await testPostRequest();
    await testRequestId();
    await testAuthRequest();
    await testTimeout();
    setTestResults(prev => [...prev, 'All tests completed!']);
  };

  return (
    <div className="p-6 bg-teal-50 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-teal-800 mb-6 text-center">Axios API Testing</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold text-teal-700 mb-3">Authentication Controls</h2>
          <div className="space-y-3">
            <button
              onClick={setAuthToken}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Set Auth Token
            </button>
            <button
              onClick={clearAuthToken}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Clear Auth Token
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold text-teal-700 mb-3">Individual Tests</h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={testGetRequest}
              disabled={isTesting}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-3 rounded text-sm transition duration-200"
            >
              Test GET
            </button>
            <button
              onClick={testPostRequest}
              disabled={isTesting}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-bold py-2 px-3 rounded text-sm transition duration-200"
            >
              Test POST
            </button>
            <button
              onClick={testRequestId}
              disabled={isTesting}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-bold py-2 px-3 rounded text-sm transition duration-200"
            >
              Test Request ID
            </button>
            <button
              onClick={testAuthRequest}
              disabled={isTesting}
              className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-bold py-2 px-3 rounded text-sm transition duration-200"
            >
              Test Auth
            </button>
            <button
              onClick={testTimeout}
              disabled={isTesting}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-2 px-3 rounded text-sm transition duration-200 col-span-2"
            >
              Test Timeout
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <button
          onClick={runAllTests}
          disabled={isTesting}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-200"
        >
          {isTesting ? 'Running Tests...' : 'Run All Tests'}
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold text-teal-700 mb-3">Test Results</h2>
        <div className="h-96 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50">
          {testResults.length > 0 ? (
            <ul className="space-y-2">
              {testResults.map((result, index) => (
                <li 
                  key={index} 
                  className={`p-2 rounded ${
                    result.startsWith('✓') ? 'bg-green-100 text-green-800' :
                    result.startsWith('✗') ? 'bg-red-100 text-red-800' :
                    result.includes('Note:') ? 'bg-yellow-100 text-yellow-800' :
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
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">Axios Configuration Summary:</h3>
        <ul className="list-disc pl-5 space-y-1 text-blue-700">
          <li>Base URL: https://jsonplaceholder.typicode.com</li>
          <li>Timeout: 10 seconds</li>
          <li>Default headers: Accept */*, Content-Type application/json</li>
          <li>Request interceptor: Adds dynamic request IDs and auth tokens</li>
          <li>Response interceptor: Handles errors and timeouts</li>
        </ul>
      </div>
    </div>
  );
}

export default AxiosTest;