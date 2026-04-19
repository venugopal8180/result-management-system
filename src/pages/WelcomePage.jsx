import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import "./WelcomePage.css"; // optional for styling

function WelcomePage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(DataContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    } else {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [navigate, currentUser]);

  if (currentUser) {
    return null; // or loading
  }

  return (
    <div className="welcome-container">
      <h1>🎓 WELCOME TO EDU TRACK PRO 🎓</h1>
      <p>Redirecting to login...</p>
    </div>
  );
}

export default WelcomePage;
