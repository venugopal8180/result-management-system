import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import "./Dashboard.css";


function Dashboard() {
  const { students, setStudents, subjects, classes, results, currentUser } = useContext(DataContext);

  // State for form modal
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ username: "", email: "", avatar: "", password: "" });
  const [setCustomPassword, setSetCustomPassword] = useState(false);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Generate random password
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewStudent({ ...newStudent, password });
  };

  // Add student to context
  const handleSubmit = (e) => {
    e.preventDefault();
    let studentPassword = newStudent.password;
    if (!setCustomPassword) {
      // Generate password if not custom
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      studentPassword = "";
      for (let i = 0; i < 8; i++) {
        studentPassword += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    if (newStudent.username && newStudent.email && studentPassword) {
      setStudents([...students, { ...newStudent, password: studentPassword, id: Date.now() }]);
      setNewStudent({ username: "", email: "", avatar: "", password: "" });
      setSetCustomPassword(false);
      setShowForm(false);
    }
  };

  const isAdmin = currentUser?.role === "admin";

  return (
    <div>
      <h2>📊 Dashboard</h2>

      {/* Summary Boxes */}
      <div className="dashboard-boxes">
        <div className="dashboard-box">
          <h3>Registered Users</h3>
          <p className="count">{students.length}</p>
        </div>
        <div className="dashboard-box">
          <h3>Subjects Listed</h3>
          <p className="count">{subjects.length}</p>
        </div>
        <div className="dashboard-box">
          <h3>Total Classes</h3>
          <p className="count">{classes.length}</p>
        </div>
        <div className="dashboard-box">
          <h3>Results Declared</h3>
          <p className="count">{results.length}</p>
        </div>
      </div>

      {/* Add New Student Button */}
      {isAdmin && (
        <div className="add-student-container">
          <button className="add-student-btn" onClick={() => setShowForm(true)}>
             Add New Student
          </button>
        </div>
      )}

      {/* Form Modal */}
      {showForm && isAdmin && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Student</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={newStudent.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={newStudent.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="avatar"
                placeholder="Avatar URL (optional)"
                value={newStudent.avatar}
                onChange={handleChange}
              />
              <label>
                <input
                  type="checkbox"
                  checked={setCustomPassword}
                  onChange={(e) => setSetCustomPassword(e.target.checked)}
                />
                Set Custom Password
              </label>
              {setCustomPassword && (
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={newStudent.password}
                  onChange={handleChange}
                  required
                />
              )}
              {!setCustomPassword && (
                <div>
                  <button type="button" onClick={generatePassword}>Generate Password</button>
                  <p>Generated Password: {newStudent.password}</p>
                </div>
              )}
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;