import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import MoreVertIcon from '@mui/icons-material/MoreVert'

//three dot more button
export const MoreVertButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setIsClicked(!isClicked) 
    router.push("/viewpost/edit")
  }

  return (
    <AlignRight>
      <StyledMoreVertButton onClick={handleClick} textColor={isClicked ? 'black' : null}>
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </StyledMoreVertButton>
    </AlignRight>
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