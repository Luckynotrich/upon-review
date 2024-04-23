import axios from 'axios';
const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL

const SendData = axios.create({
    baseURL: baseUrl,//'http://localhost:8081',//
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const getCats = async (userId) => {
    const response = await axios.get(baseUrl+ '/api/category-api/' + userId);
    return await response.data;
}
export const getRevs = async (userId) => {
    const response = await axios.get( baseUrl+'/api/review-api/' + userId);
    return await response.data;
}
// wouldn't return response to interface
// export const createCat = async (data) => {
//     const response = await SendData.post('api/category-api/addNew/?', data);
//     let category = await response.data;
//     console.log("category ", category);
//     return await response.data;
// }
export const updateCat = async (data) => {
    const response = await SendData.put( 'api/category-api/updateOne/?', data);
    return await response.data;
}

export const deleteReview = async (id) => {
    console.log('id ',id)
    const response = await axios.delete( baseUrl+'/api/review-api/delete/' + id);
    return await response.data;
}

export const deleteCategory = async (id) => {
    console.log('id ',id)
    const response = await axios.delete(baseUrl+'/api/category-api/delete/' + id);
    return await response.data;
}
export const logout = async (id) => {
    const response = await axios.get(baseUrl+'/')
}
export default SendData;