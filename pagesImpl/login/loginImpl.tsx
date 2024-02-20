import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView';
import Cookies from 'js-cookie';


export default function LoginImpl() {
  return (
    <PageImplView>
      <LoginBackgroundWrapper>
        <h1>Login Page</h1>
        <LoginForm></LoginForm>
        </LoginBackgroundWrapper>
    </PageImplView>
  )
}


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
    event.preventDefault();
    
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
        });
      }
    });
    
/*
    if (res.status == 200) { 
      //const token = Cookies.get('token');
      console.log(bod);
     // router.push("/");
    } else {
      alert("Login failed" + res.status);
    }
*/
    console.log('Submitted:', { username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username or Email:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};


const LoginBackgroundWrapper = styled.div`
  background: #f5f7fa;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  text-align: center;
`
