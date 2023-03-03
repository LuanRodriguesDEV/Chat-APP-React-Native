import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.18.99:5295/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-origem': 'mobile'
  }
});

export default api;


