import styled from '@emotion/styled'
import { Filter } from '@pagesImpl/__components__/Filter'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

export default function PostIdImpl(  ) {
  //{params}: {params: {postID: string};}
  //<h1>PostIdImpl {params.postID} hi there</h1>
  return (
    <PageImplView>
      <Header />
      <MainBackgroundWrapper>
        <h1>PostIdImpl hi there</h1>
      </MainBackgroundWrapper>
    </PageImplView>
  )
}

const MainBackgroundWrapper = styled.div`
  display: flex;
  flex-flow: row;
  background: #f5f7fa;
`
