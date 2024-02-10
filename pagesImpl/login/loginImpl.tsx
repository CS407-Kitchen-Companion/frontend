import styled from '@emotion/styled'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

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

  const handleSubmit = ()  => {
    // You can handle form submission logic here, e.g., sending data to an API
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
