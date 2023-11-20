import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8081',//(import.meta.env.SNOWPACK_PUBLIC_BASE_URL),//
    // timeout: 1000,
    // headers: { 'Content-Type': 'multipart/form-data' }
});

export const getCats = async (userId) => {
    const response = await axios.get('/api/category-api/' + userId);
    return response.data;
}
export const getRevs = async (userId) => {
    const response = await axios.get('/api/review-api/' + userId);
    return response.data;
}

