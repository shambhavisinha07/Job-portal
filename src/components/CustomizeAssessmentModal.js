import React, { useState, useEffect } from "react";
import "./CustomizeAssessmentModal.css";

const CustomizeAssessmentModal = ({
  isOpen,
  onClose,
  assessment = null,
  onCreateOrUpdate,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    type: "",
    numQuestions: "",
    deadline: "",
    status: "open",
  });

  // Populate form if assessment data is provided
  useEffect(() => {
    if (assessment) {
      setFormState({
        name: assessment.name || "",
        type: assessment.type || "",
        numQuestions: assessment.numQuestions || "",
        deadline: assessment.deadline || "",
        status: assessment.status || "open",
      });
    } else {
      setFormState({
        name: "",
        type: "",
        numQuestions: "",
        deadline: "",
        status: "open",
      });
    }
  }, [assessment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formState.name.trim() === "") {
      alert("Assessment name is required!");
      return;
    }

    onCreateOrUpdate({ ...assessment, ...formState });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>{assessment ? "Edit Assessment" : "Create Assessment"}</h2>
        <div className="modal-form">
          <label htmlFor="name">Assessment Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            placeholder="Enter assessment name"
          />

          <label htmlFor="type">Type</label>
          <input
            id="type"
            type="text"
            name="type"
            value={formState.type}
            onChange={handleInputChange}
            placeholder="e.g., Quiz, Exam"
          />

          <label htmlFor="numQuestions">Number of Questions</label>
          <input
            id="numQuestions"
            type="number"
            name="numQuestions"
            value={formState.numQuestions}
            onChange={handleInputChange}
            min="1"
            placeholder="e.g., 10"
          />

          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            type="date"
            name="deadline"
            value={formState.deadline}
            onChange={handleInputChange}
          />

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={handleInputChange}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="back-button">
            Go Back
          </button>
          <button onClick={handleSubmit} className="create-button">
            {assessment ? "Update Assessment" : "Create Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeAssessmentModal;
