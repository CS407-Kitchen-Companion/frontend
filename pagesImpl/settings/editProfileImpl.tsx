import styled from '@emotion/styled'
import { useRouter } from"next/navigation";
import { FormEvent, useEffect } from 'react'
import React, { useState } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '@pagesImpl/__components__/Header'
import { userDataAction, selectUserName, selectProfilePicture, selectBio, selectId, selectEditing } from '@lib/store/userData/userData.slice'
import Head from 'next/head';
import { useGetSearchedResultsQuery } from '@lib/store/api/api.slice';

export default function EditProfileImpl() {
  const dispatch = useDispatch();
  
  
  useEffect(() => {
     dispatch(userDataAction.requestFlowGetProfile())
    
  }, [dispatch]);

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
  const getUsername = useSelector(selectUserName)
  const getPfp = useSelector(selectProfilePicture)
  const getBio = useSelector(selectBio)
  const getId = useSelector(selectId)
 
  

  const [bio, setBio] = useState('');
  const [pfp, setPfp] = useState('');
  const[username, setUsername]= useState('');

  const [id, setId] = useState(0);
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState('public');

  const handleChangeVisibility = (e: any) => {
    setVisibility(e.target.value);
  };
  const handleChangeBio = (e: any) => {
    e.preventDefault()
    setBio(e.target.value)
  };
  const handleChangePfp = (e: any) => {
    e.preventDefault()
    setPfp(e.target.value);
  };
  const updateVisibility = async (userId : any, visibilityStatus: string) => {
    // Assuming the endpoint is '/api/user/visibility' and expects 'userId' and 'visibility'
    const isVisible = visibilityStatus === 'public';

    const response = await fetch('https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/user/setVisibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId, 
        visible: isVisible, 
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update visibility');
    }

    const data = await response.json();
    return data;
  };

  const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
    event.preventDefault();
      console.log(id)
      //dispatch(userDataAction.setEditing({editing: true}))
      if(visibility === 'public'){
        const visibility = true
        dispatch(userDataAction.setVisibility({visibility}))
      } else {
        const visibility = false
        dispatch(userDataAction.setVisibility({visibility}))
      }
      dispatch(userDataAction.setProfilePicture({profilePicture: pfp}))
      dispatch(userDataAction.setBio({bio}))
      
      dispatch(userDataAction.requestFlowEditUser())
     
      try {
        const userId = 37; 
        await updateVisibility(userId, visibility);
        //alert('Profile visibility updated successfully');
      } catch (error) {
        console.error('Error updating profile visibility:', error);
        alert('Failed to update profile visibility');
      } 
      alert('Profile updated!')
  };
  const handleDeleteRecipe = () => {
    if(confirm("Confirm delete account?")){
      dispatch(userDataAction.requestFlowDeleteUser())
    }
  }

  useEffect(() => {
    
    setBio(getBio)
    setPfp(getPfp)
    setUsername(getUsername)
    setId(getId)
    

    
  }, [getBio, getPfp, getUsername, getId]);
  
  return (
    <FormWrapper>
        <h1 style={
        {
          padding: '2%',
        }
      }>Edit Profile</h1>
      <InputWrapper>
      <DeleteButton onClick={handleDeleteRecipe}>
        Delete Account
      </DeleteButton>
      </InputWrapper>
    <form onSubmit={handleSubmit}>
      
      <StyledLabel>Username: {username}</StyledLabel>

      <InputWrapper>
      <StyledLabel>Profile Pic: </StyledLabel>
      <StyledInput
      type="text"
      value={pfp}
      onChange={handleChangePfp}
      ></StyledInput>
      <ProfilePic src={pfp}></ProfilePic>
      </InputWrapper>

      <InputWrapper>
      <StyledLabel
      >Profile Bio: </StyledLabel>
      <StyledInput
      type="text"
      value={bio}
      onChange={handleChangeBio}
      ></StyledInput>
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

const ProfilePic = styled.img`
width: 5vw;
height: 5vw;
border: 2px solid #2D3566;
border-radius: 50%;
background: #2D3566;
margin: 0 0 0 5vh;
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