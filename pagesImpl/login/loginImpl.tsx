import styled from '@emotion/styled'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

export default function MainImpl() {
  return (
    <PageImplView>
      <LoginBackgroundWrapper>Login Page</LoginBackgroundWrapper>
    </PageImplView>
  )
}

const LoginBackgroundWrapper = styled.div`
  background: #f5f7fa;
`
