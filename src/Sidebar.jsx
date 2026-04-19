import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "./context/DataContext";

function Sidebar() {
  const { currentUser } = useContext(DataContext);

  const isAdmin = currentUser?.role === "admin";

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-heading">Dash</h3>
        <ul>
          <li><NavLink to="/dashboard" className="nav-link">Dashboard</NavLink></li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">Appearance</h3>
        <ul>
          {isAdmin && <li><NavLink to="/student-classes" className="nav-link">Student Classes</NavLink></li>}
          {isAdmin && <li><NavLink to="/subjects" className="nav-link">Subjects</NavLink></li>}
          {isAdmin && <li><NavLink to="/students" className="nav-link">Students</NavLink></li>}
          {isAdmin && <li><NavLink to="/result" className="nav-link">Result</NavLink></li>}
          {isAdmin && <li><NavLink to="/admin-password" className="nav-link">Admin Change Password</NavLink></li>}
          <li><NavLink to="/profile" className="nav-link">Profile</NavLink></li>
          <li><NavLink to="/student-password" className="nav-link">Student Change Password</NavLink></li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
