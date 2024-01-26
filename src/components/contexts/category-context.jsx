import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext(); 

export const CategoryContextProvider = ({ children }) => {
  

  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState();

  const addCategory = async ({ name, id, userId }) => {
    await setCategories((prevState) => [...prevState, { name, id, userId }]);
    await console.log('category-context::Added ', categories);
  };
  const categoryIndexOf = (id,catName) => {
    
    let index
    id ? index = categories.findIndex((cat) => cat.id === id)
    : index = categories.findIndex((cat) => cat.name === catName)
    return index;
  };
  const updateCategory = async ({ id, userId, pros, cons }) => {
    let newCat = { id, userId, pros, cons };
    let newCategories = await categories.filter((cat) => cat.id !== id);
    await newCategories.push(newCat);
    await setCategories(newCategories);
    await console.log('category-context::Updated ', categories);
  };

  const providerProps = {
    categories,
    setCategories,
    addCategory,
    catId,
    setCatId,
    updateCategory,
    categoryIndexOf,
  };

  return (
    <CategoryContext.Provider value={providerProps}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContext;
