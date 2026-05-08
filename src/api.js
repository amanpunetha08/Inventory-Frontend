import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/')) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        try {
          const res = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh });
          localStorage.setItem('access_token', res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (e) {
          localStorage.clear();
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const login = (token) => api.post('/auth/google/', { token });

// Items
export const getItems = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v) query.append(k, v); });
  const qs = query.toString();
  return api.get(`/items/${qs ? `?${qs}` : ''}`);
};
export const createItem = (data) => api.post('/items/', data);
export const updateItem = (id, data) => api.put(`/items/${id}/`, data);
export const deleteItem = (id) => api.delete(`/items/${id}/`);
export const getStats = () => api.get('/items/stats/');
export const getDashboard = () => api.get('/dashboard/');
export const getExchangeRates = () => api.get('/exchange-rates/');

// Orders
export const getOrders = () => api.get('/orders/');
export const createOrder = (data) => api.post('/orders/', data);
export const updateOrder = (id, data) => api.put(`/orders/${id}/`, data);
export const deleteOrder = (id) => api.delete(`/orders/${id}/`);

// Suppliers
export const getSuppliers = () => api.get('/suppliers/');
export const createSupplier = (data) => api.post('/suppliers/', data);
export const updateSupplier = (id, data) => api.put(`/suppliers/${id}/`, data);
export const deleteSupplier = (id) => api.delete(`/suppliers/${id}/`);

// Categories
export const getCategories = () => api.get('/categories/');
export const createCategory = (data) => api.post('/categories/', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}/`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}/`);

// Warehouses
export const getWarehouses = () => api.get('/warehouses/');
export const createWarehouse = (data) => api.post('/warehouses/', data);
export const updateWarehouse = (id, data) => api.put(`/warehouses/${id}/`, data);
export const deleteWarehouse = (id) => api.delete(`/warehouses/${id}/`);

// Notifications
export const getNotifications = () => api.get('/notifications/');
export const markNotificationRead = (id) => api.post(`/notifications/${id}/read/`);
export const markAllNotificationsRead = () => api.post('/notifications/read-all/');

// Reports & Alerts
export const getReports = () => api.get('/reports/');
export const getAlerts = () => api.get('/alerts/');

export default api;
