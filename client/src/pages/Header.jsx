import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../hooks/userStore';
import logo from '../assets/logo.png';
import defaultUserImg from '../assets/user.png';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('api/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 204) {
        setUser(null);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex items-center justify-between py-6 px-6 bg-gray-900">
      <div className="logo">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-auto" />
          <span className="text-white text-2xl font-bold ml-2">ALPHA INFANT</span>
        </Link>
      </div>
      <nav>
        {user ? (
          <div className="flex items-center space-x-4 text-white">
            <img className="rounded-full h-8 w-8" src={user.avatar_url || defaultUserImg} alt="User" />
            <span>@{user.username}</span>
            <button onClick={() => setShowDropdown(!showDropdown)}>
              &#9660; {/* This is a unicode downward arrow, you can replace it with your dropdown image */}
            </button>
            {showDropdown && (
              <div className="absolute mt-2 bg-white text-black shadow-lg rounded-lg">
                <button className="block px-4 py-2" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4 text-white">
            <img className="rounded-full h-8 w-8" src={defaultUserImg} alt="Default User" />
            <Link
              to="/login"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
