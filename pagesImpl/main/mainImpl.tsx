import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectSearchedResults } from '@lib/store/searchData/searchData.slice'
import { Filter } from '@pagesImpl/__components__/Filter'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useRouter } from 'next/router'

export default function MainImpl() {
  const router = useRouter()
  const searchedResults = useSelector(selectSearchedResults)

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    // TODO: fix the url later
    router.push('/viewpost/1')
    console.log('click listitem')
  }

  return (
    <PageImplView>
      <Header />
      <MainBackgroundWrapper>
        <Filter />
        <MainWrapper>
          {searchedResults.map((item, i) => (
            <ListItem key={i} onClick={handleListItemClick}>
              {item.title}
            </ListItem>
          ))}
        </MainWrapper>
      </MainBackgroundWrapper>
    </PageImplView>
  )
}

const MainBackgroundWrapper = styled.div`
  display: flex;
  flex-flow: row;
  background: #f5f7fa;
`

const MainWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 50px 20px;
`

const ListItem = styled.div`
  border-radius: 50px;
  background: #fff;
`
