import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { toast } from 'react-toastify';
import logo from '../Assets/logo (2).png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const { cartItems, setCartItems } = useContext(ShopContext);
  const { user, loggedIn, setLoggedIn, setUser, setRole, role } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const yes = window.confirm('Are you sure you want to logout?');
    if (yes) {
      setLoggedIn(false);
      setUser(null);
      setRole(null);
      setCartItems([]);
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      navigate('/');
      toast('Logged out successfully');
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} style={{ width: '50px' }} alt="" />
        <p>Trust Cosmetic</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu('home');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/">
            Home
          </Link>
          {menu === 'home' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('new');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/new">
            New
          </Link>
          {menu === 'new' ? <hr /> : <></>}{' '}
        </li>
        <li
          onClick={() => {
            setMenu('makeup product');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/makeup">
            Makeup Product
          </Link>
          {menu === 'makeup product' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('skin care');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/skin-care">
            Skin Care
          </Link>
          {menu === 'skin care' ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/cart">
          <img style={{ width: 28, height: 28 }} src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{cartItems.length}</div>
        {loggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              style={{ marginRight: 10 }}
              to={role === 'buyer' ? '/orders' : '/admin/dashboard'}
            >
              {role === 'buyer' ? 'Orders' : 'Admin Dashboard'}
            </Link>
            {role === 'buyer' && (
              <img
                className="user-avatar"
                alt={user?.name}
                src={`https://ui-avatars.com/api/?name=${user?.name.split(
                  ' ',
                )}&background=ee1e7e&length=1&color=fff`}
              />
            )}
            <span className="logout-button" onClick={handleLogout}>
              Logout
            </span>
          </div>
        ) : (
          <Link style={{ textDecoration: 'none' }} to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
