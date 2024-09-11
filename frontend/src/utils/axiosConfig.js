import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:9000/api/v1',
  baseURL: 'https://api-verqen.vercel.app',
  withCredentials: true, // Allows sending cookies with requests
});

// Interceptors for handling requests and responses
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any custom headers or configurations here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
