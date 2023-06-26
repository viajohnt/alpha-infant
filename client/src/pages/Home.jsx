import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgGif from '../assets/background.gif';
import useUserStore from '../hooks/userStore';

function Home() {
  const splineViewerRef = useRef(null);
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@0.9.373/build/spline-viewer.js';
    script.type = 'module';
    document.body.appendChild(script);

    const viewer = document.createElement('spline-viewer');
    viewer.url = 'https://prod.spline.design/J-5YmKQhGuGSpgV3/scene.splinecode';
    viewer.style.width = '450px';
    viewer.style.height = '350px';

    if (splineViewerRef.current) {
      splineViewerRef.current.appendChild(viewer);
    }

    return () => {
      script.remove();
      viewer.remove();
    };
  }, []);

  const handleCreateBaby = () => {
    if (user) {
      // User is signed in, navigate to create baby page
      navigate('/create-baby');
    } else {
      // User is not signed in, display error message
      setErrorMessage('You must be signed in to create a baby');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-center font-dm-sans"
      style={{
        backgroundImage: `url(${bgGif})`,
        backgroundPosition: '-30% center',
        backgroundSize: '120%',
      }}
    >
      <h1 className="mb-5 text-6xl text-white translate-y-[-10rem]">AI Baby Training Simulator</h1>
      {errorMessage && (
        <p className="text-red-500 mb-3 text-2xl">{errorMessage}</p>
      )}
      <button onClick={handleCreateBaby} className="translate-y-[-5rem]">
        <div ref={splineViewerRef}></div>
      </button>
    </div>
  );
}

export default Home;

