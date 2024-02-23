import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useDispatch, useSelector } from 'react-redux'
import { userDataAction, selectuserData } from '@lib/store/userData/userData.slice'

export default function RegisterImpl() {
  return (
    <PageImplView>
      <LoginBackgroundWrapper>
        <h1>Register</h1>
        <RegisterForm></RegisterForm>
        </LoginBackgroundWrapper>
    </PageImplView>
  )
}


const RegisterForm = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
    event.preventDefault();
    
    if(!email.includes('@')){
        alert('Invalid email');
    } else {
      dispatch(userDataAction.setEmail({email}))
      dispatch(userDataAction.setName({name}))
      dispatch(userDataAction.setPassword({password}))
      dispatch(userDataAction.requestFlowSubmitRegister())

      
      console.log('Submitted:', { name, email });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          style={{
            width: '35%',
            height: '50px',
            border: '1px solid #ccc',
            borderRadius: '20px 20px 0% 0%',
            textAlign: 'center',
          }}
          type="text"
          placeholder='Email'
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          style={{
            width: '35%',
            height: '50px',
            border: '1px solid #ccc',
            borderTop:'none',
            borderBottom: 'none',
            textAlign: 'center'
          }}        
          type="text"
          placeholder='Username'
          id="username"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          style={{
            width: '35%',
            height: '50px',
            border: '1px solid #ccc',
            borderRadius: '0% 0% 20px 20px',
            borderBottom:'none',
            textAlign: 'center'
          }}        
          type="password"
          placeholder='Password'
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
      style={{
        width: '30%',
        height: '50px',
        border: '1px solid #2A53FF',
        backgroundColor: '#2A53FF',
        borderRadius: '20px',
        color: 'white',
        fontSize: '15px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '20px'
      }}      
       type="submit">
        Submit
        </button>
    </form>
  );
};


const LoginBackgroundWrapper = styled.div`
  background: #f5f7fa;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin: 0;
  padding: 0;
`
