import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { EaseInCubic, EaseOutCubic, TransitionAnimate, opacityAnimation } from '@lib/ui/Animations'
import { Portal } from './Portal'
import { State } from '@lib/constants'
import { popUpActions } from '@lib/store/ui/popUp/popUp.slice'
import { ReactNode } from 'react'

type ComponentState = State.Default | State.Hidden

interface Option {
  state?: ComponentState
  zIndex?: number
  isClosedByOutsideTouch?: boolean
  children: ReactNode
}

export const PopUpWrapper: React.FC<Option> = ({
  state = State.Hidden,
  zIndex = 30,
  isClosedByOutsideTouch = false,
  ...props
}) => {
  const dispatch = useDispatch()
  const onWrapperClickHandler = () => {
    if (!isClosedByOutsideTouch) {
      return
    }

    dispatch(popUpActions.onDismiss())
  }

  return (
    <Portal>
      <TransitionAnimate
        active={state === State.Default}
        with={opacityAnimation({
          duration: 300,
          maxOpacity: 0.8,
          initialStyle: { width: '100%', position: 'fixed', left: 0, top: 0, zIndex },
          enterEasing: EaseOutCubic,
          leaveEasing: EaseInCubic,
        })}
      >
        <Dim />
      </TransitionAnimate>
      <TransitionAnimate
        active={state === State.Default}
        with={opacityAnimation({
          duration: 300,
          maxOpacity: 1,
          initialStyle: {
            width: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: zIndex + 1,
          },
          enterEasing: EaseOutCubic,
          leaveEasing: EaseInCubic,
        })}
      >
        <Wrapper onClick={onWrapperClickHandler}>{props.children}</Wrapper>
      </TransitionAnimate>
    </Portal>
  )
}

const Dim = styled.div`
  height: 100vh;
  background-color: #161b2d;
  touch-action: none;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0 48px;
  touch-action: none;
`
