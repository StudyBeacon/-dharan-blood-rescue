import api from './api';

// Login function
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Register function (optional)
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};
