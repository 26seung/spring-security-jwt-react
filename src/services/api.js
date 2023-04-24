import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  }, //  cors 통신
  withCredentials: true,
});

export default instance;
