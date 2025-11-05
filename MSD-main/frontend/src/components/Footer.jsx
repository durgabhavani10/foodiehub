import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section brand-section">
          <h3>🍴 FoodieHub</h3>
          <p>Delicious food delivered fast to your doorstep. Quality meals, exceptional service!</p>
          <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/menu" className="footer-link">Menu</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/cart" className="footer-link">Cart</Link></li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/menu#biryanis" className="footer-link">Biryanis</Link></li>
            <li><Link to="/menu#mandis" className="footer-link">Mandis</Link></li>
            <li><Link to="/menu#cool-drinks" className="footer-link">Cool Drinks</Link></li>
            <li><Link to="/menu#fast-foods" className="footer-link">Fast Foods</Link></li>
            <li><Link to="/menu#cakes" className="footer-link">Cakes</Link></li>
            <li><Link to="/menu#chocolates" className="footer-link">Chocolates</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📧 info@foodiehub.com</p>
          <p>📞 +91 123-456-7890</p>
          <p>📍 Hyderabad, India</p>
          <p>⏰ Open: 9 AM - 11 PM</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} FoodieHub. All rights reserved. | Made with ❤️ by Shaik Abeda Begum & Anand Kumar</p>
      </div>
    </footer>
  );
};

export default Footer;
