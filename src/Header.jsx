import React, { useState, useContext } from "react";
import { FaCog, FaBell, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./context/DataContext";

function Header({ onToggleSidebar }) {
  const { setCurrentUser, currentUser } = useContext(DataContext);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowNotifications(false); // close notifications if open
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowSettings(false); // close settings if open
  };

  const handleSettingsClick = (action) => {
    setShowSettings(false); // close dropdown
    if (action === "profile") {
      navigate("/profile"); // go to Profile page
    } else if (action === "changePassword") {
      navigate(currentUser?.role === "admin" ? "/admin-password" : "/student-password");
    } else if (action === "logout") {
      setCurrentUser(null);
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="admin-text">{currentUser?.role === "admin" ? "ADMIN" : "STUDENT"}</h1>
      </div>

      <div className="header-right">
        {/* Settings Icon */}
        <div className="icon-container">
          <FaCog className="icon" onClick={toggleSettings} title="Settings" />
          {showSettings && (
            <div className="dropdown-menu">
              <p onClick={() => handleSettingsClick("profile")}>Profile</p>
              <p onClick={() => handleSettingsClick("changePassword")}>Change Password</p>
              <p onClick={() => handleSettingsClick("logout")}>Logout</p>
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <div className="icon-container">
          <FaBell className="icon" onClick={toggleNotifications} title="Notifications" />
          {showNotifications && (
            <div className="dropdown-menu">
              <p>No new notifications</p>
            </div>
          )}
        </div>

        {/* Minimize Sidebar */}
        <FaMinus
          className="icon"
          onClick={onToggleSidebar}
          title="Minimize Sidebar"
        />
      </div>
    </header>
  );
}

export default Header;
