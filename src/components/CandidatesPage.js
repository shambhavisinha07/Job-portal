import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import "./CandidatesPage.css";

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", jobAssigned: "Frontend Developer", resumeLink: "" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", jobAssigned: "", resumeLink: "" },
  ]);
  const [activeTab, setActiveTab] = useState("Assigned");
  const [showForm, setShowForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    jobAssigned: "",
    resumeFile: null,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate({ ...newCandidate, [name]: value });
  };

  // Handle resume file change
  const handleFileChange = (e) => {
    setNewCandidate({ ...newCandidate, resumeFile: e.target.files[0] });
  };

  // Add a new candidate
  const addCandidate = async () => {
    if (newCandidate.name && newCandidate.email && newCandidate.phone) {
      let resumeUrl = "";
  
      // If there's a resume, upload it to S3 and get the presigned URL
      if (newCandidate.resumeFile) {
        const resumeData = new FormData();
        resumeData.append("file", newCandidate.resumeFile);
  
        try {
          // Call backend API to get presigned URL
          const response = await axios.post("/api/upload", resumeData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Upload Response:", response); // Add logging
           // Debugging line
  
          // After the file is uploaded, we get the presigned URL
          resumeUrl = response.data.url || "";  // Adjust depending on the actual response structure
        } catch (error) {
          console.error("Error uploading resume:", error);
        }
      }
  
      // Add candidate with resume URL (if available)
      setCandidates([
        ...candidates,
        { ...newCandidate, id: candidates.length + 1, resumeLink: resumeUrl },
      ]);
  
      // Reset form after adding the candidate
      setNewCandidate({ name: "", email: "", phone: "", jobAssigned: "", resumeFile: null });
    } else {
      alert("Please fill out all fields before adding a candidate.");
    }
  };
  

  // Import candidates from CSV
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const importedCandidates = result.data.map((row) => ({
            name: row[0], 
            email: row[1],
            phone: row[2],
            jobAssigned: row[3] || "", 
            resumeLink: row[4] || "",
          }));
          setCandidates((prevCandidates) => [
            ...prevCandidates,
            ...importedCandidates,
          ]);
        },
        header: false,
        skipEmptyLines: true,
      });
    }
  };

  // Toggle candidate assignment
  const toggleCandidateAssignment = (id) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id
          ? { ...candidate, jobAssigned: candidate.jobAssigned ? "" : "Frontend Developer" }
          : candidate
      )
    );
  };

  // Filter candidates by tab
  const filteredCandidates = candidates.filter((candidate) =>
    activeTab === "Assigned" ? candidate.jobAssigned : !candidate.jobAssigned
  );

  return (
    <div className="candidates-page">
      <h1>Candidates</h1>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "Assigned" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Assigned");
            setShowForm(false);
          }}
        >
          Assigned
        </button>
        <button
          className={`tab ${activeTab === "Not Assigned" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Not Assigned");
            setShowForm(false);
          }}
        >
          Not Assigned
        </button>
        <button
          className={`tab ${activeTab === "Add Candidate" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Add Candidate");
            setShowForm(true);
          }}
        >
          + Add Candidate
        </button>
      </div>

      {/* Assigned/Not Assigned Sections */}
      {!showForm && (
        <div className="candidate-list">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="candidate-card">
                <h3>{candidate.name}</h3>
                <p>Email: {candidate.email}</p>
                <p>Phone: {candidate.phone}</p>
                <p>
                  Job: {candidate.jobAssigned || "Not Assigned"}
                </p>
                <p>
  Resume: {candidate.resumeLink ? (
    <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer">View Resume</a>
  ) : "No Resume"}
</p>

                <button onClick={() => toggleCandidateAssignment(candidate.id)}>
                  {activeTab === "Assigned" ? "Unassign" : "Assign"}
                </button>
              </div>
            ))
          ) : (
            <p>No candidates found in this category.</p>
          )}
        </div>
      )}

      {/* Add Candidate Section */}
      {showForm && (
        <div className="add-candidate-section">
          {/* Import Candidates */}
          <div className="import-section">
            <label htmlFor="importFile">Import Candidates (CSV):</label>
            <input
              type="file"
              id="importFile"
              accept=".csv"
              onChange={handleImport}
            />
          </div>

          {/* Candidates Table */}
          <div className="candidates-table">
            <h2>All Candidates</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Job</th>
                  <th>Resume</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>{candidate.name}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.phone}</td>
                    <td>{candidate.jobAssigned || "Not Assigned"}</td>
                    <td>
                      {candidate.resumeLink ? (
                        <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer">
                          View Resume
                        </a>
                      ) : (
                        "No Resume"
                      )}
                    </td>
                    <td>
                      <button onClick={() => toggleCandidateAssignment(candidate.id)}>
                        {candidate.jobAssigned ? "Unassign" : "Assign"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Candidate Form */}
          <div className="form-container">
            <h2>Add Candidate</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="name"
                placeholder="Candidate Name"
                value={newCandidate.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newCandidate.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={newCandidate.phone}
                onChange={handleInputChange}
              />
              <select
                name="jobAssigned"
                value={newCandidate.jobAssigned}
                onChange={handleInputChange}
              >
                <option value="">Select Job</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
              </select>

              {/* Resume Upload */}
              <input
                type="file"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
              />

              <button type="button" onClick={addCandidate}>
                Save Candidate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;
