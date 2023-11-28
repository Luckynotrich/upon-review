import React from 'react';
import { useQuery } from '@tanstack/react-query';
const CurrentCategoriesContext = React.createContext();

export const useCurrentCategoriesContext = () => {
  return React.useContext(CurrentCategoriesContext);
};

export const CurrentCategoriesContextProvider = ({ children }) => {
  const currentCategoriesQuery = useCurrentCategoriesQuery();

  if (currentCategoriesQuery.isLoading) {
    return <SkeletonLoader />;
  }

  if (currentCategoriesQuery.isError) {
    return <ErrorMessage error={currentCategoriesQuery.error} />;
  }

  return (
    <CurrentCategoriesContext.Provider value={currentCategoriesQuery.data}>
      {children}
    </CurrentCategoriesContext.Provider>
  );
};
//src/components/contexts/current-categories-context.jsx
import { getCats } from '../../utils/future-self-api'; // src/utils/future-self-api.js
const categoriesQuery = (userId) => {
  return useQuery({
    queryKey: ['cats', userId],
    queryFn: () => getCats(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
    refetchOnMount: false,
  });
  
};
export const useCategoriesQuery = (userId) => {
  return categoriesQuery(userId);
};
