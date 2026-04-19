import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import StudentClasses from "./pages/StudentClasses";
import Result from "./pages/Result";
import AdminPassword from "./pages/AdminPassword";
import StudentChangePassword from "./pages/StudentChangePassword";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Layout from "./Layout";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <Routes>
        {/* Welcome Page */}
        <Route path="/" element={<Welcome />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* All routes inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="student-classes" element={<StudentClasses />} />
          <Route path="result" element={<Result />} />
          <Route path="admin-password" element={<AdminPassword />} />
          <Route
            path="student-password"
            element={<StudentChangePassword />}
          />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
