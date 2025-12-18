import api from './api.js';

export const login = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tenantId');
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};
