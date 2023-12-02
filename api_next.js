import axios from 'axios';

const api_next = axios.create({
  baseURL: '/api',
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

api_next.interceptors.request.use((config) => {
  const profile = localStorage.getItem('@menu-digital:profile');

  if (profile) {
    let profileData = JSON.parse(profile);
    config.headers['X-Profile'] = profileData?.id;
  }

  return config;
});


export default api_next;
