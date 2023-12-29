import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  // baseURL: 'http://localhost:5005/api',
  headers: {
    'Content-Type': 'Application/json',
  },
});

export default apiClient;
