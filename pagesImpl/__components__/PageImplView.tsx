import type { ReactNode } from 'react'
import styled from '@emotion/styled'

interface PageImplViewProps {
  children: ReactNode
}

export const PageImplView: React.FC<PageImplViewProps> = props => {
  return <PageImplWrapper>{props.children}</PageImplWrapper>
}

const PageImplWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f5f7fa;
  color: #343c6a;
`
