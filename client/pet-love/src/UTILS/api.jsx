import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Use 'https://' se disponível
});

export default api;
