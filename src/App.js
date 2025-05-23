import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Headers/Header';
import Navbar from './components/Headers/Navbar';
import { Footer } from './components/Footers/Footer';

import Home from './components/Headers/Home';

import Login from './components/Authentications/Login';
import Sidebar from './components/Admin/Sidebar';
import Product from './components/Admin/Product/Product';
import Dashboard from './components/Admin/Dashboard';
import LandingPage from './components/LandingPage';
import Customer from './components/Admin/Coustomer/Customer'; // Corrected "Coustomer" to "Customer"
import About from './components/Headers/About';
import Order from './components/Admin/Order';
import Register from './components/Authentications/Register';
import UserDashboard from './components/User/UserDashboard';
import Profile from './components/Headers/Profile';
import ForgotPassword from './components/Authentications/ForgotPassword'
import ResetPassword from './components/Authentications/ResetPassword'
import Electronic from './components/User/Electronic';

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

function AppContent() {
  // Utility to get cookie value
  const getCookie = (userCookie) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${userCookie}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Check if user is logged in
  const validAuth = () => {
    const userToken = getCookie("token");
    return userToken !== null;
  };

  const isLoggedIn = validAuth();

  // PublicRoute
  const PublicRoute = ({ element }) => {
    return !isLoggedIn ? element : <Navigate to="/user/userDashboard" />;
  };

  // PrivateRoute
  const PrivateRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/" />;
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path='/' element={<PublicRoute element={<UserDashboard />} />} />
        <Route path="/home" element={<PublicRoute element={<Home />} />} />
        <Route path="/about" element={<PublicRoute element={<About />} />} />
        <Route path="/profile" element={<PublicRoute element={<Profile />} />} />
        <Route path="/electronic" element={<PublicRoute element={<Electronic />} />} />

        {/* Authentication */}
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/forgotPassword" element={<PublicRoute element={<ForgotPassword />} />} />
        <Route path="/resetPassword" element={<PublicRoute element={<ResetPassword />} />} />

        {/* User Pages */}
        <Route path="/user/userDashboard" element={<PrivateRoute element={<UserDashboard />} />} />

        {/* Admin Pages */}
        <Route path="/admin/sidebar" element={<PublicRoute element={<Sidebar />} />} />
        <Route path="/admin" element={<PublicRoute element={<Dashboard />} />} />
        <Route path="/admin/product" element={<PublicRoute element={<Product />} />} />
        <Route path="/admin/order" element={<PublicRoute element={<Order />} />} />
        <Route path="/admin/customer" element={<PublicRoute element={<Customer />} />} />

        
        
      </Routes>      
      <Footer />
    </>
  );
}

export default App;
