import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import "./StudentClasses.css";

function StudentClasses() {
  const { classes, setClasses } = useContext(DataContext);

  // State
  const [newClass, setNewClass] = useState({ name: "", section: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentClassId, setCurrentClassId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  // Add Class
  const handleAdd = (e) => {
    e.preventDefault();
    if (newClass.name && newClass.section) {
      setClasses([...classes, { ...newClass, id: Date.now() }]);
      setNewClass({ name: "", section: "" });
    }
  };

  // Edit Class
  const handleEdit = (cls) => {
    setIsEditing(true);
    setCurrentClassId(cls.id);
    setNewClass({ name: cls.name, section: cls.section });
  };

  // Update Class
  const handleUpdate = (e) => {
    e.preventDefault();
    setClasses(
      classes.map((cls) =>
        cls.id === currentClassId ? { ...cls, ...newClass } : cls
      )
    );
    setIsEditing(false);
    setNewClass({ name: "", section: "" });
    setCurrentClassId(null);
  };

  // Delete Class
  const handleDelete = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  return (
    <div className="classes-container">
      <h2>🏫 Manage Student Classes</h2>

      {/* Add / Edit Form */}
      <form onSubmit={isEditing ? handleUpdate : handleAdd} className="class-form">
        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={newClass.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={newClass.section}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? "Update Class" : "Add Class"}</button>
        {isEditing && (
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}
      </form>

      {/* List of Classes */}
      <ul className="class-list">
        {classes.map((cls) => (
          <li key={cls.id} className="class-item">
            <span>
              <strong>{cls.name}</strong> - Section {cls.section}
            </span>
            <div>
              <button onClick={() => handleEdit(cls)}>Edit</button>
              <button onClick={() => handleDelete(cls.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentClasses;
