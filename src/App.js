import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import JobListingWidget from "./components/JobListingWidget"; // Import the widget components
import MetricsWidget from "./components/MetricsWidget";
import Dashboard from "./components/dashboard";
import AssessmentWidget from "./components/AssessmentWidget";
import Candidate from "./components/CandidatesPage";

function App() {
  const assessments = [
    {
      id: 1,
      name: "React Basics",
      type: "MCQ",
      numQuestions: 10,
      deadline: "2024-11-20",
      status: "open",
    },
    {
      id: 2,
      name: "System Design",
      type: "Coding",
      numQuestions: 5,
      deadline: "2024-11-25",
      status: "analytics",
    },
    {
      id: 3,
      name: "Java Basics",
      type: "MCQ",
      numQuestions: 15,
      deadline: "2024-11-30",
      status: "analytics",
    },
  ];

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Auth />} />
        <Route path="/CandidatesPage" element={<Candidate />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard assessments={assessments} />} />

        {/* Widget Routes */}
        <Route path="/JobListingWidget" element={<JobListingWidget />} />
        <Route
          path="/Assessment"
          element={<AssessmentWidget assessments={assessments} />}
        />
        <Route path="/MetricsWidget" element={<MetricsWidget />} />
      </Routes>
    </Router>
  );
}

export default App;
