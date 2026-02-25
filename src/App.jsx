import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Home from "./Home";
import FormMbti from "./Formmbti";
import Aptitude from "./Aptitude";
import BasicKnowledge from "./BasicKnowledge";
import { ProgressProvider } from "./context/ProgressContext";
import MBTIResult from "./MBTIResult";

function App() {
  return (
    <Router>
      <ProgressProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/formmbti" element={<FormMbti />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/basicknowledge" element={<BasicKnowledge />} />
          <Route path="/mbti/:type" element={<MBTIResult />} />
        </Routes>
      </ProgressProvider>
    </Router>
  );
}

export default App;
