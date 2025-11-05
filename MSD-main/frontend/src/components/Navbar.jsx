import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🍴</span>
          <span className="logo-text">FoodieHub</span>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation links */}
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="navbar-link" onClick={closeMenu}>🏠 Home</Link></li>
          <li><Link to="/menu" className="navbar-link" onClick={closeMenu}>📋 Menu</Link></li>
          <li><Link to="/about" className="navbar-link" onClick={closeMenu}>ℹ️ About Us</Link></li>
          <li><Link to="/cart" className="navbar-link" onClick={closeMenu}>🛒 Cart</Link></li>
          {isLoggedIn && (
            <li><Link to="/my-orders" className="navbar-link" onClick={closeMenu}>📦 My Orders</Link></li>
          )}
        </ul>

        {/* Auth section */}
        <div className="navbar-auth">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-signup" onClick={closeMenu}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
