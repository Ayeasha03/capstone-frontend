import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { registerUser, loginUser } from '../api/auth.Api'; // Import your new functions

const useAuth = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const performLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      login({ ...data.user, token: data.token }); // Pass the token as well
      toast.success('Login successful!');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const performRegister = async (email, password, fullName, role) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await registerUser(fullName, email, password, role); // Use new function
      login({ ...data.user, token: data.token }); // Pass the token as well
      toast.success('Registration successful!');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { user, isLoading, error, performLogin, performRegister, logout, clearError };
};

export default useAuth;
