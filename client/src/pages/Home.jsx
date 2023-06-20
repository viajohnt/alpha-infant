import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleCreateBaby = () => {
    navigate('/create-baby');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-dm-sans">
      <h1 className="mb-5 text-2xl font-semibold">Welcome to the AI Baby Training Simulator</h1>
      <button 
        onClick={handleCreateBaby}
        className="px-6 py-3 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-400 active:bg-blue-600 transition duration-200"
      >
        Create Infant
      </button>
    </div>
  );
}

export default Home;
