import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://msd-backend-crhk.onrender.com/api';

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth API calls
export const authAPI = {
  register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
  login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
  getProfile: () => axios.get(`${API_URL}/auth/me`, { headers: getAuthHeader() }),
  updateProfile: (data) => axios.put(`${API_URL}/auth/profile`, data, { headers: getAuthHeader() })
};

// Menu API calls
export const menuAPI = {
  getAllItems: () => axios.get(`${API_URL}/menu`),
  getItemById: (id) => axios.get(`${API_URL}/menu/${id}`),
  getByCategory: (category) => axios.get(`${API_URL}/menu/category/${category}`)
};

// Order API calls
export const orderAPI = {
  createOrder: (orderData) => axios.post(`${API_URL}/orders`, orderData, { headers: getAuthHeader() }),
  getMyOrders: () => axios.get(`${API_URL}/orders/my-orders`, { headers: getAuthHeader() }),
  getOrderById: (id) => axios.get(`${API_URL}/orders/${id}`, { headers: getAuthHeader() }),
  cancelOrder: (id) => axios.put(`${API_URL}/orders/${id}/cancel`, {}, { headers: getAuthHeader() })
};

export default { authAPI, menuAPI, orderAPI };
