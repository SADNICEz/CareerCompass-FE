import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="navbar">
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