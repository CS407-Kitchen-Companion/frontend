import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRData } from '@pagesImpl/viewpost/postIdImpl'
import { CommentImgPopUp } from '@pagesImpl/__components__/CommentImgPopUp'
import { CircleAvatar } from '@pagesImpl/__components__/CircleAvatar'

import Link from 'next/link'
import Image from 'next/image'
import styles from '@pagesImpl/__components__/Button.module.css'

export interface ICommentSection {
  commentSection: IComment[],
}

//comments can have string content, images, an replies
export interface IComment {
  userId: number,
  content: string,
  hasImages: boolean,
  images: string[],
  hasReplies: boolean,
  replies: IReply[],
}

//replies can have just string content
export interface IReply {
  userId: number,
  content: string,
}


// Display comment section for viewing a recipe
export const CommentSection = ({ commentSection }: { commentSection: ICommentSection }) => {
  const commentData: ICommentSection = { ...commentSection }
  
  console.log("commentData", commentData)

  return (
    <>
      <br/>
      <CreateComment/>
      <br/>
      <OneMarginWrapper>
        {commentData.commentSection.map((cmt: IComment, index: number) => (
          <div key={index} className="cmt">
            {/** TODO: use function to grab all user data */}
            <Comment
              key={index}
              username={`User ID: ${cmt.userId}`} // Use userId as temporary username
              content={cmt.content}
              hasImages={cmt.hasImages}
              images={cmt.images}
            />
            {/** comment replies */} 
            {cmt.hasReplies && (
              <ReplySection replies={cmt.replies}></ReplySection>
            )}
          </div>
        ))}      
      </OneMarginWrapper>
    </>
  )
}

//base comment structure with user data, string content, and possible images 
const Comment = ({ username, content, hasImages, images}: { username: string; content: string, hasImages: boolean, images: string[]}) => {

  return (
    <>
      <CommentWrapper>
        <CircleAvatar />
        <CommentContentWrapper>
          <Username>@{username}</Username>
          <Content>
            <div> {content} </div>
            {hasImages && (
              <CommentImgPopUp 
              username={username}
              content={content}
              images={images} 
              />
            )}
          </Content>
          <CreateReply/>
        </CommentContentWrapper>
      </CommentWrapper>
    </>
  )
}

// basic reply structure with no images, user data, and string content
const Reply = ({ username, content}: { username: string; content: string }) => {
  return (
    <>
      <CommentWrapper>
        <CircleAvatar />
        <CommentContentWrapper>
          <Username>@{username}</Username>
          <Content>
            <div> {content} </div>
          </Content>
          <CreateReply/>
        </CommentContentWrapper>
      </CommentWrapper>
    </>
  )
}

//view reply section
const ReplySection = ({ replies }: {replies: IReply[]})  => {
  const [isVisible, setIsVisible] = useState(false)

  const upTriangle = "▴"
  const downTriangle = "▾"
  const [whatTri, setTri] = useState(downTriangle)

  const numberOfReplies = replies.length

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
    if (isVisible === true)
      setTri(downTriangle)
    else
      setTri(upTriangle)
  }

  return (
    <>
      <div className="replies">
        <ReplyWrapper>
        <ViewReplyButton onClick={toggleVisibility}> {whatTri} {numberOfReplies} replies</ViewReplyButton>
        {isVisible && (
          <OneMarginWrapper>
            {replies.map((reply: IReply, replyIndex: number) => (
              <div key={replyIndex} className="reply">
                <Reply
                  key={replyIndex}
                  username={`User ID: ${reply.userId}`} // Use userId as temporary username
                  content={reply.content}
                />
              </div>
            ))}
          </OneMarginWrapper>
        )}
        </ReplyWrapper>
      </div>
    </>
  )
}

//input text comment
const CreateComment = () => {
  const [inputValue, setInputValue] = useState('')
  const [isActive, setActive] = useState(false)

  const handleFocus = () => {
    console.log('active')
    setActive(true)
  }

  //cancel button
  const handleCancel = () => {
    setInputValue('')
    setActive(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputValue != ''){
      console.log('submit comment', inputValue)
      setInputValue('')
      setActive(false)
    }
    else {
      console.log('cannot submit empty string')
    }
  }

  return (
    <>
      <CommentForm onSubmit={handleInputSubmit}>
        <AvatarCreateCommentWrapper>
          <CircleAvatar/>
        </AvatarCreateCommentWrapper>
        <CommentStringInput
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus} 
          placeholder="Add a Comment..."
        />
        {isActive && (
        <> 
        <br/>
        <br/>
        <SubButton onClick={handleCancel}> Cancel </SubButton>
        <BlueButton type="submit" >Submit</BlueButton>
        </>
      )}
      </CommentForm>
    </>
  )
}

//input text reply
const CreateReply = () => {
  //TODO: connect to backend

  const [inputValue, setInputValue] = useState('')
  const [isActive, setActive] = useState(false)

  //create reply
  const handleReply = () => {
    setActive(true)
  }

  //cancel button
  const handleCancel = () => {
    setInputValue('')
    setActive(false)
  }

  //input reply text
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  //submit reply
  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputValue != ''){
      console.log('submit reply', inputValue)
      setInputValue('')
      setActive(false)
    }
    else {
      console.log('cannot submit empty string')
    }
  }

  return (
    <>
      <ReplyButton onClick={handleReply}>Reply</ReplyButton>

      {isActive && (
        <CommentForm onSubmit={handleInputSubmit}>

          <AvatarCreateCommentWrapper>
            <CircleAvatar/>
          </AvatarCreateCommentWrapper>
          <CommentStringInput
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Add a Reply..."
          />

          <br/><br/>
          <SubButton onClick={handleCancel}> Cancel </SubButton>
          <BlueButton type="submit" >Submit</BlueButton>
        </CommentForm>
    )}
    </>
  )
}


const CommentForm = styled.form`
  display: block;
  position: relative;
`

//styled comment input text box
const CommentStringInput = styled.input`
  box-sizing: border-box;
  padding: 20px 67px;
  width: 100%;
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
const SubButton = styled.button`
  display: inline-block; 
  padding: 10px 20px;
  border-radius: 25px;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  font-weight: 600;
  color: #343C6A; /* Text color */

  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #e4e9f2; /* Background color on hover */
  }
  &:active {
    background-color: #d3dce9; /* Background color when clicked */
  }
`
const BlueButton = styled.button`
  display: inline-block; 
  padding: 10px 20px;
  border-radius: 25px;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  font-weight: 600;
  color: #fff; /* Text color */

  background-color: #1814f3;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #0f0ce2; /* Background color on hover */
  }
  &:active {
    background-color: #0c09b1; /* Background color when clicked */
  }
`

//indent replies
const ReplyWrapper = styled.div`
  margin-left: 3em;
`
const OneMarginWrapper = styled.div`
  margin-left: 0.5em;
`
const ReplyButton = styled.button`
  display: inline-block; 
  padding: 5px 10px;
  border-radius: 25px;
  font-family: inherit;
  font-size: 12px;
  font-style: inherit;
  font-weight: 600;
  line-height: inherit;

  color: #B1B1B1;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #e4e9f2; /* Background color on hover */
  }
  &:active {
    background-color: #d3dce9; /* Background color when clicked */
  }
`
const ViewReplyButton = styled.button`
  display: inline-block; 
  padding: 10px 20px;
  border-radius: 25px;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  color: #396aff; /* Text color */
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #e4e9f2; /* Background color on hover */
  }
  &:active {
    background-color: #d3dce9; /* Background color when clicked */
  }
`

// Define the CommentWrapper styled component
const CommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.5em;
`;



const AvatarCreateCommentWrapper = styled.div`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
`

// Define the CommentContentWrapper styled component for the username and content on the right
const CommentContentWrapper = styled.div`
  flex: 1;
`;

// Define the Username styled component for the username
const Username = styled.h3`
  margin: 0;
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  color: #343c6a;
`;

// Define the Content styled component for the string content
const Content = styled.div`
  margin: 0;
  display: block;
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
`



