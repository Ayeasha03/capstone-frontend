import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import useAuth from '../hooks/useAuth';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user');  // Default role is 'user'

  const { performLogin, performRegister, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await performLogin(email, password);
    } else {
      await performRegister(email, password, fullName, role);
      if (error === 'User already exists. Please sign in.') {
        setIsLogin(true);
        clearError();
      }
    }
    if (!error) {
      onClose();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
  };

  return (
    <Dialog isOpen={isOpen} onDismiss={onClose} aria-labelledby="dialog-title">
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
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
        </div>
      </div>
    </Dialog>
  );
};

export default AuthModal;
