import React, { useState } from "react";

function SignupCandidate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleCandidateSignup = (event) => {
    event.preventDefault();
    console.log("Candidate registered!");
  };

  return (
    <div className="auth-container">
      <h2>Candidate Signup</h2>
      <form onSubmit={handleCandidateSignup}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupCandidate;
