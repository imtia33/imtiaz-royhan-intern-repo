import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
});

const activeRequests = new Map();

api.interceptors.request.use(
  (config) => {
    const requestId = `req_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    config.headers['X-Request-ID'] = requestId;
    
    const controller = new AbortController();
    config.signal = controller.signal;
    
    activeRequests.set(requestId, controller);
    
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const requestId = response.config.headers['X-Request-ID'];
    activeRequests.delete(requestId);
    
    return response;
  },
  (error) => {
    if (error.config && error.config.headers) {
      const requestId = error.config.headers['X-Request-ID'];
      activeRequests.delete(requestId);
    }
    
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      console.error('Request timeout or network error');
    }
    
    return Promise.reject(error);
  }
);

export const cancelRequest = (requestId) => {
  const controller = activeRequests.get(requestId);
  if (controller) {
    controller.abort();
    activeRequests.delete(requestId);
  }
};

export const cancelAllRequests = () => {
  activeRequests.forEach(controller => controller.abort());
  activeRequests.clear();
};

export default api;