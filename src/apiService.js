import axios from 'axios';

const API_BASE_URL = 'https://model-microserve.onrender.com'; // Backend URL

const api = axios.create({
baseURL: API_BASE_URL,
withCredentials: true, // Important for sending cookies (if using cookie-based auth)
});

// Request interceptor - automatically add the access token to every request
api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error); // Handle request errors
    }
  );


// Response interceptor - handle 401 errors and refresh token
api.interceptors.response.use(
    (response) => {
      return response; // Return successful responses
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite loop
        try {
          const refreshResponse = await refreshAccessToken();
          const newAccessToken = refreshResponse.data.access_token;
          localStorage.setItem('access_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Update header for retry
          return api(originalRequest); // Retry the original request with new token
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
          // Handle refresh failure (e.g., redirect to login)
          localStorage.removeItem('access_token'); // Clear tokens
          localStorage.removeItem('refresh_token'); // Clear refresh token too if stored in localStorage
          window.location.href = '/login'; // Redirect to login
          return Promise.reject(refreshError); // Reject refresh error
        }
      }
      return Promise.reject(error); // Reject other errors
    }
  );
  

export const registerUser = async (userData) => {
return api.post('/register', userData);
};

export const loginUser = async (credentials) => {
return api.post('/login', credentials);
};

export const getDashboardData = async () => {
return api.get('/dashboard'); // Protected endpoint
};

export const refreshAccessToken = async () => {
return api.post('/refresh'); // Refresh endpoint
};

export default api; // Export axios instance for interceptors later

