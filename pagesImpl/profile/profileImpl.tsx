import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectSearchedResults } from '@lib/store/searchData/searchData.slice'
import { Filter } from '@pagesImpl/__components__/Filter'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useRouter } from 'next/router'
import { useState } from 'react'
import fishPic from '../../public/fish_post_dummy.jpg'

export default function MainImpl() {
  const router = useRouter()
  

  return (
    <PageImplView>
      <Header />
      <MainBackgroundWrapper>
        <Filter />
        <MainWrapper>
            <ProfileInfoWrapper>
                <ProfileDetails/>
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
  height: 30vh;
  width: 50vw;
  background: linear-gradient(180deg, #702963 40%, #fff 40%);
`
const ProfileDetails = () => {
  const [username, setUsername] = useState('username')
  const [bio, setBio] = useState('bio')
  const [profielPic, setProfilePic] = useState('')

  return(
    <div
    style={{
      padding: '2% 5% 5% 5%',
    
    }}>
      <button
      style={{
        width: '100px',
        height: '40px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        marginLeft: '90%'
      }}>
        Edit
      </button>
      <img src= {fishPic.src}
      style={{
        float: 'left',
        width: '100px',
        height: '100px',
        border: '1px solid #ccc',
        borderRadius: '50%',
        
      }}></img>
      
      <h2
      style={{
        paddingTop: '10%'
      }}>
        {username}
      </h2>
      <p>
        {bio}
      </p>
    </div>
  )

}