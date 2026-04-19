import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import "./StudentChangePassword.css";

function StudentChangePassword() {
  const { students, setStudents, currentUser } = useContext(DataContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentStudent = students.find(s => s.id === currentUser.id);
    if (!currentStudent) {
      setMessage("❌ Student not found!");
      return;
    }

    if (oldPassword !== currentStudent.password) {
      setMessage("❌ Old password is incorrect!");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("⚠️ New password must be at least 6 characters long!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("❌ New password & confirm password do not match!");
      return;
    }

    // Success
    setStudents(students.map(s => s.id === currentUser.id ? { ...s, password: newPassword } : s));
    setMessage("✅ Student password updated successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="student-password-container">
      <h2>Change Student Password</h2>
      <form onSubmit={handleSubmit} className="student-password-form">
        <div className="form-group">
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="update-btn">
          Update Password
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default StudentChangePassword;
