import axios from 'axios';

const baseURL = 'https://myapp-backend.adaptable.app';

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
