import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import {
  Unstable_Popup as BasePopup,
  PopupPlacement,
} from '@mui/base/Unstable_Popup';
import MoreVertIcon from '@mui/icons-material/MoreVert'

//three dot more button
export const MoreVertButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setIsClicked(!isClicked) 
    //TODO: /viewpost/edit/1
    //make this handeling into viewpostImp
    router.push("/viewpost/edit/1")
  }

  return (
    <AlignRight>
      <StyledMoreVertButton onClick={handleClick} textColor={isClicked ? 'black' : null}>
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </StyledMoreVertButton>
    </AlignRight>
  )
}

//BASE simple icon three vertical dot
export const MoreVertButtonIcon = () => {
  return(
    <>
      <StyledMoreVertButtonIcon>
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </StyledMoreVertButtonIcon>
    </>
  )
}





const StyledMoreVertButton = styled.button`
  padding: 10px 10px;
  color: ${props => props.textColor || 'lightgrey'};
  background-color: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
const AlignRight = styled.div`
  align-items: right;
  text-align: right;
  float: right;
`
const StyledMoreVertButtonIcon = styled.button`
  padding: 10px 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s ease;
  color: #E4E9F2;

  &:active {
    color: #d3dce9;
  }
`

