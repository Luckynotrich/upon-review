import axios from 'axios';

export const getCats = async (userId) => {
    const response = await axios.get( `/api/category-api/` + userId);
    return await response.data;
}
export const getRevs = async (userId) => {
    const response = await axios.get( `/api/review-api/` + userId);
    return await response.data;
}
export const updateCat = async (data) => {
    const response = await axios.put(`api/category-api/updateOne/?`,data, {headers: { 'Content-Type': 'multipart/form-data' }})
    return await response.data;
}

export const deleteReview = async (id) => {
    const response = await axios.delete( `/api/review-api/delete/` + id);
    return await response.data;
}

export const deleteCategory = async (id) => {
    const response = await axios.delete(`/api/category-api/delete/` + id);
    return await response.data;
}
