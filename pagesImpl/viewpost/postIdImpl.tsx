import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Header } from '@pagesImpl/__components__/Header'
import { ViewPostRecipe } from '@pagesImpl/__components__/ViewPostRecipe'

import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useDispatch, useSelector } from 'react-redux'
import { userDataAction, selectUserName, selectPassword } from '@lib/store/userData/userData.slice'
import { 
  recipeDataAction,
  selectPostID,
  selectIsPostIDNotEmpty, 
  selectRecipeDataVar, 
  selectIsRecipeDataVarValid,
  selectIsSubmitted,
} from '@lib/store/recipeData/recipeData.slice'


import React, { useState, useEffect, useRef } from 'react'
import Custom404 from '@pages/404'; // Import your custom 404 page


interface PostIdImplProps { //make sure postId is a string
  postId: string| string[] | undefined;
}

export interface IRData {
  title: string,
  createdAt: string,
  createdBy: number,
  edited: boolean,
  updatedAt: string,
  ratings: number[],
  ratingCount: number,
  calculatedRating: number,
  calories: number,
  serves: number,
  content: string[],
  time: number,
  tags: string[],
  appliances: string[],
  ingredients: string[],
  comments: string[],
}

const PostIdImpl: React.FC<PostIdImplProps> = ({ postId }) => { //main viewpostpage
  const dispatch = useDispatch()
  const isPostIDNotEmpty = useSelector(selectIsPostIDNotEmpty) //bool if pos postID
  const postID = useSelector(selectPostID)
  const recipeDataVar = useSelector(selectRecipeDataVar)
  const isSubmitted = useSelector(selectIsSubmitted)
  const isRecipeDataVarValid = useSelector(selectIsRecipeDataVarValid)

  // Check if postId exists before making the fetch request
  useEffect(() => {
    //set postID
    const postIDValue = Number(postId)
    if (isNaN(postIDValue)) {
      //non int postID
      console.error('postId is not a valid number')
    } 
    else {
      //possible valid int postID
      console.log('postIdValue:', postIDValue)
      dispatch(recipeDataAction.setPostID({ postID: postIDValue }))
      console.log('postID:', postID)
      if (postIDValue > 0) //positive postID
      { 
        dispatch(recipeDataAction.requestFlowGetRecipeById())
      }
    }
  }, [postId]) // Include postId as a dependency


  // update recipeDataTemp for recipe data
  const [recipeDataTemp, setRecipeDataTemp] = useState<IRData>(recipeDataVar);
  useEffect(() => {
    if (isSubmitted && isRecipeDataVarValid) {
      setRecipeDataTemp(recipeDataVar)
      console.log('Updated Recipe Data')
    }
  }, [isSubmitted, isRecipeDataVarValid]);
  

  return (
    <>
    {(isSubmitted && isRecipeDataVarValid) ? (
      <PageImplView>
      <Header />
      <MainBackgroundWrapper>

        <FloatingCardWrapper>
          <ViewPostRecipe recipeId={recipeDataTemp} rDataTemp={recipeDataTemp}/>
        </FloatingCardWrapper>

      </MainBackgroundWrapper>
    </PageImplView>
    ) : (
      <Custom404 />
    )}
    </>
  );
};
export default PostIdImpl;



const MainBackgroundWrapper = styled.div`
  display: flex;
  flex-flow: row;
  background: #f5f7fa;
`
const FloatingCardWrapper = styled.div`
  border-radius: 25px;
  background: white;
  width: 850px;
  margin: 20px auto 20px auto;
  @media (max-width: 800px) {
    width: auto;
  }
  font-family: 'Inter';
  font-style: normal;
  font-size: 16px;
  color: #343c6a;
`

