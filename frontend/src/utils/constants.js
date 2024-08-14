
export const API_BASE_URL = 'https://api-verqen.vercel.app/api/v1'

// Auth API routes
export const AUTH_ROUTES = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`
};

// Post API routes
export const POST_ROUTES = {
  CREATE: `${API_BASE_URL}/posts/post`,
  GET_USER_POSTS: `${API_BASE_URL}/posts/post`,
  GET_ALL: `${API_BASE_URL}/posts/all`,
  DELETE: (postId) => `${API_BASE_URL}/posts/post/${postId}`,
};

// Profile API routes
export const PROFILE_ROUTES = {
  CREATE: `${API_BASE_URL}/profile`,
  GET: `${API_BASE_URL}/profile`,
  UPDATE: `${API_BASE_URL}/profile`,
};
