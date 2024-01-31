import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '@tada-shared/ui-common'
import { selectPopUpIsHiddenByOutsideTouch, selectPopUpIsVisible } from '@lib/store/ui/popUp/popUp.slice'
import { PopUpWrapper } from '@lib/ui/PopupWrapper'
import { PrivacyFormSubmitPopup } from '@lib/ui/PrivacyFormSubmitPopup'

export const Popup: React.FC = () => {
  const isVisible = useSelector(selectPopUpIsVisible)
  const isHiddenByOutsideTouch = useSelector(selectPopUpIsHiddenByOutsideTouch)

  return (
    <PopUpWrapper state={isVisible ? State.Default : State.Hidden} isClosedByOutsideTouch={isHiddenByOutsideTouch}>
      <PrivacyFormSubmitPopup />
    </PopUpWrapper>
  )
}
