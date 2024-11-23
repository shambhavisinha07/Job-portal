import React from 'react';
import './sidebar.css';
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <nav>
        <h3>Job Portal</h3>
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">Home</Link>
          </li>
          <li className={location.pathname === "/JobListingWidget" ? "active" : ""}>
            <Link to="/JobListingWidget">Jobs</Link>
          </li>
          <li className={location.pathname === "/Assessment" ? "active" : ""}>
            <Link to="/Assessment">Assignments</Link>
          </li>
          <li className={location.pathname === "/CandidatesPage" ? "active" : ""}>
            <Link to="/CandidatesPage">Candidates</Link>
          </li>
          <li className={location.pathname === "/Interviews" ? "active" : ""}>
            <Link to="/Interviews">Interviews</Link>
          </li>
          <li className={location.pathname === "/Reports" ? "active" : ""}>
            <Link to="/Reports">Reports</Link>
          </li>
          <li className={location.pathname === "/Settings" ? "active" : ""}>
            <Link to="/Settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
