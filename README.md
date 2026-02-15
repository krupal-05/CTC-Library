# Library Management System

A comprehensive MERN stack application designed to streamline library operations, from book management and student tracking to detailed reporting and transaction history.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)

## Overview

This project is a robust library management system that provides tailored interfaces for administrators and students. It facilitates efficient book issuing and returning, student record management, and insightful reporting on library activities. The system leverages the power of the MERN stack (MongoDB, Express.js, React, Node.js) for a seamless and responsive user experience.

## Tech Stack

### Frontend
- **React**: Dynamic user interface construction.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Vite**: Fast frontend build tool.
- **React Router**: Client-side routing for seamless navigation.
- **Lucide React**: Modern and consistent icon set.
- **Axios**: HTTP client for API requests.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for API development.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: Secure user authentication.
- **Bcrypt.js**: Password hashing for security.

## Features

### Public Access
- **Home**: Landing page with library overview.
- **About Us**: Information about the library.
- **Events & News**: Updates on library happenings.
- **Feedback**: Submit feedback to administrators.

### Student Portal
- **Profile**: View and manage personal information.
- **Browse Books**: Explore the library catalog (filterable by UDC).
- **My Books**: Track issued books and due dates.
- **Book Details**: View comprehensive information about specific books.

### Admin Dashboard
- **Dashboard**: Overview of key metrics and recent activities.
- **Manage Books**: Add, edit, remove, and organize books.
- **Manage Students**: View and manage student records.
- **Issue/Return**: Streamlined process for issuing and returning books.
- **Reports**: Generate reports on library usage and transactions.
- **Transaction History**: detailed log of all book movements.
- **Feedback Management**: Review and respond to user feedback.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  Start the server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

## Environment Variables

Ensure you have the following variables in your backend `.env` file:

-   `PORT`: The port on which the backend server will run (default: 5000).
-   `MONGO_URI`: Connection string for your MongoDB database.
-   `JWT_SECRET`: Secret key used for signing JSON Web Tokens.

## Usage

1.  **Start the Backend**: Ensure the MongoDB service is running and start the backend server using `npm run dev`.
2.  **Start the Frontend**: Launch the React application using `npm run dev`.
3.  **Access the App**: Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).
4.  **Login**: Use the appropriate credentials to log in as a student or administrator.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
