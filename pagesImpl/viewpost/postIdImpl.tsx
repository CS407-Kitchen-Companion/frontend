import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Header } from '@pagesImpl/__components__/Header'
import { StarRating } from '@pagesImpl/__components__/StarRating'
import { MoreVertButton } from '@pagesImpl/__components__/MoreVertButton'
import { Tags } from '@pagesImpl/__components__/Tags'
import { ViewPostRecipe } from '@pagesImpl/__components__/ViewPostRecipe'




import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useDispatch, useSelector } from 'react-redux'
import { userDataAction, selectUserName, selectPassword } from '@lib/store/userData/userData.slice'
import { 
  recipeDataAction, 
  setPostID,
  selectRecipeData,
  selectPostID,
  selectIsPostIDNotEmpty, 
  selectRecipeDataVar, 
  selectIsRecipeDataVarValid,
  selectIsSubmitted,
  recipeDataReducer,
  IRecipeDataVar,
} from '@lib/store/recipeData/recipeData.slice'


import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Custom404 from '@pages/404'; // Import your custom 404 page


import styles from '@pagesImpl/__components__/Button.module.css'
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PushPinIcon from '@mui/icons-material/PushPin';
import fish from 'public/fish_post_dummy.jpg';


interface PostIdImplProps { //make sure postId is a string
  postId: string| string[] | undefined;
}

export interface IRData {
  title: string,
  createdAt: string,
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
    const postIDValue = Number(postId);
    if (isNaN(postIDValue)) {
      //non int postID
      console.error('postId is not a valid number');
    } 
    else {
      //possible valid int postID
      console.log('postIdValue:', postIDValue);
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
      setRecipeDataTemp(recipeDataVar);
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
          <ViewPostRecipe rDataTemp={recipeDataTemp}/>
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
const StyledLine = styled.hr`
  border: none;
  height: 3px;
  background-color: #f5f7fa; /* Change 'red' to any color you want */
`
const SectionTitles = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  display: flex;
  align-items: center;
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
/* sections within the floating card for viewing posts */
const ViewPostSectionWrapper = styled.div`
  padding: 1em 2em 0.5em 2em;
`
const DivFlexCenter = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`
const DivFlex = styled.div`
  display: flex;
`
const AlignRight = styled.div`
  align-items: right;
  text-align: right;
  float: right;
`
const Gap = styled.div`
  margin-left: 60px;
  margin-right: 60px;
`

