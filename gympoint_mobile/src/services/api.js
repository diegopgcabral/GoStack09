import axios from 'axios';

const api = axios.create({
  // Direto do celular
  // Trabalho
  // baseURL: 'http://192.168.0.53:3333',
  // Casa
  baseURL: 'http://192.168.25.166:3333',
  // Android Studio
  // baseURL: 'http://10.0.2.2:3333',
  // Genymotion
  // baseURL: 'http://10.0.3.2:3333',
});

export default api;
