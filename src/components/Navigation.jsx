import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ user, logout, setShowAuthModal }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="space-x-6">
      {user ? (
        <>
          <button
            onClick={() => navigate('/profile')}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setShowAuthModal(true)}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </>
      )}
    </div>
  );
};

export default Navigation;
