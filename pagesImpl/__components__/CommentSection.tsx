import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRData } from '@pagesImpl/viewpost/postIdImpl'
import { CommentImgPopUp } from '@pagesImpl/__components__/CommentImgPopUp'
import { CircleAvatar } from '@pagesImpl/__components__/CircleAvatar'
import { ShowWhenHover, IconDiv, PopupBody, PopupOption } from '@pagesImpl/__components__/PopUp'
import { HorizontalLine } from '@pagesImpl/__components__/HorizontalLine'
import { MoreVertButtonIcon } from '@pagesImpl/__components__/MoreVertButton'

import Link from 'next/link'
import Image from 'next/image'
import styles from '@pagesImpl/__components__/Button.module.css'
import {
  Unstable_Popup as BasePopup,
  PopupPlacement,
} from '@mui/base/Unstable_Popup';

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
            commentId={cmt.id}
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
//fetchComments= function to update comment data
const Comment = ({ commentId, username, content, hasImages, images, fetchComments}: { commentId: number; username: string; content: string, hasImages: boolean, images: string[], fetchComments: FetchCommentsFunction}) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [iconVisible, setIconVisible] = React.useState<boolean>(false);
  const [keepIconVisible, setKeepIconVisible] = React.useState<boolean>(false);
  const [wantEditComment, setwantEditComment] = useState(false);
  
  const { editComHTML, isEditActive } = EditComment({ parentCommentId: commentId, content: content, fetchComments: fetchComments });
  

  const handleMouseEnter = () => {
    setIconVisible(true);
  };
  const handleMouseLeave = () => {
    setIconVisible(false);
  };

  //click on vert icon
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
    setIconVisible(true);
    setKeepIconVisible(!keepIconVisible);
  };

  //edit comment
  const handleEditComment = () => {
    setwantEditComment(true);
    console.log('EDIT comment');
    setKeepIconVisible(false);
    setAnchor(null); // Close the BasePopup when editing is clicked
  };

  //TODO: delete comment
  const handleDeleteComment = () => {
    console.log('DELETE comment');
    setKeepIconVisible(false);
    setAnchor(null); // Close the BasePopup when editing is clicked
  };

  // Effect hook to listen for changes in isEditActive  to close
  useEffect(() => {
    if (!isEditActive)
    {
      setwantEditComment(false);
    }
    
  }, [isEditActive]);

  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
    {/* edit comment */}
    {wantEditComment ? (
        editComHTML // Render the editComHTML returned from EditComment
      ) : (
      <CommentWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} 
        >
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
          <CreateReply parentCommentId={commentId} fetchComments={fetchComments}/>
          
        </CommentContentWrapper>
        <>
          {/* edit and delete comment */}
          <ShowWhenHover
            onClick={handleClick}
          >
            <IconDiv visible={iconVisible || keepIconVisible}>
              <MoreVertButtonIcon/>
            </IconDiv>
            
          </ShowWhenHover>
          <BasePopup id={id} open={open} anchor={anchor} placement="bottom-end">
            <PopupBody>
              <PopupOption onClick={handleEditComment}> Edit Comment</PopupOption>
              <HorizontalLine />
              <PopupOption style={{ color: 'red' }} onClick={handleDeleteComment}> Delete Comment</PopupOption>
            </PopupBody>
          </BasePopup>
        </>
      </CommentWrapper>
    )}
      
    </>
  )
}



// basic reply structure with no images, user data, and string content
const Reply = ({parentId, replyId, username, content, fetchComments}: { parentId: number; replyId: number; username: string; content: string; fetchComments: FetchCommentsFunction}) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [iconVisible, setIconVisible] = React.useState<boolean>(false);
  const [keepIconVisible, setKeepIconVisible] = React.useState<boolean>(false);
  const [wantEditReply, setwantEditReply] = useState(false);
  
  const { editComHTML, isEditActive } = EditReply({ parentCommentId: parentId, replyId: replyId, content: content, fetchComments: fetchComments });
  

  const handleMouseEnter = () => {
    setIconVisible(true);
  };
  const handleMouseLeave = () => {
    setIconVisible(false);
  };

  //click on vert icon
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
    setIconVisible(true);
    setKeepIconVisible(!keepIconVisible);
  };

  //edit reply
  const handleEditReply = () => {
    setwantEditReply(true);
    console.log('EDIT reply');
    setKeepIconVisible(false);
    setAnchor(null); // Close the BasePopup when editing is clicked
  };

  //TODO: delete reply
  const handleDeleteComment = () => {
    console.log('DELETE reply');
    setKeepIconVisible(false);
    setAnchor(null); // Close the BasePopup when editing is clicked
  };

  // Effect hook to listen for changes in isEditActive  to close
  useEffect(() => {
    if (!isEditActive)
    {
      setwantEditReply(false);
    }
    
  }, [isEditActive]);

  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;
  
  return (
    <>
    {/* edit reply */}
    {wantEditReply ? (
        editComHTML // Render the editComHTML returned from EditReply
      ) : (
      <CommentWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} 
        >
        <CircleAvatar />
        <CommentContentWrapper>
          <Username>@{username}</Username>
          <Content>
            <div> {content} </div>
          </Content>
          <CreateReply parentCommentId={parentId} fetchComments={fetchComments}/>
          
        </CommentContentWrapper>
        <>
          {/* edit and delete comment */}
          <ShowWhenHover
            onClick={handleClick}
          >
            <IconDiv visible={iconVisible || keepIconVisible}>
              <MoreVertButtonIcon/>
            </IconDiv>
            
          </ShowWhenHover>
          <BasePopup id={id} open={open} anchor={anchor} placement="bottom-end">
            <PopupBody>
              <PopupOption onClick={handleEditReply}> Edit Reply</PopupOption>
              <HorizontalLine />
              <PopupOption style={{ color: 'red' }} onClick={handleDeleteComment}> Delete Reply</PopupOption>
            </PopupBody>
          </BasePopup>
        </>
      </CommentWrapper>
    )}

     
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
                  parentId={parentId}
                  replyId={reply.id}
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
    //console.log('active')
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

//edit parent comment
const EditComment = ({ parentCommentId, content, fetchComments}: {parentCommentId: number; content: string; fetchComments: FetchCommentsFunction}) => {
  //TODO: connect to backend

  const [inputValue, setInputValue] = useState(content);
  const [isActive, setActive] = useState(true)
  
  //user activly uses edit
  const handleMouseEnter = () => {
    //console.log('active')
    setActive(true)
  };

  //cancel button
  const handleCancel = () => {
    //setInputValue('')
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
  
  
    //TODO: EDIT COMMENT
    if (inputValue != content)
      console.log('submitted edited comment:', inputValue);
    setActive(false);

    /*
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
      console.log('Edit Comment submitted successfully');
      fetchComments(1) //reload comments
    } catch (error) {
      console.error('Failed to submit reply:', error);
    } finally {
      setInputValue('');
      setActive(false);
    }
    */


  };
  

  return {
    editComHTML: (
    <>
      <CommentForm 
      onSubmit={handleInputSubmit}
      onMouseEnter={handleMouseEnter}
      >
        <AvatarCreateCommentWrapper>
          <CircleAvatar/>
        </AvatarCreateCommentWrapper>
        
        <CommentStringInput
          type="text"
          value={inputValue}
          onChange={handleChange}
        />

        <br/><br/>
        <SubButton onClick={handleCancel}> Cancel </SubButton>
        <BlueButton type="submit" >Submit</BlueButton>
      </CommentForm>
    </>
    ), 
    isEditActive: (isActive)
  }
}

//edit reply comment
const EditReply = ({ parentCommentId, replyId, content, fetchComments}: {parentCommentId: number; replyId: number; content: string; fetchComments: FetchCommentsFunction}) => {
  //TODO: connect to backend

  const [inputValue, setInputValue] = useState(content);
  const [isActive, setActive] = useState(true)
  
  //user activly uses edit
  const handleMouseEnter = () => {
    //console.log('active')
    setActive(true)
  };

  //cancel button
  const handleCancel = () => {
    //setInputValue('')
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
  
  
    //TODO: EDIT REPLY
    if (inputValue != content)
      console.log('submitted edited reply:', inputValue);
    setActive(false);

    /*
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
      console.log('Edit Comment submitted successfully');
      fetchComments(1) //reload comments
    } catch (error) {
      console.error('Failed to submit reply:', error);
    } finally {
      setInputValue('');
      setActive(false);
    }
    */


  };
  

  return {
    editComHTML: (
    <>
      <CommentForm 
      onSubmit={handleInputSubmit}
      onMouseEnter={handleMouseEnter}
      >
        <AvatarCreateCommentWrapper>
          <CircleAvatar/>
        </AvatarCreateCommentWrapper>
        
        <CommentStringInput
          type="text"
          value={inputValue}
          onChange={handleChange}
        />

        <br/><br/>
        <SubButton onClick={handleCancel}> Cancel </SubButton>
        <BlueButton type="submit" >Submit</BlueButton>
      </CommentForm>
    </>
    ), 
    isEditActive: (isActive)
  }
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

// Define the CommentWrapper styled component
const CommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.5em;
  margin-left: 0.5em;

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



