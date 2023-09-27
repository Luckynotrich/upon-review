import React, { createContext, useContext,useState} from 'react';
import UserContext from './user-context';

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const { userId } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState();
 
  const addCategory = async ({name,id,userId,pros,cons}) => {
    await setCategories((prevState) => [...prevState, {name,id,userId,pros,cons}]);
    await console.log('category-context::Added ',categories)
  };

  const updateCategory = async ({name,id,userId,pros,cons}) => {
    let newCat = {name:name,id:id,cat:userId,pros:pros,cons: cons};
    let newCategories = await categories.filter((cat) => cat.id !== id);
    await newCategories.push(newCat);
    await setCategories(newCategories);
    await console.log('category-context::Updated ',categories)
  }
  
  const providerProps = { categories, setCategories, addCategory,catId, setCatId,updateCategory };

  return (
    <CategoryContext.Provider value={providerProps}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContext;