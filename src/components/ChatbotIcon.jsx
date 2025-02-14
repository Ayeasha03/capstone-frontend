import React, { useState } from 'react';
import { AiOutlineRobot } from 'react-icons/ai';
import Chatbot from './Chatbot'; // Ensure this path is correct

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full cursor-pointer shadow-lg"
        onClick={toggleChatbot}
      >
        <AiOutlineRobot size={24} />
      </div>
      {isOpen && <Chatbot />}
    </>
  );
};

export default ChatbotIcon;
