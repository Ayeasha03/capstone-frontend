import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import useAuth from '../hooks/useAuth';
import { registerUser, loginUser } from '../api/auth.Api';

// Set the app element for accessibility
Modal.setAppElement('#root');

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user');  // Default role is 'user'

  const { login, isLoading, error, setError, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await loginUser(email, password);
        login(data.user, data.token);
      } else {
        const data = await registerUser(fullName, email, password, role);
        login(data.user, data.token);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h2 className="text-2xl font-bold mb-6">
        {isLogin ? 'Sign In' : 'Create Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          <Button type="button" className="w-full" onClick={toggleMode}>
            {isLogin ? 'Create an Account' : 'Sign In Instead'}
          </Button>
        </div>
      </form>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default AuthModal;
