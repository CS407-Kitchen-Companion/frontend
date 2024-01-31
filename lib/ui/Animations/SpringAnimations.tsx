import { animated, useSpring } from 'react-spring'
import { SpringAnimationTypes } from './SpringOptions'

interface Props {
  with: SpringAnimationTypes
}

export const SpringAnimate: React.FC<Props> = props => {
  const styles = useSpring(props.with)

  return <animated.div style={styles}>{props.children}</animated.div>
}
