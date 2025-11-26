import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import HelloWorld from './HelloWorld';
import Counter from './Counter';
import CounterDisplay from './CounterDisplay';
import CounterStats from './CounterStats';
import ItemList from './ItemList';
import AppRouter from './AppRouter';
import UseEffectDemo from './UseEffectDemo';
import UseMemoDemo from './UseMemoDemo';
import UseCallbackDemo from './UseCallbackDemo';
import AxiosDemo from './AxiosDemo';
import AxiosTest from './AxiosTest';
import AxiosAbortTest from './AxiosAbortTest';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1 className="text-3xl font-bold mb-8">React Fundamentals Demo</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Hello World Component</h2>
              <HelloWorld name="Focus Bear" />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Counter Component</h2>
              <Counter />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Counter Display Component</h2>
              <CounterDisplay />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Counter Statistics</h2>
              <CounterStats />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Item List Component</h2>
              <ItemList />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">useEffect Demo</h2>
              <UseEffectDemo />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">useMemo Demo</h2>
              <UseMemoDemo />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">useCallback Demo</h2>
              <UseCallbackDemo />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Axios Demo</h2>
              <AxiosDemo />
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Axios API Testing</h2>
            <AxiosTest />
          </div>
          
          <div className="mt-12 p-8 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Axios AbortController Testing</h2>
            <AxiosAbortTest />
          </div>
          
          <div className="mt-12 p-8 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Routing Demo</h2>
            <AppRouter />
          </div>
        </header>
      </div>
    </Provider>
  );
}

export default App;