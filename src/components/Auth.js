import React, { useState, useEffect, useRef } from "react";
import Login from "./login";
import SignupCandidate from "./SignupCandidate";
import SignupCompany from "./SignupCompany";
import { gsap } from "gsap";
import "./Auth.css";
import img from "./login-img.avif";

function Auth() {
  const [view, setView] = useState("login");
  const formContainerRef = useRef(null);
  const imageRef = useRef(null);

  // Animate on view change
  useEffect(() => {
    if (formContainerRef.current) {
      gsap.fromTo(
        formContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [view]);

  return (
    <div className="auth-page">
      {/* Left side with the image */}
      <div className="auth-image" ref={imageRef}>
        <img src={img} alt="Welcome" />
      </div>

      {/* Right side with the form */}
      <div className="auth-container" ref={formContainerRef}>
        {view === "login" && <Login />}
        {view === "signupCandidate" && <SignupCandidate />}
        {view === "signupCompany" && <SignupCompany />}

        <div className="auth-switcher">
          <button
            onClick={() => setView("login")}
            className={view === "login" ? "active" : ""}
          >
            Login
          </button>
          <button
            onClick={() => setView("signupCandidate")}
            className={view === "signupCandidate" ? "active" : ""}
          >
            Signup as Candidate
          </button>
          <button
            onClick={() => setView("signupCompany")}
            className={view === "signupCompany" ? "active" : ""}
          >
            Signup as Company
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
