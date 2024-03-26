import styled from '@emotion/styled'
import { SelectAllRounded } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react'
import { CircleAvatar } from '@pagesImpl/__components__/CircleAvatar'
import { CloseIcon } from '@pagesImpl/__components__/CloseIcon'
import { ButtonsContainer, SubButton, BlueButton} from '@pagesImpl/__components__/Buttons'


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//popup to see larger full sized img from comments
//assumed to have nonempty images array
export const CommentImgDialogue = ({ username, content, images }: { username: string; content: string, images: string[] }) => {
  const [wantPopUp, setWantPopUp] = useState(false);
  const [selectedImg, setselectedImg] = useState(0) //keeps selected img key number
  
  //activate popup window and grab what img was selected
  const handlePopUp = (img: string, key: number) => {
    console.log(`Clicked on img`)
    setselectedImg(key) 
    setWantPopUp(true)
  }
  //close popup
  const handleExit = () => {
    //console.log('exit popup')
    setWantPopUp(false)
  }
  //change selected img to look at in popup window
  const handleSelectThumbnail = (img: string, key: number) => {
    //console.log('changed selected img')
    setselectedImg(key) 
  }

  return (
    <>
      {/* images in a selected comment */}
      <DivFlex>
        {images.map((img: string, imgIndex: number) => (
          <div key={imgIndex} className="img"> 
            <CommentImgBox key={imgIndex} onClick={() => handlePopUp(img, imgIndex)}>
              {img} key={imgIndex}
            </CommentImgBox>
          </div>
        ))}
      </DivFlex>
      {/* popup dialogue container */}
      { wantPopUp && (
        <> 
        <Overlay>
          <WindowBase>
          <WindowTop> 
            <ExitButton onClick={handleExit}> <CloseIcon/> </ExitButton>
          </WindowTop>
          {/* large selected img*/}
          <SelectedImgSection>
            <SelectedLargeImg>{images[selectedImg]}</SelectedLargeImg>
          </SelectedImgSection>
          {/* right section w comment and thumbnails */}
          <SelectedCommentSection>
            <CommentContent>
              <div style={{ 
                display: 'flex',
                alignItems: 'center' //vertical center
              }}>
                <CircleAvatar/>
                <CommentUsername>@{username}</CommentUsername>
              </div>
              <div style={{ 
                marginTop: '1em',
              }}>{content}</div>
            </CommentContent>
            <ThumbnailContent>
              {/* loop through imgs in this comment for mini thumbnails */}
              {images.map((img: string, imgIndex: number) => (
                <div key={imgIndex} className="img"> 
                  {(selectedImg === imgIndex) ? (
                    <>
                      <SelectedImageThumbnail> {imgIndex} </SelectedImageThumbnail>
                    </>
                  ) : (
                    <ImageThumbnail key={imgIndex} onClick={() => handleSelectThumbnail(img, imgIndex)}>
                      {imgIndex}
                    </ImageThumbnail>
                  )}
                </div>
              ))}
            </ThumbnailContent>
          </SelectedCommentSection>
          </WindowBase>
        </Overlay>
        </>
      )}
    </>
  )
}


//base warning popup dialogue
export const WarningDeleteCommentDialogue = ({
  recipeId,
  commentId,
  isVisible,
  setIsVisible,
}: {
  recipeId: number;
  commentId: number;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(isVisible);

  const handleConfirmDelete = () => {
    //TODO: connect with backend
    console.log('Deleting comment...', 'recipeId=', recipeId, 'commentId=', commentId);
    setOpenDeleteDialog(false); // Close the dialog after confirmation
    setIsVisible(false); // Hide the warning dialog
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false); // Close the dialog without deleting
    setIsVisible(false); // Hide the warning dialog
  };

  return (
    <>
      <Overlay>
        <WarningWindowBase>
          <WarningTitleStyle> Delete Comment? </WarningTitleStyle>
          <div style={{
          margin: '1em 0'
        }} > Are you sure you want to delete this comment? </div>
          <ButtonsContainer>
            <SubButton onClick={handleCancelDelete}>
              Cancel
            </SubButton>
            <BlueButton onClick={handleConfirmDelete}>
              Delete
            </BlueButton>
          </ButtonsContainer>
        </WarningWindowBase>
      </Overlay>

      
    </>
  );
};


//rounded box for image thumbnails in base comments
const CommentImgBox = styled.div`
  width: 18em;
  height: 10em;
  padding: 1em; //TODO: add img so no pad later
  margin: 0.1em;
  background: #FFBCD3;
  border-radius: 20px;
  cursor: pointer;
`
const DivFlex = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows flex items to wrap onto the next line if needed */
`

//Semi-transparent black background 
const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999;
  justify-content: center;
  align-items: center; 
`

const WarningWindowBase = styled.div`  
  font-family: 'Inter';
  display: inline-block;
  padding: 1em;
  
  maxWidth: 50%;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`
const WarningTitleStyle = styled.div`
  margin-top: 1em;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
`


/* pop up window base*/
const WindowBase = styled.div`  
  font-family: 'Inter';
  display: grid;
  grid-template-rows: 70px 1fr 30px;
  grid-template-columns: 60fr 40fr ;

  grid-template-areas:
    "head head"
    "img comment"
    "img comment";

  width: 80%;
  height: 80%;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`

/* top */
const WindowTop = styled.div`
  grid-area: head;
  //width: 100%;
  //height: 78.5px;
  background: #F5F7FA;
  border-radius: 20px 20px 0px 0px;
`
/* x */
const ExitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  margin: 1.5em;
  width: 30px;
  height: 30px;
  cursor: pointer;
`

/* comment highlight */
const SelectedCommentSection = styled.div`
  grid-area: comment;
  display: inline-block;
  margin: 2em 2em 2em 0;
`
/* here are some pictures of my fish! */
const CommentContent = styled.div`
  display: inline-block;
  font-family: 'Inter';
  padding: 2em;
`
/* @eggdropsoup */
const CommentUsername = styled.div`
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #343C6A;
`

/* thumbnail section */
const ThumbnailContent = styled.div`
  display: flex;
  padding: 0em 2em 2em 2em;
`
/* mini thumbnails of the imgs from a selected comment */
const ImageThumbnail = styled.button`
  width: 34px;
  height: 34px;
  margin: 5px 5px 5px 0;
  background: #817FF7;
  border-radius: 5px;
  border: none;
  transition: background-color 0.1s ease;
  cursor: pointer; 
  opacity: 0.5;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1; /* Background color when clicked */
  }
`
//selected mini thumbnail img
const SelectedImageThumbnail = styled.div`
  width: 34px;
  height: 34px;
  margin: 5px 5px 5px 0;
  background: #817FF7;
  border-radius: 5px;
  box-shadow: inset 0 0 0 3px #000; //border
`

/* large img background */
const SelectedImgSection = styled.div`
  grid-area: img;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em;
`

/* large img */
//TODO: replace with img
const SelectedLargeImg = styled.div`
  width: 80%;
  height: 100%;
  background: #FF82AC;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`






