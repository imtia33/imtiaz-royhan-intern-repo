import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';

function AppRouter() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">React Router Demo</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;