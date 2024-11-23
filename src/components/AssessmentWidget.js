import React, { useState, useRef } from "react";
import "./Assessment.css";
import CustomizeAssessmentModal from "./CustomizeAssessmentModal";

const AssessmentWidget = ({ assessments = [] }) => { // Default to empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("open");
  const [assessmentList, setAssessmentList] = useState(assessments); // Initialize state with default prop
  const listRef = useRef(null);

  const handleNewAssessment = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleCreateAssessment = (newAssessment) => {
    setAssessmentList((prevState) => [...prevState, newAssessment]);
  };

  const handleDeleteAssessment = (assessmentId) => {
    setAssessmentList((prevState) =>
      prevState.filter((assessment) => assessment.id !== assessmentId)
    );
  };

  const filteredAssessments = assessmentList.filter((assessment) => {
    if (activeTab === "open") return assessment.status === "open";
    if (activeTab === "closed") return assessment.status === "closed";
    return activeTab === "analytics" ? assessment.status === "analytics" : true;
  });

  return (<>
    <div className="assessment-widget">
      <h2>Assessments</h2>
      {/* Tabs */}
      <div className="assessment-tabs">
        <button
          className={`tab-button ${activeTab === "open" ? "active" : ""}`}
          onClick={() => setActiveTab("open")}
        >
          OPEN
        </button>
        <button
          className={`tab-button ${activeTab === "closed" ? "active" : ""}`}
          onClick={() => setActiveTab("closed")}
        >
          CLOSED
        </button>
        <button
          className={`tab-button ${activeTab === "analytics" ? "active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          ANALYTICS
        </button>
      </div>

      {/* Controls */}
      <div className="assessment-controls">
        <input
          type="text"
          placeholder="Search your assessments..."
          className="search-input"
        />
        <button onClick={handleNewAssessment} className="new-assessment-button">
          + New Assessment
        </button>
      </div>

      {/* Assessment List */}
      <div className="assessment-list" ref={listRef}>
        {filteredAssessments.length > 0 ? (
          <div className="assessment-cards">
            {filteredAssessments.map((assessment, index) => (
              <div key={index} className="assessment-card">
                <div className="assessment-info">
                  <strong>{assessment.name}</strong>
                  <span>Type: {assessment.type}</span>
                  <span>Questions: {assessment.numQuestions}</span>
                  <span>Deadline: {assessment.deadline}</span>
                </div>
                <div className="assessment-actions">
                  <button>Edit</button>
                  <button
                    onClick={() => handleDeleteAssessment(assessment.id)}
                  >
                    Delete
                  </button>
                  <button>Assign to Job</button>
                  <button>View Reports</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No assessments available.</p>
        )}
      </div>

      {/* Modal */}
      <CustomizeAssessmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        assessment={null}
        onCreateOrUpdate={handleCreateAssessment}
      />
    </div>
    </>
  );
};

export default AssessmentWidget;
