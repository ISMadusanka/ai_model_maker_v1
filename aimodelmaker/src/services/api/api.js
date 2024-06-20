import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the authorization token to headers
api.interceptors.request.use(
  config => {
    // Optionally add any custom logic here
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Optionally add any custom logic here
    return Promise.reject(error);
  }
);

export default api;
