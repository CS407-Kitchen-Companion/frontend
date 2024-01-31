import type { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children: ReactNode
}

export const Portal: FC<Props> = props => {
  const isBrowser = typeof window !== 'undefined'

  if (!isBrowser) return null

  const portalElement = document.getElementById('portal')

  if (!portalElement) {
    throw new Error('portal does not exist!')
  }

  return ReactDOM.createPortal(props.children, portalElement)
}
