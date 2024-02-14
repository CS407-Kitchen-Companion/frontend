import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

export default function RegisterImpl() {
  return (
    <PageImplView>
      <LoginBackgroundWrapper>
        <h1>Login Page</h1>
        <RegisterForm></RegisterForm>
        </LoginBackgroundWrapper>
    </PageImplView>
  )
}


const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
    event.preventDefault();
    
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const { success } = await res.json();
    

    if (res.status == 200) { 
      router.push("/");
    } else {
      alert("Login failed" + res.status);
    }

    console.log('Submitted:', { username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
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
      <button type="submit">Submit</button>
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
