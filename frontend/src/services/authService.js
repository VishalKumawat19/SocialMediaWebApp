import axiosInstance from '../utils/axiosConfig';
import { AUTH_ROUTES } from '../utils/constants';

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post(AUTH_ROUTES.REGISTER, userData);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(AUTH_ROUTES.LOGIN, credentials);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get(AUTH_ROUTES.LOGOUT);
    return response;
  } catch (error) {
    return error.response;
  }
};
