import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5005/api',
  headers: {
    'Content-Type': 'Application/json',
  },
});

export default apiClient;
