# CTC Library Management System

A comprehensive Library Management System built with the MERN stack (MongoDB, Express, React, Node.js). This application enables users to browse e-books, check library news, and allows administrators to manage the library catalog and users.

## 🚀 Features

### User Features
- **Browse Books**: View available library books and e-books.
- **Library News & Events**: Stay updated with the latest library news and upcoming events.
- **User Dashboard**: Manage profile and view borrowed history.

### Admin Features
- **Admin Dashboard**: Comprehensive overview of library statistics.
- **Book Management**: Add, update, and delete books from the catalog.
- **User Management**: Manage library members and their permissions.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas connection string)

### 1. Clone the Repository
```bash
git clone https://github.com/krupal-05/CTC-Library.git
cd CTC-Library
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your configuration:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.