import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import FormMbti from "./Formmbti";
import Aptitude from "./Aptitude";
import BasicKnowledge from "./BasicKnowledge";
import Quiz from "./Quiz";
import QuizResult from "./QuizResult";
import CareerList from "./Careerlist";
import { UserProvider } from "./context/UserContext";
import LearningPath from "./LearningPath";
import { ProgressProvider } from "./context/ProgressContext";
import MBTIResult from "./MBTIResult";
import Congratulation from "./Congratulation";

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/formmbti" element={<FormMbti />} />
            <Route path="/aptitude" element={<Aptitude />} />
            <Route path="/basicknowledge" element={<BasicKnowledge />} />
            <Route path="/learningpath" element={<LearningPath />} />
            <Route path="/learningpath/:careerSlug" element={<LearningPath />} />
            <Route path="/mbti/:type" element={<MBTIResult />} />
            <Route path="/quiz/:careerSlug/:stageId" element={<Quiz />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz-result" element={<QuizResult />} />
            <Route path="/career-list" element={<CareerList />} />
            <Route path="/congratulation" element={<Congratulation />} />
          </Routes>
        </ProgressProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
