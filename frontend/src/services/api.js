import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tb_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTemples = async (params = {}) => {
  try {
    const response = await api.get('/temples', { params });
    return response.data;
  } catch (error) {
    console.error('API fetchTemples error:', error);
    throw error;
  }
};

export const fetchFeaturedTemples = async () => {
  try {
    const response = await api.get('/temples/featured');
    return response.data;
  } catch (error) {
    console.error('API fetchFeaturedTemples error:', error);
    throw error;
  }
};

export const fetchTempleBySlugOrId = async (idOrSlug) => {
  try {
    const response = await api.get(`/temples/${idOrSlug}`);
    return response.data;
  } catch (error) {
    console.error('API fetchTempleBySlugOrId error:', error);
    throw error;
  }
};

export const fetchFilterOptions = async () => {
  try {
    const response = await api.get('/temples/filters');
    return response.data;
  } catch (error) {
    console.error('API fetchFilterOptions error:', error);
    return { states: [], cities: [], deities: [], circuits: [] };
  }
};

export const fetchCircuits = async () => {
  try {
    const response = await api.get('/circuits');
    return response.data;
  } catch (error) {
    console.error('API fetchCircuits error:', error);
    throw error;
  }
};

export const fetchStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('API fetchStats error:', error);
    return {
      totalTemples: 8,
      approvedTemples: 8,
      pendingTemples: 0,
      statesCount: 6,
      circuitsCount: 3,
      activeUsersEstimate: 24500,
      searchSuccessRate: '98.4%',
    };
  }
};

export const loginAdmin = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const createTempleAdmin = async (templeData) => {
  const response = await api.post('/temples', templeData);
  return response.data;
};

export const updateTempleAdmin = async (id, templeData) => {
  const response = await api.put(`/temples/${id}`, templeData);
  return response.data;
};

export const deleteTempleAdmin = async (id) => {
  const response = await api.delete(`/temples/${id}`);
  return response.data;
};

export const approveTempleAdmin = async (id, isApproved) => {
  const response = await api.patch(`/temples/${id}/approve`, { isApproved });
  return response.data;
};

export const seedDatabaseAdmin = async () => {
  const response = await api.post('/seed');
  return response.data;
};

export default api;
