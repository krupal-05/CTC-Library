# 📚 CTC Library Management System

A modern, full-stack Library Management System built with the **MERN Stack** (MongoDB, Express, React, Node.js). This application streamlines library operations, allowing students to browse and request books while giving administrators powerful tools to manage the catalog, users, and transactions.

## 🚀 Key Features

### 🎓 Student Portal
- **Smart Book Search**: Browse the complete catalog with real-time search by title or author and filters for availability.
- **Book Details**: Click on any book to view detailed information, including description, author, and available copies.
- **Borrow Requests**: Request to borrow books directly from the interface, specifying the desired **duration (in days)**.
- **My Books Dashboard**: Track the status of your requests (Pending, Approved, Issued) and view your active loans.
- **Profile Management**: View and manage your student profile.
- **Instant Feeback**: Modern **Toast Notifications** for all actions (requests, errors, success) instead of intrusive alerts.

### 🛡️ Admin Dashboard (Library Manager)
- **Comprehensive Dashboard**: View real-time statistics (Total Books, Borrowed Books, Overdue Books) at a glance.
- **Quick Actions**: Fast access to common tasks, recently reordered for efficiency:
    1.  Add New Book
    2.  Borrow Requests
    3.  Return Book
    4.  Issue Book
    5.  Remove Book
    6.  Register Admin
    7.  Manage Students
    8.  Using Reports
- **Request Management**: Review student borrow requests. System displays the **requested duration** for informed approval.
- **Issue & Return System**: 
    - Issue books directly to students.
    - **Automated Penalty Calculation**: Returns processed after the due date automatically calculate and display a penalty fee (e.g., ₹2/day).
- **Transaction History**: A detailed, filterable log of all library transactions (Issues, Returns) for accountability.
- **Student Management**: View and remove students from the system.
- **Catalog Control**: Add new books with cover images, quantity, and metadata; remove outdated books.
- **Role-Based Access**: Strict role enforcement (Admins view/manage but cannot borrow books themselves).

## 🛠️ Tech Stack

- **Frontend**: 
  - React.js (Vite)
  - Tailwind CSS (Styling)
  - Lucide React (Icons)
  - Axios (API Requests)
- **Backend**: 
  - Node.js & Express.js
  - MongoDB (Database)
  - Mongoose (ODM)
  - JWT (Authentication)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally or Atlas URI)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd library-project
```

### 2. Backend Configuration
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library  # Or your Atlas URI
JWT_SECRET=your_super_secret_key
```

Start the server:
```bash
npm run dev
```

### 3. Frontend Configuration
Open a new terminal, navigate to the `frontend` folder and install dependencies:
```bash
cd frontend
npm install
```

Start the React app:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 📸 Usage Guide

1.  **Register/Login**: Start by registering a Student account. (First admin usually created via seed or manual DB entry if not enabled in UI).
2.  **Borrowing**: 
    - Students: Login -> "All Books" -> Click "Request" on a book -> Enter Duration -> Confirm.
    - Status: Check "My Books" for updates.
3.  **Admin Approval**:
    - Admin: Login -> "Borrow Requests" -> Click "Approve" (or Reject).
4.  **Returning**:
    - Admin: Login -> "Return Book" -> Enter Student/Book details -> Confirm Return. (Penalty shows if late).

## 🤝 Contributing
Contributions are welcome! Pull requests are accepted for bug fixes and feature enhancements.
