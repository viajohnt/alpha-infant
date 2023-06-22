import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useUserStore from '../hooks/userStore';
import logo from '../assets/logo.png';
import defaultUserImg from '../assets/user.png';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

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
    <header className="flex items-center justify-between py-6 px-6 bg-darker-gray">
      <div className="logo">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-auto" />
          <span className="text-white text-3xl font-bold ml-2">ALPHA INFANT</span>
        </Link>
      </div>
      <nav>
        {user ? (
          <div className="flex items-center space-x-4 text-white">
            <Link
              to="/alpha-infant"
              className={`mr-auto text-xl font-bold hover:underline  ${location.pathname === '/alpha-infant' ? 'underline' : ''}`}
              style={{ marginRight: '10rem' }}
            >
              Train Infant
            </Link>
            <img className="rounded-full h-10 w-10" src={user.avatar_url || defaultUserImg} alt="User" />
            <span>@{user.username}</span>
            <button onClick={() => setShowDropdown(!showDropdown)}>
              &#9660; 
            </button>
            {showDropdown && (
              <div className="absolute mt-[7rem] translate-x-[18rem] bg-white text-black shadow-lg rounded-lg">
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
