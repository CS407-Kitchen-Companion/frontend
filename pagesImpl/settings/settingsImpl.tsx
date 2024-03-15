import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useDispatch, useSelector } from 'react-redux'
import { userDataAction, selectPassword } from '@lib/store/userData/userData.slice'

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
  const [oldpwd, setOldPwd] = useState('');
  const [password, setPass] = useState('');
  const[newPwd, setNewPwd]= useState('');
  const [id, setId] = useState('30');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
    event.preventDefault();
      console.log(id)
      setPass(newPwd)
      dispatch(userDataAction.setOldPwd({oldpwd}))
      dispatch(userDataAction.setNewPwd({newPwd}))
      dispatch(userDataAction.setPassword({password}))
      dispatch(userDataAction.setId({id}))
      dispatch(userDataAction.requestFlowUpdatePassword())

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="oldPwd">Old Password:</label>
        <input
          type="text"
          id="oldPwd"
          value={oldpwd}
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