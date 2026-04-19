import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import "./Login.css";

function Login() {
  const { students, setCurrentUser, adminPassword } = useContext(DataContext);

  const defaultAdmin = { username: "admin", password: adminPassword };

  const [role, setRole] = useState(null); // "student" | "admin" | null
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "admin") {
      if (
        formData.username === defaultAdmin.username &&
        formData.password === defaultAdmin.password
      ) {
        setCurrentUser({ role: "admin", username: defaultAdmin.username });
        alert("✅ Admin login successful!");
        navigate("/"); // Dashboard
      } else {
        alert("❌ Invalid Admin credentials!");
      }
    } else if (role === "student") {
      const student = students.find(
        (s) =>
          s.username === formData.username || s.email === formData.username
      );

      if (student) {
        if (formData.password === student.password) {
          setCurrentUser({
            role: "student",
            username: student.username,
            email: student.email,
            id: student.id,
          });
          alert(`✅ Welcome, ${student.username}!`);
          navigate("/"); // student dashboard (use same dashboard or create new)
        } else {
          alert("❌ Incorrect student password!");
        }
      } else {
        alert("❌ Student not found!");
      }
    }
  };

  return (
    <div className="login-container">
      {!role ? (
        <div className="role-selection">
          <h2>Select Login Type</h2>
          <button onClick={() => setRole("student")}>Student Login</button>
          <button onClick={() => setRole("admin")}>Admin Login</button>
        </div>
      ) : (
        <div className="login-form">
          <h2>{role === "admin" ? "Admin Login" : "Student Login"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder={
                role === "student"
                  ? "Enter Username or Email"
                  : "Enter Admin Username"
              }
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
          <button className="back-btn" onClick={() => setRole(null)}>
            ⬅ Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
