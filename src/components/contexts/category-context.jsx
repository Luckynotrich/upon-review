import React, { createContext, useContext,useState} from 'react';
import UserContext from './user-context';

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const { userId } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState();
 
  const addCategory = async ({name,id,userId,pros,cons}) => {
    await setCategories((prevState) => [...prevState, {name,id,userId,pros,cons}]);
  };
  
  const providerProps = { categories, setCategories, addCategory,catId, setCatId };

  return (
    <CategoryContext.Provider value={providerProps}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContext;