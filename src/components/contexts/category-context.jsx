import React, { createContext, useState } from 'react';
// import { useAxios } from '../hooks/use-axios';

const CategoryContext = createContext({});
export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]
  , async() => {
      const [data, error, loading, axiosFetch] = useAxios();
      await axiosFetch(
        {
          axiosInstance: axios,
          method: 'get',
          url: '/api/category-api/' + userId,
          requestConfig: {
            userId,
            data: await response.data,
          },
        },
        [(data)],
      )
      });

  const addCategory = async (cat) => {
    setCategories((prevState) => [...prevState, { cat }]);
  };
  const providerProps = { categories, addCategory };

  return (
    <CategoryContext.Provider value={providerProps}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContext;
