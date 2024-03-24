import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useDispatch, useSelector } from 'react-redux'
import { userDataAction, selectPassword } from '@lib/store/userData/userData.slice'

export default function SettingsImpl() {
  const router = useRouter()
  const changePwd = () => {
    router.push('/settings/changePassword')
  }
  const editProfile = () => {
    router.push('/settings/editProfile')
  }
  return (
    <PageImplView>
      <Header/>
      <BackgroundWrapper>
        
      <ContentWrapper>
      <h1 style={
        {
          padding: '2%',
        }
      }>Settings</h1>
      <ButtonWrapper>
   <StyledButton onClick={changePwd}>
    Change Password
   </StyledButton>
   </ButtonWrapper>
   <ButtonWrapper>
    <StyledButton onClick={editProfile}>
    Edit Profile
    </StyledButton>
    </ButtonWrapper>
    </ContentWrapper>
        </BackgroundWrapper>
    </PageImplView>
  )
}




const BackgroundWrapper = styled.div`
  margin: 0;
  padding: 0;
  background: #f5f7fa;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  text-align: center;
  
`
const ContentWrapper = styled.div`
  
background: white;
background-size: auto;
height: 60vh;
width: 40%;
margin-top: 2%;
margin-left: 30%;
  
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
const ButtonWrapper = styled.div`
  margin-top: 5%;
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