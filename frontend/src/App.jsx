import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import NewsDetails from './pages/NewsDetails';
import StudentLayout from './layouts/StudentLayout';
import Profile from './pages/student/Profile';
import AllBooks from './pages/student/AllBooks';
import MyBooks from './pages/student/MyBooks';
import Payment from './pages/student/Payment';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AddBookObj from './pages/admin/AddBook';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="events/:id" element={<EventDetails />} />
                    <Route path="news/:id" element={<NewsDetails />} />
                </Route>

                <Route path="/student" element={<StudentLayout />}>
                    <Route index element={<Profile />} /> {/* Default to Profile */}
                    <Route path="profile" element={<Profile />} />
                    <Route path="books" element={<AllBooks />} />
                    <Route path="mybooks" element={<MyBooks />} />
                    <Route path="payment" element={<Payment />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="books" element={<AllBooks />} /> {/* Reusing for now */}
                    <Route path="add-book" element={<AddBookObj />} />
                    <Route path="manage-books" element={<div>Manage Books Page (Coming Soon)</div>} />
                    <Route path="activity" element={<div>Recent Activity Page (Coming Soon)</div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
