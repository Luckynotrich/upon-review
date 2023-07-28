import React, { createContext, useContext,useState, useEffect } from 'react';

import UserContext from './user-context';
import getCategories from '../get-categories';

const CategoryContext = createContext();
export const CategoryContextProvider = ({ children }) => {
  const { userId } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
 
  const addCategory = async (cat) => {
    await setCategories((prevState) => [...prevState, { cat }]);
  };
  const refreshCategories = async () => {
    setCategories(getCategories(userId));
  }
  const providerProps = { categories,setCategories, addCategory, refreshCategories };

  return (
    <CategoryContext.Provider value={providerProps}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContext;