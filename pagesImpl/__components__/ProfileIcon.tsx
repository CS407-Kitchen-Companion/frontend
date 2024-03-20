import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { isUndefined } from 'lodash'
import { useState } from 'react'
import { CloseIcon } from '@pagesImpl/__components__/CloseIcon'
import { useRouter } from 'next/navigation'
import {  useSelector } from 'react-redux'
import { userDataAction, selectUserName } from '@lib/store/userData/userData.slice'

export const ProfileIcon: React.FC = () => {
  const router = useRouter()
  // TODO: FIX IT to show profile window when logined - IF NOT then show login button as youtube
  const [isProfileClicked, setIsProfileClicked] = useState(false)
  const [username] = useState(useSelector(selectUserName));

  const onClickProfileImage = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsProfileClicked(!isProfileClicked)
  }
  const onClickProfileWindowCloseIcon = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsProfileClicked(false)
  }

  const onClickMyPosts = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    router.push('/profile')
  }

  const onClickInteractions = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    router.push('/interactions')
  }

  const onClickNotifications = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    router.push('/notifications')
  }

  const onClickSettings = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    router.push('/settings')
  }

  const onClickLogout = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    // TODO: LOG OUT
    router.push('/login')
    console.log('LOG OUT')
  }
  return (
    <ProfileIconWrapper>
      <ProfileImage onClick={onClickProfileImage} />
      <ProfileWindow isClicked={isProfileClicked}>
        <ProfileWrapper>
          <ProfileName>{username}</ProfileName>
          <ProfileTaskList>
            <ProfileTaskListItem onClick={onClickMyPosts}>My Posts</ProfileTaskListItem>
            <ProfileTaskListItem paddingTop={17} onClick={onClickInteractions}>
              Interactions
            </ProfileTaskListItem>
            <ProfileTaskListItem paddingTop={17} onClick={onClickNotifications}>
              Notifications
            </ProfileTaskListItem>
            <ProfileTaskListItem paddingTop={17} onClick={onClickSettings}>
              Profile / Settings
            </ProfileTaskListItem>
            <ProfileTaskListItem paddingTop={17} onClick={onClickLogout}>
              Log out
            </ProfileTaskListItem>
          </ProfileTaskList>
        </ProfileWrapper>
        <CloseIconWrapper onClick={onClickProfileWindowCloseIcon}>
          <CloseIcon />
        </CloseIconWrapper>
      </ProfileWindow>
    </ProfileIconWrapper>
  )
}

const ProfileIconWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: #ffbb38;
`

const ProfileWindow = styled.div<{ isClicked: boolean }>`
  ${({ isClicked }) => css`
    ${isClicked
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}
    position: absolute;
    top: calc(100% + 18px);
    right: 0px;
    box-sizing: border-box;
    width: 221px;
    height: 266px;
    padding: 15px 17px 17px 19px;
    display: flex;
    flex-flow: row;
    flex-shrink: 0;
    border-radius: 25px;
    border: 3px solid #f5f7fa;
    background: #fff;
    transition:
      visibility 0s,
      opacity 0.5s ease;
  `}
`

const ProfileWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 4px;
  font-family: Inter;
  font-style: normal;
  line-height: normal;
`

const ProfileName = styled.div`
  word-break: break-all;
  font-size: 20px;
  font-weight: 700;
`

const ProfileTaskList = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 15px;
  font-weight: 500;
  margin-top: 13px;
`

const ProfileTaskListItem = styled.div<{ paddingTop?: number }>`
  ${({ paddingTop }) => css`
    ${!isUndefined(paddingTop) &&
    css`
      padding-top: ${paddingTop}px;
    `}
  `}
`
const CloseIconWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 20px;
`
