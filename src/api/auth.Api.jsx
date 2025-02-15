const API_BASE_URL = 'https://capstone-backend-9xgc.onrender.com'; // Hardcoded backend URL

export const registerUser = async (name, email, password, role) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to register user');
  }
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to login user');
  }
  return data;
};
