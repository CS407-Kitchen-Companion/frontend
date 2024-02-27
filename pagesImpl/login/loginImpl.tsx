import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView';
import Cookies from 'js-cookie';
import bgimage from "../../public/fruitToast.avif";
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { userDataAction, selectUserName, selectPassword } from '@lib/store/userData/userData.slice'

export default function LoginImpl() {
  return (
    <PageImplView>
      <LoginBackgroundWrapper>
        <LoginLeftImage/>
        <LoginRightWrapper>
          <Buf></Buf>
          <LoginFormWrapper>
            <h1>Kitchen Companion</h1>
            <h2>Log in</h2>
            <LoginForm></LoginForm>
            <BottomText></BottomText>
          </LoginFormWrapper>
        </LoginRightWrapper>
      </LoginBackgroundWrapper>
    </PageImplView>
  )
}


const LoginForm = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const storedPwd = useSelector(selectPassword);
  const storedName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
    event.preventDefault();
    dispatch(userDataAction.setName({name}))
    dispatch(userDataAction.setPassword({password}))
    dispatch(userDataAction.requestFlowSubmitLogin())
    
    
    console.log('Incorrect Credentials')

    /*
    if(name === storedName
    && password === storedPwd){
      router.push("/main");
      console.log('Submitted:', { name, password });
    } else {
      alert('Incorrect Credentials')
    }
    */
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div
      style={{
        marginTop:'10px',
      }}
      >
        
        <input
          style={{
            width: '35%',
          height: '50px',
            border: '1px solid #ccc',
            borderRadius: '20px 20px 0% 0%',
            borderBottom:'none',
            textAlign: 'center',
          }}
          type="text"
      
          id="username"
          placeholder='Username'
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div
      style={{
        
        marginBottom:'20px'
      }}
      >
        
        <input
        style={{
          width: '35%',
          height: '50px',
          border: '1px solid #ccc',
          borderRadius: '0% 0% 20px 20px',
          textAlign: 'center'
        }}
          type="password"
          id="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button 
      type="submit"
      style={{
        width: '30%',
        height: '50px',
        border: '1px solid #2A53FF',
        backgroundColor: '#2A53FF',
        borderRadius: '20px',
        color: 'white',
        fontSize: '15px',
        fontWeight: 'bold',
        textAlign: 'center'
      }}
      >
        Login
        </button>
    </form>
  );
};

const LoginLeftImage = () => {
  
  return(
    <div style={{
      backgroundImage: `url(${bgimage.src})`,
      backgroundSize: 'cover',
      width: '55%',
      height: '100%',
      float: 'left'
    }}>
    </div>
  );
}

const BottomText = () => {

  return(
    <div>
   <div>
    <Link color='#2A53FF' href='/login/forgot' >
      Forgot your password?
    </Link>
    </div> 
    <div>
    
      Don't have an account yet? <Link color='gray' href='/login/register' >Sign up
    </Link>
    </div>
    </div>
  )
}

const LoginBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const LoginRightWrapper = styled.div`
  background: #f5f7fa;
  background-size: auto;
  margin-left: 55%;
  height: 80vh;
`
const Buf = styled.div`
  background: #f5f7fa;
  background-size: auto;
  height: 20vh;
`
const LoginFormWrapper = styled.div`
  background: #f5f7fa;
  background-size: auto;
  height: 100vh;
  text-align: center;
`
