import styled from '@emotion/styled'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

export default function MainImpl() {
  return (
    <PageImplView>
      <MainBackgroundWrapper>Main Page</MainBackgroundWrapper>
    </PageImplView>
  )
}

const MainBackgroundWrapper = styled.div`
  background: #f5f7fa;
`
