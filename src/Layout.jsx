// Layout.js
import React, { useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { DataContext } from "./context/DataContext";

function Layout() {
  const { currentUser } = useContext(DataContext);
  const navigate = useNavigate();

  // State to toggle sidebar
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  // If not logged in, redirect to login
  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className={`app ${collapsed ? "collapsed" : ""}`}>
      {/* Pass toggle function to Header */}
      <Header onToggleSidebar={handleToggleSidebar} />
      
      <div className="main-container">
        {/* Sidebar visible only if not collapsed */}
        <Sidebar />
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}

export default Layout;
