import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const useAuth = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const performLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:9000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.user); // Assuming response contains user data
        toast.success('Login successful!');
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const performRegister = async (email, password, fullName, role) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = { name: fullName, email, password, role };  // Include role in payload
      console.log('Request Payload:', payload);  // Log payload
      const response = await fetch('http://localhost:9000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('Response Data:', data);  // Log response data
      if (response.ok) {
        login(data.user); // Assuming response contains user data
        toast.success('Registration successful!');
      } else if (data.message === 'User already exists with this email') {
        setError('User already exists. Please sign in.');
        toast.info('User already exists. Please sign in.');
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { user, isLoading, error, performLogin, performRegister, logout, clearError };
};

export default useAuth;  // Ensure the hook is exported as default
