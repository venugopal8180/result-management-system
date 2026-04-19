import React, { createContext, useState } from "react";

// Create Context
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Students
  const [students, setStudents] = useState([
    { id: 1, username: "john_doe", email: "john@example.com", avatar: "", password: "john123" },
    { id: 2, username: "jane_smith", email: "jane@example.com", avatar: "", password: "jane123" },
    { id: 3, username: "bob_johnson", email: "bob@example.com", avatar: "", password: "bob123" }
  ]);

  // Subjects
  const [subjects, setSubjects] = useState([]);

  // Classes
  const [classes, setClasses] = useState([]);

  // Results
  const [results, setResults] = useState([]);

  // Passwords
  const [adminPassword, setAdminPassword] = useState("admin123");
  const [studentPassword, setStudentPassword] = useState("student123");

  // Current User (null if no one logged in)
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <DataContext.Provider
      value={{
        students, setStudents,
        subjects, setSubjects,
        classes, setClasses,
        results, setResults,
        adminPassword, setAdminPassword,
        studentPassword, setStudentPassword,
        currentUser, setCurrentUser
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
