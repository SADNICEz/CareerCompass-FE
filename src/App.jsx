import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Home from "./Home";
import FormMbti from "./Formmbti";
import Aptitude from "./Aptitude";
import BasicKnowledge from "./BasicKnowledge";
import CareerList from "./Careerlist";
import { ProgressProvider } from "./context/ProgressContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
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
            <Route path="/career-list" element={<CareerList />} />
          </Routes>
        </ProgressProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
