import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useUserStore from '../hooks/userStore'
import logo from '../assets/logo.png'
import defaultUserImg from '../assets/user.png'

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const { user, setUser } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(!!document.fullscreenElement)
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    };
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('api/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 204) {
        setUser(null)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  };

  const toggleFullScreen = () => {
    if (fullScreen) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
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
              className={`text-xl font-bold hover:underline mr-[15rem]  ${location.pathname === '/alpha-infant' ? 'underline' : ''}`}
            >
              Train Infant
            </Link>
            <div>
              <button onClick={toggleFullScreen} className="px-2 py-1 bg-gray-700 text-white rounded mr-16">
                {fullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
            </div>
            <img className="rounded-full h-10 w-10" src={user.avatar_url || defaultUserImg} alt="User" />
            <span>@{user.username}</span>
            <button onClick={() => setShowDropdown(!showDropdown)}>
              &#9660; 
            </button>
            {showDropdown && (
              <div className="absolute mt-[7rem] translate-x-[35rem] bg-white text-black shadow-lg rounded-lg">
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

export default Header
