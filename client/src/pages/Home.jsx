import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import bgGif from '../assets/background.gif';

function Home() {
  const splineViewerRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    };
  }, [])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@0.9.373/build/spline-viewer.js';
    script.type = 'module';
    document.body.appendChild(script);

    const viewer = document.createElement('spline-viewer');
    viewer.url = 'https://prod.spline.design/J-5YmKQhGuGSpgV3/scene.splinecode';
    viewer.style.width = '450px' 
    viewer.style.height = '350px' 

    if (splineViewerRef.current) {
      splineViewerRef.current.appendChild(viewer);
    }

    return () => {
      script.remove();
      viewer.remove();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-center font-dm-sans" 
      style={{ 
        backgroundImage: `url(${bgGif})`, 
        backgroundPosition: '-30% center', 
        backgroundSize: '120%',
      }}>
      <h1 className="mb-5 text-6xl font-bold text-white translate-y-[-10rem]">AI Baby Training Simulator</h1>
      <Link to="/create-baby">
      <div className='translate-y-[-5rem]' ref={splineViewerRef}></div>
      </Link>
    </div>
  );
}

export default Home;

