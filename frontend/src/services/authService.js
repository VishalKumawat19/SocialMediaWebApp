import axios from 'axios';

const API_URL = '/api/auth';

export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const register = async (username, email, password) => {
  return axios.post(`${API_URL}/register`, { username, email, password });
};

export const logout = async () => {
  return axios.post(`${API_URL}/logout`);
};
