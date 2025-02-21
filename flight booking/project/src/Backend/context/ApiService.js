import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend URL

const ApiService = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach Token for Authenticated Requests
ApiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default ApiService;
