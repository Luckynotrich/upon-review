import axios from 'axios';
const BASE_URL = 'http://localhost:8081';

export default axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {'Content-Type': 'multipart/form-data'}

});
