import React, { createContext, useState, useEffect } from 'react';
import axios from '../../_axios-programming-interface.js'
import { useAxios } from '../hooks/use-axios.jsx';

const userId = '11d6af03-20ac-4f04-a21c-28ec418a2c18';

const CategoryContext = createContext();
export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
 
  const addCategory = async (cat) => {
    await setCategories((prevState) => [...prevState, { cat }]);
  };
  const providerProps = { categories,setCategories, addCategory };

  return (
    <CategoryContext.Provider value={providerProps}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContext;

const useAxiosCreate = axios.create({
  BASEURL: 'api/category-api/', /* http://localhost:8081/ */
  timeout: 1000,
  headers: {}
  
})

