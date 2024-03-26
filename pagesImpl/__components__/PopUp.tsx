import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import {
  Unstable_Popup as BasePopup,
  PopupPlacement,
} from '@mui/base/Unstable_Popup';
import { MoreVertButtonIcon } from '@pagesImpl/__components__/MoreVertButton'
import { HorizontalLine } from '@pagesImpl/__components__/HorizontalLine'
import { EditComment } from '@pagesImpl/__components__/CommentSection'

//popup example
const SimplePopupExample = () => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <ButtonSection onClick={handleClick}> <MoreVertButtonIcon/> </ButtonSection>
      <BasePopup id={id} open={open} anchor={anchor} placement="bottom-end">
        <PopupBody>The content of the Popup.</PopupBody>
      </BasePopup>
    </div>
  );
}




//wrapper for showwhenhover icon i.e. 3 dot vert
export const IconDiv = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;
//
export const ShowWhenHover = styled.div`
  //background-color: #ff0000;
  opacity: 1;
  transition: opacity 0.3s ease;
`;


//show icon nested in ShowWhenHover only shows when hover here
const OptionalShowWhenHoverWrapper = styled.div`
  &:hover .show-when-hover {
    opacity: 1;
  }
`

export const ButtonSection = styled.div`
  //background-color: #ff0000;
  opacity: 1; 
`;

export const PopupBody = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #343c6a;

  z-index: 1;
  border-radius: 20px;
  border: 3px solid #f5f7fa;
  background: #fff;
`
export const PopupOption = styled.div`
  padding: 8px 4px;
  margin: 8px;
  cursor: pointer;
`