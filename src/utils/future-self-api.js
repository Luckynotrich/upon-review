import axios from 'axios';

const SendData = axios.create({
    baseURL: 'http://localhost:8081',//(import.meta.env.VITE_PUBLIC_BASE_URL),//
    timeout: 1000,
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const getCats = async (userId) => {
    const response = await axios.get('http://localhost:8081/api/category-api/' + userId);
    return response.data;
}
export const getRevs = async (userId) => {
    const response = await axios.get('http://localhost:8081/api/review-api/' + userId);
    return response.data;
}
 export const updateCat = async (data,catId) => {
    const response = await SendData.put('api/category-api/updateOne/?', {catId, data});
    return response.data;
 }
export default SendData;