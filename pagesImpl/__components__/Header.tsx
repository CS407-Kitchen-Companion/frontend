import { useState } from 'react'
import styled from '@emotion/styled'
import { BookMarkIcon } from '@pagesImpl/__components__/BookMarkIcon'
import { MagnifyingGlassIcon } from '@pagesImpl/__components__/MagnifyingGlassIcon'
import { PostIcon } from '@pagesImpl/__components__/PostIcon'
import { Logo } from '@pagesImpl/__components__/Logo'
import { ProfileIcon } from '@pagesImpl/__components__/ProfileIcon'
import { useRouter } from 'next/router'

export const Header: React.FC = () => {
  const router = useRouter()

  // TODO: If logined, then do the thing. IF NOT, redirect to auth page
  const onClickPost = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    router.push('/createRecipe')
  }
  const onClickBookMark = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    router.push('/bookmark')
  }
  return (
    <HeaderWrapper>
      <Logo />
      <SearchbarWrapper>
        <MagnifyingGlassIconWrapper>
          <MagnifyingGlassIcon />
        </MagnifyingGlassIconWrapper>
        <Searchbar placeholder={'Find a recipe, get cooking!'} />
      </SearchbarWrapper>
      <IconsWrapper>
        <PostIconWrapper onClick={onClickPost}>
          <PostIcon />
        </PostIconWrapper>
        <BookMarkIconWrapper onClick={onClickBookMark}>
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

const SearchbarWrapper = styled.div`
  display: flex;
  position: relative;
`

const Searchbar = styled.input`
  box-sizing: border-box;
  padding: 20px 67px;
  min-width: 550px;
  border-radius: 100px;
  border: none;
  background: #f5f7fa;
  color: #718ebf;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  ::placeholder {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
`

const MagnifyingGlassIconWrapper = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  left: 30px;
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
