import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '@lib/constants'
import { selectPopUpIsHiddenByOutsideTouch, selectPopUpIsVisible } from '@lib/store/ui/popUp/popUp.slice'
import { PopUpWrapper } from '@lib/ui/PopupWrapper'

export const Popup: React.FC = () => {
  const isVisible = useSelector(selectPopUpIsVisible)
  const isHiddenByOutsideTouch = useSelector(selectPopUpIsHiddenByOutsideTouch)

  return (
    <PopUpWrapper state={isVisible ? State.Default : State.Hidden} isClosedByOutsideTouch={isHiddenByOutsideTouch}>
      <div />
    </PopUpWrapper>
  )
}
