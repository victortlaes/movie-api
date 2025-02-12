import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // URL do seu Back-end Express
});

export default api;