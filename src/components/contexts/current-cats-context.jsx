import React from 'react';
import { useQuery } from '@tanstack/react-query';
const CurrentCatsContext = React.createContext();

export const useCurrentCatsContext = () => {
  return React.useContext(CurrentCatsContext);
};

export const CurrentCatsContextProvider = ({ children }) => {
  const currentCatsQuery = useCurrentCatsQuery();

  if (currentCatsQuery.isLoading) {
    return <SkeletonLoader />;
  }

  if (currentCatsQuery.isError) {
    return <ErrorMessage error={currentCatsQuery.error} />;
  }

  return (
    <CurrentCatsContext.Provider value={currentCatsQuery.data}>
      {children}
    </CurrentCatsContext.Provider>
  );
};
//src/components/contexts/current-categories-context.jsx
import { getCats } from '../../utils/future-self-api'; // src/utils/future-self-api.js
const catsQuery = (userId) => {
  return useQuery({
    queryKey: ['cats', userId],
    queryFn: () => getCats(userId),
    staleTime: 0,//1000 * 60 , // 1 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
    refetchOnMount: true,
  });
  
};
export const useCatsQuery = (userId) => {
  return catsQuery(userId);
};
