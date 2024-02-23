import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

export default function ForgotImpl() {
  return (
    <PageImplView>
      <LoginBackgroundWrapper>
        <h1>Change Password</h1>
        <ForgotForm></ForgotForm>
        </LoginBackgroundWrapper>
    </PageImplView>
  )
}


const ForgotForm = () => {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const router = useRouter();

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
    event.preventDefault();
    

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="oldPwd">Old Password:</label>
        <input
          type="text"
          id="oldPwd"
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
          required
        />
        <div></div>
        <label htmlFor="newPwd">New Password:</label>
        <input
          type="text"
          id="newPwd"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
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