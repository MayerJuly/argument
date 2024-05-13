import axios from 'axios';

export const API_URL = 'http://localhost:8888/api';

const $api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

export default $api;
