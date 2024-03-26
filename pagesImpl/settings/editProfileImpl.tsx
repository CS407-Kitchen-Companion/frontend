import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '@pagesImpl/__components__/Header'
import { userDataAction, selectPassword } from '@lib/store/userData/userData.slice'
import Head from 'next/head';

export default function EditProfileImpl() {
  return (
    <PageImplView>
        <Header/>
      <BackgroundWrapper>
        <ForgotForm></ForgotForm>
        </BackgroundWrapper>
    </PageImplView>
  )
}


const ForgotForm = () => {
  const [oldpwd, setOldPwd] = useState('');
  const [password, setPass] = useState('');
  const[newPwd, setNewPwd]= useState('');
  const [id, setId] = useState(30);
  const router = useRouter();
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState('public');

  const handleChangeVisibility = (e: any) => {
    setVisibility(e.target.value);
  };

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
    <FormWrapper>
        <h1 style={
        {
          padding: '2%',
        }
      }>Edit Profile</h1>
      <InputWrapper>
      <DeleteButton>
        Delete Account
      </DeleteButton>
      </InputWrapper>
    <form onSubmit={handleSubmit}>
      
      <StyledLabel>Username: </StyledLabel>

      <InputWrapper>
      <StyledLabel>Profile Pic: </StyledLabel>
      <StyledInput></StyledInput>
      </InputWrapper>

      <InputWrapper>
      <StyledLabel>Profile Bio: </StyledLabel>
      <StyledInput></StyledInput>
      </InputWrapper>
      <InputWrapper>
      <StyledLabel>Profile Visibility: </StyledLabel>
      <StyledDropdown value={visibility} onChange={handleChangeVisibility}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </StyledDropdown>
        </InputWrapper>
        <InputWrapper>
      <StyledButton type="submit">Submit</StyledButton>
      </InputWrapper>
    </form>
    </FormWrapper>
  );
};


const BackgroundWrapper = styled.div`
  background: #f5f7fa;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  text-align: center;
`
const FormWrapper = styled.div`
  background: white;
  background-size: auto;
  height: auto;
  width: 60%;
  
  margin-left: 20%;
  border-radius: 10px;
`
const StyledLabel = styled.label`
color: black;
font-weight: bold;
font-size: 30px;
`
const StyledInput = styled.input`
background: #f5f7fa;
width: 600px;
height: 50px;
border-radius: 10px;
border: 1px solid #f5f7fa;
margin: 5px;
margin-left: 0px;
`
const InputWrapper = styled.div`
  margin-top: 2%;
  padding-bottom: 3%;
`
const StyledButton = styled.button`
color: lightgray;
font-weight: bold;
background: #2D3566;
width: 250px;
height: 50px;
border-radius:  30px ;
border: 1px solid #2D3566;
`
const StyledDropdown = styled.select`
margin: 1vh;
width: 100px;
height: 30px;
background: #f5f7fa;
border-radius: 5px;
`
const DeleteButton = styled.button` 
width: 10vw;
height: 8vh;
background: red;
border-radius: 5px;
font-size: 20px
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