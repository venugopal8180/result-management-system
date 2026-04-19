import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import "./Profile.css";

function Profile() {
  const { currentUser, students, results } = useContext(DataContext);

  if (!currentUser) {
    return <p>Please login to view your profile.</p>;
  }

  const currentStudent =
    currentUser.role === "student"
      ? students.find((s) => s.id === currentUser.id || s.username === currentUser.username)
      : null;

  const studentResults = currentStudent
    ? results.filter((res) => res.student === currentStudent.username)
    : [];

  const subjectCount = new Set(studentResults.map((res) => res.subject)).size;
  const totalMarks = studentResults.reduce((sum, res) => sum + Number(res.marks || 0), 0);
  const averageMark = studentResults.length ? (totalMarks / studentResults.length).toFixed(1) : "-";

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <div className="profile-card">
        {currentStudent && (
          <div className="profile-avatar">
            <img
              src={currentStudent.avatar || "https://via.placeholder.com/100x100?text=Avatar"}
              alt={`${currentStudent.username}'s avatar`}
              width="100"
              height="100"
              style={{ borderRadius: "50%", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/100x100?text=Avatar";
              }}
            />
          </div>
        )}
        <p><strong>Username:</strong> {currentUser.username || "Admin"}</p>
        <p><strong>Email:</strong> {currentUser.email || (currentStudent && currentStudent.email) || "-"}</p>
        <p><strong>Role:</strong> {currentUser.role || "Admin"}</p>
        {currentStudent && <p><strong>Student ID:</strong> {currentStudent.id}</p>}
      </div>

      {currentStudent && (
        <div className="student-profile-details">
          <h3>My Academic Details</h3>
          <p><strong>Total Subjects:</strong> {subjectCount}</p>
          <p><strong>Results Recorded:</strong> {studentResults.length}</p>
          <p><strong>Average Marks:</strong> {averageMark}</p>

          {studentResults.length > 0 ? (
            <table className="profile-results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {studentResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.subject}</td>
                    <td>{result.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No subjects or marks recorded yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
