import React from 'react';
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import axios from 'axios';
import UserContext from "./contexts/user-context";

// import "../scss/index.scss";

export default function LogIn() {
  const { setUserId, setUserEmail,setUserPassword } = useContext(UserContext);
let messages = [];
  let space = '                ';//"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  let message1 = messages[0] ? "You have logged out." : space;
  let message2 = messages[1] ? "Please log in" : space;
  let error = messages[2] ? messages[2] : space;

  const loginMutation = useMutation({
    mutationFn: async ({email,password}) => {
     await axios.post("/users/login"+ password,email);
    },
    onSuccess: async (data) => {
      console.log('onSuccess =',await data)
      setUserId(await data);
      setNotLoggedIn(false);
    },
    onSettled: ({email,password}) => {
      setUserEmail(email);
      setUserPassword(password);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return (
    <>
      <body style={{display: 'grid',gridTemplateColumns: "auto"}}>
        <div id='login'>
          <h1>Login</h1>

          <ul style={{decoration: "none"}}>
            <li>{message1}</li>
            <li>{message2}</li>
            <li>{error}</li>
          </ul>
        </div>
        <form
          action="/users/login"
          method="post"
          target="_blank"
          onSubmit={() => login.mutate}
        >
          <div style={{display: "flex",flexDirection: "column"}}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div style={{display: 'flex',flexDirection: 'column'}}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div style={{marginLeft: "2rem"}}>
            <input
              type="submit"
              value="Login"
              onClick={() => {
                setTimeout(window.history.back(1), 10000);
              }}
            />
          </div>
        </form>
        <div style={{marginLeft: "2rem"}} id='signup'>
          <a href="/signup">Need to Sign up?</a>  
        </div>
      </body>
    </>
  );
}

