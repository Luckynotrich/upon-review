import React, { createContext, useContext, useState } from 'react';

import UserContext from './user-context';

const CategoryContext = createContext(); 

export const CategoryContextProvider = ({ children }) => {
  const { userId } = useContext(UserContext);


  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState();

  const addCategory = async ({ name, id, userId }) => {
    await setCategories((prevState) => [...prevState, { name, id, userId }]);
    await console.log('category-context::Added ', categories);
  };
  const categoryIndexOf = (id) => {
    // console.log('category-context::categoryIndexOf ', id.catId);
    let index = categories.findIndex((cat) => cat.id === id);
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
//Brower says: either useQuery is not a function or its return value is not iterable. why is the getCats function is not being called?
// That line is already in the file. I'm not sure why it's not working. I'll try to figure it out.Ok
