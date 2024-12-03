import { boot } from 'quasar/wrappers';
import axios from 'axios';
import VueSocialSharing from 'vue3-social-sharing';

// Create an axios instance with a base URL
const api = axios.create({ baseURL: 'http://127.0.0.1:8000' });

export default boot(({ app }) => {
  // Set axios and api to global properties (for Vue 3)
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  // Set up axios interceptor
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('s_access_token')?.split('|').pop();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Use VueSocialSharing plugin
  app.use(VueSocialSharing);
});

// Export both axios and the custom api instance
export { axios, api };
