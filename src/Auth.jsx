import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(location.pathname === '/register');
  }, [location]);

  const toggleForm = () => {
    if (isActive) navigate('/login');
    else navigate('/register');
  };

  return (
    <div className={`auth-container ${isActive ? 'active' : ''}`}>
      <div className="info-side">
        <div className="info-content login-msg">
          <h1>Hello,<br />Welcome!</h1>
        </div>
        <div className="info-content register-msg">
          <h1>Hello,<br />Let's Start!</h1>
        </div>
      </div>

      <div className="form-side">
         <div className="form-box login-form">
            <h2>Login</h2>
            <form>
                <div className="input-group animation" style={{ "--li": 1 }}>
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="input-group animation" style={{ "--li": 2 }}>
                    <input type="password" placeholder="Password" required />
                </div>
                <button className="btn animation" style={{ "--li": 3 }}>Login</button>
                <div className="footer-text animation" style={{ "--li": 4 }}>
                    <p>Don't have an account? <span onClick={toggleForm}>Let's create an account</span></p>
                </div>
            </form>
         </div>

         <div className="form-box register-form">
            <h2>Register</h2>
             <form>
                <div className="input-group animation" style={{ "--li": 1 }}>
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="input-group animation" style={{ "--li": 2 }}>
                    <input type="password" placeholder="Password" required />
                </div>
                 <div className="input-group animation" style={{ "--li": 3 }}>
                    <input type="password" placeholder="Confirm-password" required />
                </div>
                <div className="input-group animation" style={{ "--li": 4 }}>
                    <select required defaultValue="">
                        <option value="" disabled hidden>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button className="btn animation" style={{ "--li": 5 }}>Create Account</button>
                <div className="footer-text animation" style={{ "--li": 6 }}>
                    <p>Have an account? <span onClick={toggleForm}>Login</span></p>
                </div>
            </form>
         </div>
      </div>
    </div>
  );
}

export default Auth;