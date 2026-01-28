import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Auth from './Auth';
import Navbar from './Navbar';
import Home from './Home';
import FormMbti from './Formmbti';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/formmbti" element={<FormMbti />} />
        
      </Routes>
    </Router>
  );
}

export default App;