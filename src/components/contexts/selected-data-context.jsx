import React, { createContext, useEffect, useState } from "react";

const SelectedDataContext = createContext({});

 const SelectedDataContextProvider = ({ children }) => {
  const [propArray, setPropArray] = useState([])

  const toggleProp = (id) => {
    let newArray = []
    if(propArray.includes(id)){
     newArray = propArray.filter(itemId => itemId !== id)} 
     else {
      newArray.push(...propArray, id)
    }
    setPropArray(newArray)
  }
  const isItemSelected = id => propArray.includes(id);
  const clearPropArray = () => setPropArray([])

  useEffect(() => console.log('UI:propArray ', propArray), [propArray])

  const providerProps = {
    isItemSelected,
    clearPropArray,
    toggleProp,
    propArray
  }

  return <SelectedDataContext.Provider value={ providerProps }>{children}</SelectedDataContext.Provider>
  
};
export {SelectedDataContextProvider}
export default SelectedDataContext;

