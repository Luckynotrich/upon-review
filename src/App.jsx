import React, { useState, useEffect, useContext } from "react";
import UserContext from "./components/contexts/user-context";

import Main from "./components/main.jsx";
import Splash from "./components/splash.jsx";
import axios from "axios";
import {
  useQuery /*, Queryclient,  useQueryclient */,
} from "@tanstack/react-query";

import "./scss/App.scss";


const GetUserId = async () => {
  const response = await axios.get("/getId");
  return await response.data;
};
export default function App() {
  const { userId, defaultId } = useContext(UserContext);

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
/* console.log('userId === defaultId =',userId === defaultId)
  if(userId === defaultId) <LogIn></LogIn>
  else */ if (isLoading) return <Splash></Splash>;
  else if(ID) return <Main UserId={ID}></Main>;
}
