import React, { createContext, useContext,useState, useRef} from 'react';

import UserContext from './user-context';

const CategoryContext = createContext();
import getCategories from '../../utils/get-categories';
// let _categories = useRef();
export const CategoryContextProvider = ({ children }) => {
  const { userId } = useContext(UserContext);
  const [categories, setCategories] = useState([]);

  let _categories = useRef();
 
  const addCategory = async (cat) => {
    await setCategories((prevState) => [...prevState, { cat }]);
  };
  const refreshCategories = async () => {
    const refreshcat = async () => {await getCategories(userId, _categories)}
    setCategories(getCategories( await refreshcat));
  }
  const providerProps = { categories,setCategories, addCategory, refreshCategories };

  return (
    <CategoryContext.Provider value={providerProps}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContext;