import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Sidebar from "./sidebar";
import "./job.css";

function JobListingWidget() {
  const widgetRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    employmentType: "full-time",
    description: "",
    skills: "",
    qualifications: "",
    experienceLevel: "",
    expiryTime: "",
    status: "open",
  });
  const [createdJobs, setCreatedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("Open");

  useEffect(() => {
    gsap.to(widgetRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreatedJobs((prev) => [...prev, formData]);
    setFormData({
      title: "",
      department: "",
      location: "",
      employmentType: "full-time",
      description: "",
      skills: "",
      qualifications: "",
      experienceLevel: "",
      expiryTime: "",
      status: "open",
    });
    setActiveTab("Open");
  };

  const changeStatus = (index, status) => {
    setCreatedJobs((prev) =>
      prev.map((job, i) => (i === index ? { ...job, status } : job))
    );
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="job-listing-widget" ref={widgetRef}>
        {/* Tabs */}
        <div className="tabs">
          {["Open", "Closed", "New Job +"].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Open" && (
          <div className="job-list">
            <h3>Open Jobs</h3>
            {createdJobs.filter((job) => job.status === "open").length === 0 ? (
              <p className="no-jobs">No open jobs available.</p>
            ) : (
              createdJobs
                .filter((job) => job.status === "open")
                .map((job, index) => (
                  <div key={index} className="job-card">
                    <div className="job-info">
                      <h4>{job.title}</h4>
                      <p>{job.department}</p>
                      <p>{job.location}</p>
                      <span className="badge open">Open</span>
                    </div>
                    <button
                      className="icon-btn danger"
                      onClick={() => changeStatus(index, "closed")}
                      title="Close Job"
                    >
                      ❌
                    </button>
                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === "Closed" && (
          <div className="job-list">
            <h3>Closed Jobs</h3>
            {createdJobs.filter((job) => job.status === "closed").length === 0 ? (
              <p className="no-jobs">No closed jobs available.</p>
            ) : (
              createdJobs
                .filter((job) => job.status === "closed")
                .map((job, index) => (
                  <div key={index} className="job-card">
                    <div className="job-info">
                      <h4>{job.title}</h4>
                      <p>{job.department}</p>
                      <p>{job.location}</p>
                      <span className="badge closed">Closed</span>
                    </div>
                    <button
                      className="icon-btn primary"
                      onClick={() => changeStatus(index, "open")}
                      title="Reopen Job"
                    >
                      🔄
                    </button>
                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === "New Job +" && (
          <form className="job-form" onSubmit={handleSubmit}>
            <h3>Create New Job</h3>
            <div className="form-grid">
              {[
                { label: "Job Title", name: "title", type: "text" },
                { label: "Department", name: "department", type: "text" },
                { label: "Location", name: "location", type: "text" },
                { label: "Employment Type", name: "employmentType", type: "select" },
                { label: "Description", name: "description", type: "textarea" },
                { label: "Skills", name: "skills", type: "text" },
                { label: "Qualifications", name: "qualifications", type: "text" },
                { label: "Experience", name: "experienceLevel", type: "text" },
                { label: "Expiry", name: "expiryTime", type: "datetime-local" },
              ].map((field) => (
                <div className="form-group" key={field.name}>
                  <label>{field.label}</label>
                  {field.type === "select" ? (
                    <select name={field.name} onChange={handleChange}>
                      <option value="full-time">Full-Time</option>
                      <option value="part-time">Part-Time</option>
                      <option value="contract">Contract</option>
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn primary">
                Create
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() =>
                  setFormData({
                    title: "",
                    department: "",
                    location: "",
                    employmentType: "full-time",
                    description: "",
                    skills: "",
                    qualifications: "",
                    experienceLevel: "",
                    expiryTime: "",
                    status: "open",
                  })
                }
              >
                Reset
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default JobListingWidget;
