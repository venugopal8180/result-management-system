import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import "./AdminPassword.css";

function AdminPassword() {
  const { adminPassword, setAdminPassword } = useContext(DataContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (oldPassword !== adminPassword) {
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
    setAdminPassword(newPassword);
    setMessage("✅ Password updated successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="admin-password-container">
      <h2>Change Admin Password</h2>
      <form onSubmit={handleSubmit} className="admin-password-form">
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

export default AdminPassword;
