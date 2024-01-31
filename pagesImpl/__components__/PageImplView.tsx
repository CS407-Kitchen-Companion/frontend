import type { ReactNode } from 'react'

interface PageImplViewProps {
  children: ReactNode
}

export const PageImplView: React.FC<PageImplViewProps> = props => {
  return <>{props.children}</>
}
