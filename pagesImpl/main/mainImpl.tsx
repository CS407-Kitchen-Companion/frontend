import styled from '@emotion/styled'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

export default function MainImpl() {
  return (
    <PageImplView children={undefined}>
      <MainBackgroundWrapper>
        <h1>Main Page</h1>
      </MainBackgroundWrapper>
    </PageImplView>
  )
}

const MainBackgroundWrapper = styled.div`
  background: #f5f7fa;
`
