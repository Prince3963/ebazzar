import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Headers/Header';
import Navbar from './components/Headers/Navbar';
import { Footer } from './components/Footers/Footer';
import { Contact } from './components/Footers/Contact';
import Home from './components/Headers/Home';

import Login from './components/Authentications/Login';
import Sidebar from './components/Admin/Sidebar';
import Product from './components/Admin/Product/Product';
import Dashboard from './components/Admin/Dashboard';
import LandingPage from './components/LandingPage';
import Coustomer from './components/Admin/Coustomer/Customer';
import About from './components/Headers/About';
import Order from './components/Admin/Order';
import Register from './components/Authentications/Register';
import UserDashboard from './components/User/UserDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        
        <Navbar />
        <Header />
        
          <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path='/user/userDashboard' element={<UserDashboard/>}/>

            {/* Admin Routes */}
            
            <Route path='/admin/sidebar'element={<Sidebar />}/>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path='/admin/order' element={<Order />}/>
            <Route path="/admin/coustomer" element={<Coustomer />} />
          </Routes>
      
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
