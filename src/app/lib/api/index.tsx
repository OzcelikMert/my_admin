import axios from 'axios';

const API = axios.create({
    baseURL: `../../services/`
});

export default API;