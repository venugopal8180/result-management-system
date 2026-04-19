import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import "./Subjects.css";

function Subjects() {
  const { subjects, setSubjects } = useContext(DataContext);

  const [newSubject, setNewSubject] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Add subject
  const handleAdd = () => {
    if (newSubject.trim() === "") return;
    const newId = subjects.length > 0 ? subjects[subjects.length - 1].id + 1 : 1;
    setSubjects([...subjects, { id: newId, name: newSubject }]);
    setNewSubject("");
  };

  // Delete subject
  const handleDelete = (id) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  // Start editing
  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditValue(name);
  };

  // Save edited subject
  const handleSave = (id) => {
    if (editValue.trim() === "") return;
    setSubjects(
      subjects.map((subject) =>
        subject.id === id ? { ...subject, name: editValue } : subject
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="subjects-container">
      <h2>Subjects</h2>

      {/* Add Form */}
      <div className="add-subject">
        <input
          type="text"
          placeholder="Enter subject name"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* List */}
      <ul className="subjects-list">
        {subjects.length === 0 ? (
          <p>No subjects available</p>
        ) : (
          subjects.map((subject) => (
            <li key={subject.id} className="subject-item">
              {editingId === subject.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div className="btn-group">
                    <button
                      className="save-btn"
                      onClick={() => handleSave(subject.id)}
                    >
                      Save
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>{subject.name}</span>
                  <div className="btn-group">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(subject.id, subject.name)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(subject.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Subjects;
