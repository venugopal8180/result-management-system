import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./Students.css"; // Import the separate CSS file

function Students() {
  const { students, setStudents } = useContext(DataContext);
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudent, setEditStudent] = useState({
    id: null,
    username: "",
    email: "",
    avatar: "",
    avatarFile: null,
    password: ""
  });

  const [newStudent, setNewStudent] = useState({
    username: "",
    email: "",
    avatar: "",
    avatarFile: null,
    password: ""
  });

  const [setCustomPassword, setSetCustomPassword] = useState(false);

  // ---- Selection Handlers ----
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === students.length) setSelected([]);
    else setSelected(students.map((s) => s.id));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    setSelected((prev) => prev.filter((sid) => sid !== id));
  };

  const deleteSelected = () => {
    setStudents(students.filter((s) => !selected.includes(s.id)));
    setSelected([]);
  };

  // ---- Edit Handlers ----
  const openEdit = (student) => {
    setEditStudent({
      id: student.id,
      username: student.username || "",
      email: student.email || "",
      avatar: student.avatar || "",
      avatarFile: null,
      password: student.password || ""
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (editStudent.avatar && editStudent.avatar.startsWith("blob:")) {
        URL.revokeObjectURL(editStudent.avatar);
      }
      const preview = URL.createObjectURL(file);
      setEditStudent((prev) => ({
        ...prev,
        avatarFile: file,
        avatar: preview,
      }));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setStudents((prev) =>
      prev.map((s) =>
        s.id === editStudent.id
          ? {
              ...s,
              username: editStudent.username.trim(),
              email: editStudent.email.trim(),
              avatar: editStudent.avatar,
              password: editStudent.password
            }
          : s
      )
    );
    setIsEditing(false);
  };

  // ---- Add Student Handlers ----
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (newStudent.avatar && newStudent.avatar.startsWith("blob:")) {
        URL.revokeObjectURL(newStudent.avatar);
      }
      const preview = URL.createObjectURL(file);
      setNewStudent((prev) => ({
        ...prev,
        avatarFile: file,
        avatar: preview,
      }));
    }
  };

  // Generate random password
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewStudent((prev) => ({ ...prev, password }));
  };

  const handleAddStudent = (e) => {
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
    if (!newStudent.username || !newStudent.email || !studentPassword) return;

    setStudents([
      ...students,
      {
        id: Date.now(),
        username: newStudent.username.trim(),
        email: newStudent.email.trim(),
        avatar: newStudent.avatar,
        password: studentPassword
      },
    ]);

    setNewStudent({ username: "", email: "", avatar: "", avatarFile: null, password: "" });
    setSetCustomPassword(false);
  };

  return (
    <div className="students-page">
      <h2>👨‍🎓 Students</h2>

      {/* Add Student Form */}
      <div className="add-student-form">
        <h3>Add New Student</h3>
        <form onSubmit={handleAddStudent}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newStudent.username}
            onChange={handleNewChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={handleNewChange}
            required
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
              placeholder="Password"
              value={newStudent.password}
              onChange={handleNewChange}
              required
            />
          )}
          {!setCustomPassword && (
            <div>
              <button type="button" onClick={generatePassword}>Generate Password</button>
              <p>Generated Password: {newStudent.password}</p>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleNewFile} />

          {newStudent.avatar && (
            <img
              src={newStudent.avatar}
              alt="Preview"
              width="60"
              height="60"
              style={{ borderRadius: "50%", objectFit: "cover", marginTop: "10px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/40x40?text=No+Image";
              }}
            />
          )}

          <button type="submit" className="add-btn">Add Student</button>
        </form>
      </div>

      <br />

      {selected.length > 0 && (
        <button className="bulk-delete-btn" onClick={deleteSelected}>
          🗑 Delete Selected ({selected.length})
        </button>
      )}

      {/* Students Table */}
      <table className="students-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length > 0 && selected.length === students.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Avatar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No students registered yet.</td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(s.id)}
                    onChange={() => toggleSelect(s.id)}
                  />
                </td>
                <td>{s.username}</td>
                <td>{s.email}</td>
                <td>{s.password || "-"}</td>
                <td>
                  <img
                    src={s.avatar || "https://via.placeholder.com/40x40?text=No+Image"}
                    alt={`${s.username}'s avatar`}
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/40x40?text=No+Image";
                    }}
                  />
                </td>
                <td>
                  <button className="edit-btn" onClick={() => openEdit(s)}>✏ Edit</button>
                  <button className="delete-btn" onClick={() => deleteStudent(s.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <br />
      <button className="back-btn" onClick={() => navigate("/")}>Back</button>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Student</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={editStudent.username}
                onChange={handleEditChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={editStudent.email}
                onChange={handleEditChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={editStudent.password}
                onChange={handleEditChange}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              {editStudent.avatar && (
                <img
                  src={editStudent.avatar}
                  alt="Preview"
                  width="60"
                  height="60"
                  style={{ borderRadius: "50%", objectFit: "cover", marginTop: "10px" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/60x60?text=No+Image";
                  }}
                />
              )}

              <button type="submit" className="edit-btn">Update</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;






