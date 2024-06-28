import React from 'react';
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import axios from 'axios';
import UserContext from "./contexts/user-context";

// import "../scss/index.scss";

export default function LogIn() {
  const { setUserId, setUserEmail,setUserPassword } = useContext(UserContext);
  function togglePw(set) {
    let pw = document.getElementById("password");;
    if(set==='password')pw.type = "text"
    if (pw.type === "password") {
      pw.type = "text";
    } else {
      pw.type = "password";
    }
  }

  const loginMutation = useMutation({
    mutationFn: async ({email,password}) => {
     await axios.post(`/users/login`+ password,email);
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
      return(<>error</>);
    },
  });
  return (
    <>
      <section  className='login' style={{display: 'grid',gridTemplateColumns: "auto"}}>
        <div >
          <h1>Login</h1>
        </div>
        <form
          id='login'
          action='/users/login'
          method="post"
          target="_self"
          onSubmit={() => login.mutate}
        >
          <div className='login' style={{display: "flex",flexDirection: "column"}}>
            <label htmlFor="email">Email:</label>
            <input  type="email" autoComplete='email' id="email" name="email" required />
          </div>
          <div className='login' style={{display: 'flex',flexDirection: 'column'}}>
            <label htmlFor="password">Password:</label>
            <input type="password" autoComplete="current-password" id="password" name="password" required />
            <div className='login showpass' style={{display: 'flex',flexDirection:'row'}}>
        <input type="button" onClick={()=>togglePw()} style={{width:'2rem',height:'2rem'}} /><label> Show Password</label>
      </div>
          </div>
          <div className='login' style={{marginLeft: "2rem"}}>
            <input
              type="submit"
              value="Login"
            //  onClick={()=>togglePw('password')}
            />
          </div>
        </form>
        <div style={{marginLeft: "2rem"}} id='signup'>
          <a href="/signup">Need to Sign up?</a>
        </div>
      </section>
    </>
  );
}

