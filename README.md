# Result Management System

**Live Demo:** [https://result-management-system-o3gr.onrender.com](https://result-management-system-o3gr.onrender.com)

A role-based academic management system built with React. Admins can manage students, subjects, classes, and results — while students can view their own academic profile and performance.

---

## Features

### Admin
- Secure admin login with password change support
- Add, edit, and delete students (with avatar upload support)
- Bulk delete students via checkbox selection
- Manage subjects (add, edit, delete)
- Manage student classes and sections
- Record, edit, and delete student results
- View dashboard summary (users, subjects, classes, results)

### Student
- Login with username or email
- View personal profile with avatar
- View academic results (subjects, marks, average)
- Change own password

### General
- Animated welcome splash screen
- Role-based sidebar navigation (admin sees all, student sees limited)
- Collapsible sidebar via header minimize button
- Settings dropdown (Profile, Change Password, Logout)
- Notifications bell in header
- Protected routes — redirects to login if unauthenticated

---

## Project Structure

```
rmsproject/
├── public/
│   ├── default-avatar.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── context/
│   │   └── DataContext.jsx       # Global state (students, subjects, classes, results, auth)
│   │
│   ├── pages/
│   │   ├── WelcomePage.jsx       # Animated splash → redirects to login
│   │   ├── Login.jsx             # Role selection + login form
│   │   ├── Dashboard.jsx         # Summary stats + add student modal
│   │   ├── Students.jsx          # Full student CRUD table
│   │   ├── Subjects.jsx          # Subject management
│   │   ├── StudentClasses.jsx    # Class & section management
│   │   ├── Result.jsx            # Result entry and management
│   │   ├── Profile.jsx           # User profile + academic summary
│   │   ├── AdminPassword.jsx     # Admin password change
│   │   └── StudentChangePassword.jsx  # Student password change
│   │
│   ├── App.js                    # Route definitions
│   ├── Layout.jsx                # Shell with Header + Sidebar + Outlet
│   ├── Header.jsx                # Top bar with settings & notifications
│   ├── Sidebar.jsx               # Role-aware navigation links
│   └── index.js                  # React DOM entry point
│
├── package.json
└── README.md
```

---
## Tech Stack

| Layer         | Technology                            |
|---------------|---------------------------------------|
| Frontend      | React 19, JSX                         |
| Routing       | React Router DOM v7                   |
| State         | React Context API (`DataContext`)      |
| Charts        | Recharts                              |
| Icons         | React Icons                           |
| Styling       | Plain CSS (per-component files)       |
| Build Tool    | Create React App                      |
| Deployment    | Render                                |

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rmsproject.git
cd rmsproject
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## Default Login Credentials

| Role    | Username        | Password   |
|---------|-----------------|------------|
| Admin   | `admin`         | `admin123` |
| Student | `john_doe`      | `john123`  |
| Student | `jane_smith`    | `jane123`  |
| Student | `bob_johnson`   | `bob123`   |

> Passwords are stored in-memory (React state). All data resets on page refresh. There is no backend or persistent database.

---

## Page & Route Reference

| Route                | Page                    | Access          |
|----------------------|-------------------------|-----------------|
| `/`                  | Welcome splash screen   | Public          |
| `/login`             | Login (role selection)  | Public          |
| `/dashboard`         | Summary dashboard       | Admin + Student |
| `/students`          | Student management      | Admin only      |
| `/subjects`          | Subject management      | Admin only      |
| `/student-classes`   | Class management        | Admin only      |
| `/result`            | Result management       | Admin only      |
| `/admin-password`    | Change admin password   | Admin only      |
| `/student-password`  | Change student password | Student only    |
| `/profile`           | User profile            | Admin + Student |

---

## Global State (`DataContext`)

All app data lives in `DataContext.jsx` and is shared across components via React Context:

| State           | Description                                          |
|-----------------|------------------------------------------------------|
| `students`      | List of all registered students                      |
| `subjects`      | List of subjects                                     |
| `classes`       | List of student classes and sections                 |
| `results`       | List of results `{ student, subject, marks }`        |
| `adminPassword` | Current admin password                               |
| `currentUser`   | Logged-in user object `{ role, username, id }`       |

---

## Screenshots

> _Add screenshots of the dashboard, login page, results page, and student profile here._

---

## Known Limitations

- **No backend or database** — all data is stored in React state and resets on refresh
- **Passwords are stored in plain text** in state (not suitable for production)
- **No persistent sessions** — logging in again is required after page reload

---

## Future Improvements

- Add a Node.js / Django backend with a real database
- Implement JWT-based authentication
- Add result charts per student using Recharts
- Export results to PDF or Excel
- Add email notifications for results

---

## License

This project is open source and available under the [MIT License](LICENSE).
