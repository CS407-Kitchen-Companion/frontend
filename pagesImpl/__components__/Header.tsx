import { useState } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { BookMarkIcon } from '@pagesImpl/__components__/BookMarkIcon'
import { PostIcon } from '@pagesImpl/__components__/PostIcon'
import { Logo } from '@pagesImpl/__components__/Logo'
import { ProfileIcon } from '@pagesImpl/__components__/ProfileIcon'
import { SearchBar } from '@pagesImpl/__components__/SearchBar'

export const Header: React.FC = () => {
  const router = useRouter()

  // TODO: If logined, then do the thing. IF NOT, redirect to auth page
  const handleClickPost = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    router.push('/writePost')
  }
  const handleClickBookmark = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    router.push('/bookmark')
  }
  return (
    <HeaderWrapper>
      <Logo />
      <SearchBar />
      <IconsWrapper>
        <PostIconWrapper onClick={handleClickPost}>
          <PostIcon />
        </PostIconWrapper>
        <BookMarkIconWrapper onClick={handleClickBookmark}>
          <BookMarkIcon />
        </BookMarkIconWrapper>
        <ProfileIcon />
      </IconsWrapper>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 32px 41px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
`

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 186px;
`

const BookMarkIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: #f5f7fa;
`

const PostIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: #f5f7fa;
`
