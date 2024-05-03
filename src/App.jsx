import React, { useState, useEffect, useContext } from "react";
import LogIn from "./components/login.jsx";
import Main from "./components/main.jsx";
import Splash from "./components/splash.jsx";
import axios from "axios";
import {
  useQuery /*, Queryclient,  useQueryclient */,
} from "@tanstack/react-query";

import "./scss/App.scss";


const GetUserId = async () => {
  const response = await axios.get("/getId");//http://localhost:8081
  return await response.data;
};
export default function App() {
  

  const {
    data: ID,
    isLoading,
    isError,
    error,
    onSuccess,
  } = useQuery({
    queryKey: ["ID"],
    queryFn: async () => await GetUserId(),
    staleTime: 60 * 60 * 1000,
    cacheTime: 1000 * 60 * 60,
  });

  
  //  if (run(10000)) return <Splash></Splash>;

  
  if(ID){
    return <Main UserId={ID}></Main>;
  }
}
async function run(Time) {  
  while (true) {  
    console.log('Running...');  
    await new Promise(resolve => setTimeout(resolve, Time));  
  }  
}