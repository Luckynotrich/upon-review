import axios from 'axios';

const SendData = axios.create({
    baseURL: 'http://localhost:8081',//(import.meta.env.VITE_PUBLIC_BASE_URL),//
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const getCats = async (userId) => {
    const response = await axios.get('http://localhost:8081/api/category-api/' + userId);
    return await response.data;
}
export const getRevs = async (userId) => {
    const response = await axios.get('http://localhost:8081/api/review-api/' + userId);
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
    // console.log("data ", data);
    const response = await SendData.put('api/category-api/updateOne/?', data);
    return await response.data;
}

export const deleteReview = async (id) => {
    console.log('id ',id)
    const response = await axios.delete('http://localhost:8081/api/review-api/delete/' + id);
    return await response.data;
}
// export const deleteReview = async (data) => {
//     console.log('id ',id)
//     const response = await SendData.delete('api/review-api/delete/', data);
//     return await response.data;
// }

export default SendData;