import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈
import './Navbar.css'


const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">🏋️‍♂️ GymBros</div>
      <ul className="nav-links">
        <li><Link to="/">Ana Sayfa</Link></li>
        <li><Link to="/calendar">Takvim</Link></li>
        {isLoggedIn ? (
          <li><button onClick={handleLogout}>Çıkış Yap</button></li>
        ) : (
          <li><Link to="/">Giriş Yap</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
