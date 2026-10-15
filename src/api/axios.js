import axios from 'axios';

// Ready for the Node/Express + Prisma backend from the SRS.
// Until it exists, pages read from src/data/products.js.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fk-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
