import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleCreateBaby = () => {
    navigate('/create-baby');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-gray text-white font-dm-sans">
      <h1 className="mb-5 text-2xl font-semibold">Welcome to the AI Baby Training Simulator</h1>
      <button 
        onClick={handleCreateBaby}
        className="px-6 py-3 font-bold text-white bg-bloo rounded-full hover:bg-blue-800 transition duration-200"
      >
        Create Infant
      </button>
    </div>
  );
}

export default Home;
