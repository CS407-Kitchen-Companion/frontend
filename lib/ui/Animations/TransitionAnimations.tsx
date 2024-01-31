import { ReactNode } from 'react'
import { animated, useTransition } from 'react-spring'
import { TransitionAnimationTypes } from './TransitionOptions'

interface Props {
  children: ReactNode
  active: boolean
  with: TransitionAnimationTypes
}

export const TransitionAnimate: React.FC<Props> = props => {
  const transitions = useTransition(props.active, props.with)
  return <>{transitions((styles, item) => item && <animated.div style={styles}>{props.children}</animated.div>)}</>
}
