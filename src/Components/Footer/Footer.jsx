import React from 'react';
import './Footer.css';
import logo from '../Assets/logo (2).png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} style={{ width: '50px' }} alt="" />
        <p>Trust Cosmetic</p>
      </div>
      <ul className="footer-links">
        <li>
          <Link style={{ textDecoration: 'none' }} to="/signup">
            {' '}
            Product
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: 'none' }} to="/signup">
            {' '}
            Services
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: 'none' }} to="/signup">
            {' '}
            About us{' '}
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: 'none' }} to="/contactus">
            {' '}
            Contact us{' '}
          </Link>
        </li>
      </ul>
      <div className="footer-socail-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pintester_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024Trust Cosmetic</p>
      </div>
    </div>
  );
};

export default Footer;
