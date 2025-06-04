import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Headers/Navbar';
import Footer from './components/Footers/Footer';
import Home from './components/Headers/Home';
import Login from './components/Authentications/Login';
import Sidebar from './components/Admin/Sidebar';
import Product from './components/Admin/Product/Product';
import Dashboard from './components/Admin/Dashboard';
import LandingPage from './components/User/LandingPage';
import Customer from './components/Admin/Coustomer/Customer';
import About from './components/Headers/About';
import Order from './components/Admin/Order';
import Register from './components/Authentications/Register';
import UserDashboard from './components/User/UserDashboard';
import UserProfile from './components/Headers/UserProfile';
import ForgotPassword from './components/Authentications/ForgotPassword';
import ResetPassword from './components/Authentications/ResetPassword';
import Electronic from './components/User/Electronic';
import ProductDetails from './components/User/ProductDetails';
import TermsOfService from './components/Footers/TermsOfService';
import PrivacyPolicy from './components/Footers/PrivacyPolicy';
import Disclaimer from './components/Footers/Disclaimer';
import AppDownload from './components/Footers/AppDownload';
import Contact from './components/Footers/Contact';
import Cart from './components/Headers/Cart.js';
import { useEffect, useState } from 'react';
//ReactPrime 
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';                  // Core Styles
import 'primeicons/primeicons.css';                                // Icons
import Cloth from './components/User/Cloth.js';


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
  const locationPath = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get token from cookie
  const getCookie = (cookieName) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Dynamically check for token on route change
  useEffect(() => {
    const token = getCookie("token");
    setIsLoggedIn(!!token); // true if token exists
  }, [locationPath]);

  // Public route logic
  const PublicRoute = ({ element }) => {
    return !isLoggedIn ? element : <Navigate to="/user/userDashboard" />;
  };

  // Private route logic
  const PrivateRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/" />;
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<PublicRoute element={<LandingPage />} />} />
        <Route path="/home" element={<PublicRoute element={<Home />} />} />
        <Route path="/order" element={<PublicRoute element={<Order />} />} />
        <Route path="/terms" element={<TermsOfService />}  />
        <Route path="/privacy" element={<PrivacyPolicy />}  />
        <Route path="/disclaimer" element={<Disclaimer />}  />
        <Route path="/app" element={<AppDownload />}  />
        <Route path="/contact" element={<Contact />}  />
        <Route path="/about" element={<About />}  />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/electronic" element={<Electronic />} />
        <Route path="/cloth" element={<Cloth />} />

        {/* Authentication */}
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/forgotPassword" element={<PublicRoute element={<ForgotPassword />} />} />
        <Route path="/resetPassword" element={<PublicRoute element={<ResetPassword />} />} />

        {/* User Pages */}
        <Route path="/user/userDashboard" element={<PrivateRoute element={<UserDashboard />} />} />
        <Route path="/profile" element={<PrivateRoute element={<UserProfile />} />} />
        <Route path="/product/:id" element={<ProductDetails />} />

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
