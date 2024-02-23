import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { Filter } from '@pagesImpl/__components__/Filter'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'


import styles from '@pagesImpl/__components__/Button.module.css'
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PushPinIcon from '@mui/icons-material/PushPin';
import fish from 'public/fish_post_dummy.jpg';

interface PostIdImplProps { //make sure postId is a string
  postId: string | string[] | undefined;
}

const PostIdImpl: React.FC<PostIdImplProps> = ({ postId }) => { //main viewpostpage
  const router = useRouter();
  const [recipeData, setRecipeData] = useState(null);

  /** grab postId to view that recipe*/
  useEffect(() => {
    // Check if postId exists before making the fetch request
    if (postId) {
      const fetchRecipeData = async () => {
        try {
          const response = await fetch(`https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/recipe/${postId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch recipe data');
          }
          const responseData = await response.json();
          setRecipeData(responseData.data); // Extracting the data object from the response
        } catch (error) {
          console.error('Error fetching recipe data:', error);
        }
      };

      fetchRecipeData();
    }
  }, [postId]) // Include postId as a dependency

  return (
    <>
      {recipeData && (
        <PageImplView>
        <Header />


        <MainBackgroundWrapper>
         
        </MainBackgroundWrapper>
      </PageImplView>
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

/*img header for viewing posts */
const HeaderImage: React.FC<{ headerImageURL: string }> = ({ headerImageURL }) => {

  return (
    <CardPostImg>
      <HeaderImageDiv ImageURL={headerImageURL}/>
    </CardPostImg>
    
  );
};
const HeaderImageDiv = styled.div<{ ImageURL: string }>`
  width: 100%;
  height: 310px; 
  background-image: url(${props => props.ImageURL});
  background-size: cover; /* This ensures the image covers the entire div */
  background-position: center; 
  overflow: "hidden";
  border-radius: 25px 25px 0px 0px;
`;
const CardPostImg = styled.div`
  position: "relative"
  width: 100%;
  height: 310px;
  border-radius: 25px 25px 0px 0px;
  background-color: blue;
  overflow: "hidden";
`

/* recipe Author icon */
//TODO:make dynamic
const AuthorProfileImage = () => {
  return (
    <>
      <Image src={fish} 
      width={90}
      height={90}
      placeholder = 'empty'
      alt="Picture of the author"
      style={authorImageStyle}/>
    </>
  );
}
const authorImageStyle = {
  borderRadius: '50%',
  border: '3px solid #fff',
}



/* star rating */
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/recipe/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch rating');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setRating(data.data.calculatedRating);
      })
      .catch(error => {
        console.error('Error fetching rating:', error);
      });
  }, []);

  const handleRatingClick = (ratingValue) => {
    console.log('User rated:', ratingValue);
    setRating(ratingValue);
  
    if (!submitted) {
      fetch('https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/rating/new', {
        method: 'POST',
        body: JSON.stringify({ "recipe_id": 1, "rating": ratingValue }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSubmitted(true);
      })
      .catch(error => console.error('Error:', error));
    }
  };  

  const handleMouseOver = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          filled={i <= (hoverRating || rating)}
          onClick={() => handleRatingClick(i)}
          onMouseOver={() => handleMouseOver(i)}
          onMouseLeave={handleMouseLeave}
        >
          &#9733;
        </Star>
      );
    }
    return stars;
  };

  return (
    <div>
      {renderStars()}
      {submitted && (
        <SubmitButton onClick={() => setSubmitted(false)}>Confirm Rating</SubmitButton>
      )}
    </div>
  );
}
const RatingContainer = styled.div`
  display: flex;
`
const Star = styled.span`
  font-size: 50px;
  color: ${props => (props.filled ? "#ffc107" : "#e4e5e9")};
  transition: color 0.2s;
  &:hover {
    color: #ff5733;
  }
`

/* direction step list**/
const StepList: React.FC<{ steps: string[] }> = ({ steps }) => {
  return (
    <Container>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepHeader>Step {index + 1}</StepHeader>
          <StepInstructions>{step}</StepInstructions>
        </Step>
      ))}
    </Container>
  );
};
const Container = styled.div`
  margin-bottom: 20px;
`
const Step = styled.div`
  margin-bottom: 10px;
`
const StepHeader = styled.h3`
  margin-bottom: 5px;
`
const StepInstructions = styled.p`
  margin-bottom: 0;
`

