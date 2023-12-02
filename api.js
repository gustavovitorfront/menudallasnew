import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  auth: {
    username: 'testserver',
    password: 'testserver'
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    accept: 'application/json',
    'Content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default api;
