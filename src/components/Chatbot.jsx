import React from 'react';
import useAuth from '../hooks/useAuth';

const Chatbot = () => {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-16 right-4 bg-white p-4 rounded-lg shadow-lg w-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Chatbot</h3>
        <button onClick={() => window.alert('Close Chatbot')}>
          ✖
        </button>
      </div>
      <p>
        Hi {user ? user.full_name : 'there'}! How can I help you today?
      </p>
      {/* Chatbot message and response logic here */}
    </div>
  );
};

export default Chatbot;
