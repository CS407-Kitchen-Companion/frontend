import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

export default function ForgotImpl() {
  return (
    <PageImplView>
      <LoginBackgroundWrapper>
        <h1>Forgot Password</h1>
        <ForgotForm></ForgotForm>
        </LoginBackgroundWrapper>
    </PageImplView>
  )
}


const ForgotForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
    event.preventDefault();
    
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const { success } = await res.json();
    

    if (res.status == 200) { 
      router.push("/");
    } else {
      alert("Login failed" + res.status);
    }

    console.log('Submitted:', { username });
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
/*
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
*/