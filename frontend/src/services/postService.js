import axiosInstance from '../utils/axiosConfig';
import { POST_ROUTES } from '../utils/constants';

export const createPost = async (postData) => {
  try {
    const response = await axiosInstance.post(POST_ROUTES.CREATE, postData, {
      headers: {
        'Content-Type': 'multipart/form-data', // For image files
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};


export const getUserPosts = async () => {
  try {
    const response = await axiosInstance.get(POST_ROUTES.GET_USER_POSTS);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get(POST_ROUTES.GET_ALL);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(POST_ROUTES.DELETE(postId));
    return response;
  } catch (error) {
    return error.response;
  }
};
