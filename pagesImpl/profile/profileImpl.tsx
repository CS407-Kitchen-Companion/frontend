import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectSearchedResults } from '@lib/store/searchData/searchData.slice'
import { Filter } from '@pagesImpl/__components__/Filter'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function MainImpl() {
  const router = useRouter()
  

  return (
    <PageImplView>
      <Header />
      <MainBackgroundWrapper>
        <Filter />
        <MainWrapper>
            <ProfileInfoWrapper>
                PROFILE
            </ProfileInfoWrapper>
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
  
  padding: 50px 20px;
`

const ProfileInfoWrapper = styled.div`
  
  border-radius: 50px;
  text-align: center;
  height: 30vh;
  width: 50vw;
  background: linear-gradient(180deg, #702963 40%, #fff 40%);
`
const ProfileDetails = () => {
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [profielPic, setProfilePic] = useState('')

}