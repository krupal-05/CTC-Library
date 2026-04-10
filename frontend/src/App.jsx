import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";




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
import BookDetails from './pages/student/BookDetails';

// New Public Pages
import DigitalResources from './pages/digital/DigitalResources';
import EventsPage from './pages/events/EventsPage';
import Programs from './pages/events/Programs';
import ContactPage from './pages/contact/ContactPage';
import FAQ from './pages/contact/FAQ';
import Policies from './pages/contact/Policies';
import Volunteer from './pages/Volunteer';
import Librarian from './pages/contact/Librarian';
import Committee from './pages/committee/Committee';
import Coursenptel from './pages/courses/CourseNptel';
import CourseOnos from './pages/courses/CourseOnos';
import MapPage from './pages/MapPage';

import UDCBrowse from './pages/student/UDCBrowse';
import AdminLayout from './layouts/AdminLayout';
import AdminProfile from './pages/admin/Profile';
import ManageBooks from './pages/admin/ManageBooks';
import AddBookObj from './pages/admin/AddBook';
import IssueBook from './pages/admin/IssueBook';
import ReturnBook from './pages/admin/ReturnBook';

import Reports from './pages/admin/Reports';
import TransactionHistory from './pages/admin/TransactionHistory';
import Feedback from './pages/Feedback';
import AdminFeedback from './pages/admin/AdminFeedback';
import ManageStudents from './pages/admin/ManageStudents';
import RemoveBook from './pages/admin/RemoveBook';
import AdminRequests from './pages/AdminRequests';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/ScrollToTop';

import { NotificationProvider } from './context/NotificationContext';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";



function App() {
    return (
        <ToastProvider>
            <NotificationProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<PublicLayout />}>
                            <Route index element={<Home />} />
                            <Route path="about" element={<AboutUs />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="events/:id" element={<EventDetails />} />
                            <Route path="news/:id" element={<NewsDetails />} />
                            <Route path="feedback" element={<Feedback />} />

                            {/* Digital Resources */}
                            <Route path="digital" element={<DigitalResources />} />
                            <Route path="digital/newspapers" element={<DigitalResources />} />
                            <Route path="digital/books" element={<DigitalResources />} />
                            <Route path="digital/magazines" element={<DigitalResources />} />
                            <Route path="digital/pamphlets" element={<DigitalResources />} />
                            <Route path="digital/audiobooks" element={<DigitalResources />} />

                            {/* Events & Programs */}
                            <Route path="events" element={<EventsPage />} />
                            <Route path="programs" element={<Programs />} />

                            {/* Contact & Support */}
                            <Route path="contact" element={<ContactPage />} />
                            <Route path="contact/details" element={<ContactPage />} />
                            <Route path="faq" element={<FAQ />} />
                            <Route path="policies" element={<Policies />} />

                            <Route path="librarian" element={<Librarian />} />

                            {/* Committee */}
                            <Route path="committee" element={<Committee />} />

                            {/* Courses */}
                            <Route path="learning/nptel" element={<Coursenptel />} />
                            <Route path="learning/onos" element={<CourseOnos />} />

                            {/* Map */}
                            <Route path="map" element={<MapPage />} />
                        </Route>

                        <Route path="/student" element={<StudentLayout />}>
                            <Route index element={<Profile />} /> {/* Default to Profile */}
                            <Route path="profile" element={<Profile />} />
                            <Route path="books" element={<AllBooks />} />
                            <Route path="browse-udc" element={<UDCBrowse />} />
                            <Route path="books/:id" element={<BookDetails />} />
                            <Route path="mybooks" element={<MyBooks />} />

                        </Route>

                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminProfile />} />
                            <Route path="dashboard" element={<AdminProfile />} /> {/* Redirect Dashboard to Profile or keep legacy */}
                            <Route path="profile" element={<AdminProfile />} />
                            <Route path="books" element={<AllBooks />} /> {/* Reusing for now */}
                            <Route path="books/:id" element={<BookDetails />} />
                            <Route path="add-book" element={<AddBookObj />} />
                            <Route path="manage-books" element={<ManageBooks />} />
                            <Route path="students" element={<ManageStudents />} />
                            <Route path="remove-book" element={<RemoveBook />} />
                            <Route path="issue-book" element={<IssueBook />} />
                            <Route path="return-book" element={<ReturnBook />} />
                            <Route path="return-book" element={<ReturnBook />} />

                            <Route path="reports" element={<Reports />} />
                            <Route path="history" element={<TransactionHistory />} />
                            <Route path="requests" element={<AdminRequests />} />
                            <Route path="feedback" element={<AdminFeedback />} />
                        </Route>
                    </Routes>
                </Router>
            </NotificationProvider>
        </ToastProvider>
    );
}

export default App;
