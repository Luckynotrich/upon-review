import axios from 'axios';
// const BASE_URL = 'http://localhost:8081';

export default axios.create({
    baseURL: (import.meta.env.SNOWPACK_PUBLIC_BASE_URL),
    timeout: 1000,
    headers: {'Content-Type': 'multipart/form-data'}

});
