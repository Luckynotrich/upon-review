import React, { createContext, useState, useEffect } from 'react';
// import axios from '../../utils/_axios-programming-interface.js'

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