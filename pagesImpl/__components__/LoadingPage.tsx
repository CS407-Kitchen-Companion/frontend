import styled from '@emotion/styled'
import React from 'react'

const LoadingBackground = styled.div`
  position: absolute;
  top: 0;
  background-color: white;
  height: 100%;
  width: 100%;
`

export const LoadingPage: React.FC = () => {
  return <LoadingBackground />
}
