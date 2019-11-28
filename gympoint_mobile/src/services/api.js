import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.53:3333',
  // baseURL: 'http://10.0.2.2:3333', Android Studio
  baseURL: 'http://10.0.3.2:3333', // Genymotion,
});

export default api;
