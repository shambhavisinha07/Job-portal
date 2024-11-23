import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";


function Dashboard({ assessments }) {
  const [latestDeadline, setLatestDeadline] = useState("");
  const [openData, setOpenData] = useState([]);
  const [closedData, setClosedData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    // Categorize assessments
    const openAssessments = assessments.filter((a) => a.status === "open");
    const closedAssessments = assessments.filter((a) => a.status === "closed");
    const analyticsAssessments = assessments.filter(
      (a) => a.status === "analytics"
    );

    // Sort and set data for each category
    setOpenData(openAssessments);
    setClosedData(closedAssessments);
    setAnalyticsData(analyticsAssessments);

    // Find the latest deadline in open assessments
    if (openAssessments.length > 0) {
      const sortedByDeadline = openAssessments.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
      setLatestDeadline(sortedByDeadline[0]?.deadline);
    }
  }, [assessments]);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar />
      

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h2>Dashboard</h2>
          <div className="cta-banner">
            <p>
              Track and analyze candidate metrics seamlessly.
              <br />
              <strong>Next Assessment Deadline:</strong>{" "}
              {latestDeadline || "N/A"}
            </p>
            <button className="cta-button">Create Custom Dashboard</button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="content-sections">
          {/* Recent Activity */}
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <ul>
              <li>
                <span className="activity-type">Assessment Created</span>
                <span className="email">debayan.bhattacharya@kaygen.com</span>
                <span className="timestamp">Nov 08, 2024, 11:16 AM</span>
              </li>
              <li>
                <span className="activity-type">Interview Ended</span>
                <span className="email">debayan.bhattacharya@kaygen.com</span>
                <span className="timestamp">Nov 07, 2024, 3:03 PM</span>
              </li>
            </ul>
          </div>

          {/* Metrics Section */}
          <div className="metrics">
            {/* Open Assessments */}
            <div className="metric-card">
              <h4>Open Assessments</h4>
              <p>{openData.length}</p>
              <span>Assessments ready for candidates</span>
            </div>

            {/* Closed Assessments */}
            <div className="metric-card">
              <h4>Closed Assessments</h4>
              <p>{closedData.length}</p>
              <span>Assessments no longer active</span>
            </div>

            {/* Analytics Assessments */}
            <div className="metric-card">
              <h4>Analytics</h4>
              <p>{analyticsData.length}</p>
              <span>Data available for review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
