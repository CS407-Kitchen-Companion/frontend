import styled from '@emotion/styled'
import { Filter } from '@pagesImpl/__components__/Filter'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

export default function MainImpl() {
  return (
    <PageImplView>
      <Header />
      <MainBackgroundWrapper>
        <Filter /> Main Page
      </MainBackgroundWrapper>
    </PageImplView>
  )
}

const MainBackgroundWrapper = styled.div`
  display: flex;
  flex-flow: row;
  background: #f5f7fa;
`
