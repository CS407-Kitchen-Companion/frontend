import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRData } from '@pagesImpl/viewpost/postIdImpl'
import { CommentImgPopUp } from '@pagesImpl/__components__/CommentImgPopUp'
import { CircleAvatar } from '@pagesImpl/__components__/CircleAvatar'
import { MoreVertButtonIcon, SimplePopup} from '@pagesImpl/__components__/MoreVertButton'

import Link from 'next/link'
import Image from 'next/image'
import styles from '@pagesImpl/__components__/Button.module.css'

export interface ICommentSection {
  commentSection: IComment[],
}

//comments can have string content, images, an replies
export interface IComment {
  id: number;
  userId: number;
  authorUsername: string;
  content: string;
  hasImages: boolean;
  images: string[];
  hasReplies: boolean;
  replies: IReply[];
  parentCommentId?: number | null;
}

//replies can have just string content
export interface IReply {
  id: number;
  authorUsername: string,
  content: string,
}

type FetchCommentsFunction = (recipeId: number) => Promise<void>;


// Display comment section for viewing a recipe
export const CommentSection = ({ recipeId }: { recipeId: number }) => {
  const [comments, setComments] = useState<IComment[]>([]);

  //get comments on recipe post
  useEffect(() => {
    fetchComments(recipeId);
  }, [recipeId]);

  //grab comment data
  const fetchComments: FetchCommentsFunction = async (recipeId) => {
    try {
      //TODO: 
      const response = await fetch(`https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/api/comments/recipe/1`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data: { data: IComment[] } = await response.json();
      const processedComments = processComments(data.data);
      console.log('processedComments', processedComments);
      setComments(processedComments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  //map replies to comments
  function processComments(flatComments: IComment[]): IComment[] {
    const commentMap: { [key: number]: IComment } = {};
    const topLevelComments: IComment[] = [];
  
    flatComments.forEach((comment: IComment) => {
      commentMap[comment.id] = { ...comment, replies: [] };
    });
  
    flatComments.forEach((comment: IComment) => {
      if (comment.parentCommentId !== null && comment.parentCommentId !== undefined) {
        if (commentMap[comment.parentCommentId]) { // Ensure parent exists
          commentMap[comment.parentCommentId].replies.push(commentMap[comment.id]);
        } else {
          console.warn(`Missing parent comment for id ${comment.parentCommentId}`);
        }
      } else {
        topLevelComments.push(commentMap[comment.id]);
      }
    });
  
    return topLevelComments;
  }
  
  
  return (
    <>
      <br/>
      <CreateComment fetchComments={fetchComments}/>
      <br/>
      {comments.slice().reverse().map((cmt, index) => (
        <div key={index} className="cmt">
          <Comment
            id={cmt.id}
            username={cmt.authorUsername} // Adjust as necessary
            content={cmt.content}
            hasImages={cmt.hasImages}
            images={cmt.images}
            fetchComments={fetchComments}
          />
  
          {cmt.replies.length > 0 && (
            <ReplySection parentId={cmt.id} replies={cmt.replies} fetchComments={fetchComments} />
          )}
        </div>
      ))}
    </>
  );  
};

//base comment structure with user data, string content, and possible images 
//fetchComments={fetchComments}
const Comment = ({ id, username, content, hasImages, images, fetchComments}: { id: number; username: string; content: string, hasImages: boolean, images: string[], fetchComments: FetchCommentsFunction}) => {

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
          <CreateReply parentCommentId={id} fetchComments={fetchComments}/>
        </CommentContentWrapper>
        <SimplePopup></SimplePopup>
      </CommentWrapper>
    </>
  )
}

// basic reply structure with no images, user data, and string content
const Reply = ({id, username, content, fetchComments}: { id:number; username: string; content: string; fetchComments: FetchCommentsFunction}) => {
  return (
    <>
      <CommentWrapper>
        <CircleAvatar />
        <CommentContentWrapper>
          <Username>@{username}</Username>
          <Content>
            <div> {content} </div>
          </Content>
          <CreateReply parentCommentId={id} fetchComments={fetchComments}/>

        </CommentContentWrapper>
        <SimplePopup></SimplePopup>
      </CommentWrapper>
    </>
  )
}
//view reply section
//id : parent comment id
const ReplySection = ({ parentId, replies, fetchComments }: {parentId: number; replies: IReply[]; fetchComments: FetchCommentsFunction})  => {
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

  // Inside ReplySection component
  return (
    <>
      <div className="replies">
        <ReplyWrapper>
          <ViewReplyButton onClick={toggleVisibility}>
            {whatTri} {numberOfReplies} replies
          </ViewReplyButton>
          {isVisible && (
            <OneMarginWrapper>
              {replies.map((reply, replyIndex) => (
                <Reply
                  id={parentId}
                  key={replyIndex}
                  username={`${reply.authorUsername}`}
                  content={reply.content}
                  fetchComments={fetchComments}
                />
              ))}
            </OneMarginWrapper>
          )}
        </ReplyWrapper>
      </div>
    </>
  );

}

//input text comment
const CreateComment = ({ fetchComments }: { fetchComments: FetchCommentsFunction}) => {
  const [inputValue, setInputValue] = useState('')
  const [isActive, setActive] = useState(false)

  //user clicks into form
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

  //create comment
  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      console.log('Cannot submit empty string');
      return;
    }
    
    try {
      const payload = {
        recipe_id: 1,
        content: inputValue,
        // parent_comment_id: null,
      };
  
      const response = await fetch('https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/api/comments/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error('Network response was not ok.');
  
      console.log('Comment submitted successfully');
      fetchComments(1) //reload comments
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setInputValue('');
      setActive(false);
    }
  };

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
const CreateReply = ({ parentCommentId, fetchComments}: {parentCommentId: number; fetchComments: FetchCommentsFunction}) => {
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
  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      console.log('Cannot submit empty string');
      return;
    }
  
  
    try {
      const payload = {
        recipe_id: 1, // Ensure this is available in your component
        content: inputValue,
        parent_comment_id: parentCommentId, 
      };
  
      const response = await fetch('https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/api/comments/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any auth headers if necessary
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error('Network response was not ok.');
  
      // Optionally, update the comment section to include the new reply
      console.log('Reply submitted successfully');
      fetchComments(1) //reload comments
    } catch (error) {
      console.error('Failed to submit reply:', error);
    } finally {
      setInputValue('');
      setActive(false);
    }
  };
  

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
`;

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
`;
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
`;
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
`;

//indent replies
const ReplyWrapper = styled.div`
  margin-left: 3em;
`;
const OneMarginWrapper = styled.div`
  margin-left: 0.5em;
`;
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
`;
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
`;


const AvatarCreateCommentWrapper = styled.div`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
`;

/* 
const ShowWhenHover = styled.div`
  background-color: #ff0000;
  opacity: 0; 
  transition: opacity 0.3s ease; 
`;
*/

// Define the CommentWrapper styled component
const CommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.5em;


  //show icon nested in ShowWhenHover only shows when hover here
  &:hover .show-when-hover {
    opacity: 1;
  }
`;

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
`;



