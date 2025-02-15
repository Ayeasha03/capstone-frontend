import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import 'react-modal';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>  {/* Router must wrap AuthProvider */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>
);
