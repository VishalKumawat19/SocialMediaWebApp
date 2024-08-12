import axiosInstance from '../utils/axiosConfig';
import { PROFILE_ROUTES } from '../utils/constants';


export const createProfile = async (profileData) => {
  try {
    const response = await axiosInstance.post(PROFILE_ROUTES.CREATE, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data', // For image files
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};


export const getProfile = async () => {
  try {
    const response = await axiosInstance.get(PROFILE_ROUTES.GET);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put(PROFILE_ROUTES.UPDATE, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data', // For image files
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
