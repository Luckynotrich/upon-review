import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "./components/contexts/user-context";

import Main from "./components/main.jsx";
import Splash from "./components/splash.jsx";
import LogIn from "./components/login_react.jsx";



import {
  useQuery /*, Queryclient,  useQueryclient */,
} from "@tanstack/react-query";

import "./scss/App.scss";


const GetUserId = async () => {
  const response = await axios.get(`/getId`);
  return await response.data;
};
export default function App() {
  const { userId, defaultId } = useContext(UserContext);
  const [isDisplayed,setIsDisplayed] = useState(false);

  useEffect(()=> 
  {
    setInterval(()=>{
    setIsDisplayed(!isDisplayed)
  },1000);
  },[]
);
  
 
  const {
    data: ID,
    isLoading,
    isError,
    error,
    isLoadingError,
    pending,
    onSuccess,
    isRefetchError,
  } = useQuery({
    queryKey: ["ID"],
    queryFn: async () => await GetUserId(),
    staleTime: 60 * 60 * 1000,
    cacheTime: 1000 * 60 * 60,
  });

  if(!ID)return(<LogIn></LogIn> )
  
   if(ID) return (
    <>
    {isLoading || !isDisplayed && <Splash />}
   { isDisplayed && <Main UserId={ID} />}
   </>)
  
}
