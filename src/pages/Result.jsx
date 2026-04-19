import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import "./Result.css";

function Result() {
  const { results, setResults, students, subjects } = useContext(DataContext);

  // State
  const [newResult, setNewResult] = useState({ student: "", subject: "", marks: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentResultId, setCurrentResultId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewResult({ ...newResult, [name]: value });
  };

  // Add Result
  const handleAdd = (e) => {
    e.preventDefault();
    if (newResult.student && newResult.subject && newResult.marks) {
      setResults([...results, { ...newResult, id: Date.now() }]);
      setNewResult({ student: "", subject: "", marks: "" });
    }
  };

  // Edit Result
  const handleEdit = (res) => {
    setIsEditing(true);
    setCurrentResultId(res.id);
    setNewResult({ student: res.student, subject: res.subject, marks: res.marks });
  };

  // Update Result
  const handleUpdate = (e) => {
    e.preventDefault();
    setResults(
      results.map((res) =>
        res.id === currentResultId ? { ...res, ...newResult } : res
      )
    );
    setIsEditing(false);
    setNewResult({ student: "", subject: "", marks: "" });
    setCurrentResultId(null);
  };

  // Delete Result
  const handleDelete = (id) => {
    setResults(results.filter((res) => res.id !== id));
  };

  return (
    <div className="result-container">
      <h2>📑 Manage Results</h2>

      {/* Add / Edit Form */}
      <form onSubmit={isEditing ? handleUpdate : handleAdd} className="result-form">
        <select
          name="student"
          value={newResult.student}
          onChange={handleChange}
          required
        >
          <option value="">Select Student</option>
          {students.map((stu) => (
            <option key={stu.id} value={stu.username}>
              {stu.username}
            </option>
          ))}
        </select>

        <select
          name="subject"
          value={newResult.subject}
          onChange={handleChange}
          required
        >
          <option value="">Select Subject</option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="marks"
          placeholder="Enter Marks"
          value={newResult.marks}
          onChange={handleChange}
          required
        />

        <button type="submit">{isEditing ? "Update Result" : "Add Result"}</button>
        {isEditing && (
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}
      </form>

      {/* List of Results */}
      <ul className="result-list">
        {results.map((res) => (
          <li key={res.id} className="result-item">
            <span>
              <strong>{res.student}</strong> - {res.subject} : {res.marks} marks
            </span>
            <div>
              <button onClick={() => handleEdit(res)}>Edit</button>
              <button onClick={() => handleDelete(res.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
