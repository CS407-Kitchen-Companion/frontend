import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRData } from '@pagesImpl/viewpost/postIdImpl'


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
  numberOfImages: number,
  images: string[],
  numberOfReplies: number,
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
      <OneMarginWrapper>
        {commentData.commentSection.map((comment: IComment, index: number) => (
          <div key={index} className="comment">
            {/** TODO: use function to grab all user data */}
            <Comment
            key={index}
            username={`User ID: ${comment.userId}`} // Use userId as temporary username
            content={comment.content}
          />
            {/** TODO: images
            <p>Number of Images: {comment.numberOfImages}</p>
            {comment.images.map((image: string, imageIndex: number) => (
              <img key={imageIndex} src={image} alt={`Image ${imageIndex + 1}`} />
            ))}
            */}

            {comment.numberOfReplies > 0 && (
              <Replies replies={comment.replies}></Replies>
            )}
          </div>
        ))}      
      
      </OneMarginWrapper>
      
    </>
  );
};

// Comment component using the styled components
const Comment = ({ username, content }: { username: string; content: string }) => {
  return (
    <CommentWrapper>
      <CircleAvatar />
      <CommentContentWrapper>
        <Username>@{username}</Username>
        <Content>{content}</Content>
        <ReplyButton>Reply</ReplyButton>
      </CommentContentWrapper>
    </CommentWrapper>
  )
}

//view reply section
const Replies = ({ replies }: {replies: IReply[]})  => {
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
                <Comment
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
    console.log('cancel comment')
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
    

      <p>You entered: {inputValue}</p>
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
const ReplyButton = styled.div`
  font-family: inherit;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 25px;
  color: #B1B1B1;
`
const ViewReplyButton = styled.div`
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

// Define the CircleAvatar styled component for the circle on the left
const CircleAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 15px;
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
const Content = styled.p`
  margin: 0;
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
`;

