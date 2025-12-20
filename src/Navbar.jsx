import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  // เช็คว่าตอนนี้อยู่หน้า Auth (Login/Register) หรือไม่
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="navbar">
      {/* โลโก้: สีน้ำเงินเข้มเสมอ (ตามรูป) */}
      <Link to="/" className="nav-logo">
        CareerCompass
      </Link>
      <div className="nav-menu">
          <>
            <Link to="/login" className="btn-outline">Login</Link>
            <Link to="/register" className="btn-solid">Register</Link>
          </>
      </div>
    </nav>
  );
}

export default Navbar;