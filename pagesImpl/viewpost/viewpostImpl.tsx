import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'


import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { Header } from '@pagesImpl/__components__/Header'

import styles from '@pagesImpl/__components__/Button.module.css'
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PushPinIcon from '@mui/icons-material/PushPin';

import fish from 'public/fish_post_dummy.jpg';

/**npm install @mui/icons-material */
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
};


const RatingContainer = styled.div`
  display: flex;
`;

const Star = styled.span`
  font-size: 50px;
  color: ${props => (props.filled ? "#ffc107" : "#e4e5e9")};
  transition: color 0.2s;

  &:hover {
    color: #ff5733;
  }
`;


/* img header for viewing posts*/
const HeaderImageDiv = styled.div`
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
const HeaderImage = ({ headerImageURL }) => {

  return (
    <CardPostImg>
      <HeaderImageDiv ImageURL={headerImageURL}/>
    </CardPostImg>
    
  );
};

/** Author **/
const authorImageStyle = {
  borderRadius: '50%',
  border: '1px solid #fff',
}
const AuthorProfileImage = () => {
  return (
    <div>
      <Image src={fish} 
      width={90}
      height={90}
      placeholder = 'empty'
      alt="Picture of the author"
      style={authorImageStyle}/>
    </div>
  );
};

/** direction step list**/
const StepList = ({ steps }) => {
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

const TwoColumnStyledList = styled.ul`
  list-style-type: disc;
  padding: 0 0 0 1em;
  //display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Adjust the column width as needed */
  gap: 20px; /* Adjust the gap between columns */
  
  li {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  @media (min-width: 700px) {
    columns: 2;
    column-gap: 20px;
  }
`;

/* two column layout for bullet lists */
const TwoStyledList = ({ items }) => {
  return (
    <TwoColumnStyledList>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </TwoColumnStyledList>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
`;

const Step = styled.div`
  margin-bottom: 10px;
`;
const Gap = styled.div`
  margin-left: 60px;
  margin-right: 60px;
`;
const StepHeader = styled.h3`
  margin-bottom: 5px;
`;

const StepInstructions = styled.p`
  margin-bottom: 0;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  width: 40%;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;
/** checkbox **/
const CheckboxStyledList = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((checkedItem) => checkedItem !== item));
      console.log("DELETED ",(item))
    } else {
      setCheckedItems([...checkedItems, item]);
      
      console.log("ADDED ",(item))
    }
  };

  return (
    <div>
      <List>
        {items.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={checkedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            <label htmlFor={`checkbox-${index}`}>{item}</label>
          </li>
        ))}
      </List>
      {/* 
      <CheckedList>
        {checkedItems.length > 0 && (
          <p>Checked List: {checkedItems.join(', ')}</p>
        )}
      </CheckedList>
       */}
    </div>
  );
};

const List = styled.ul`
  list-style-type: none;
  padding: 0 0 0 1em;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #343C6A;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  input[type='checkbox'] {
    margin-right: 0.5rem;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #343C6A;
    outline: none;
    cursor: pointer;
  }

  input[type='checkbox']:checked {
    background-color: #343C6A;
    //border-color: #343C6A;
  }

  label {
    cursor: pointer;
  }

  /* Responsive two-column layout */
  @media (min-width: 700px) {
    columns: 2;
    column-gap: 10px;
  }
`;

const CheckedList = styled.div`
  margin-top: 1rem;
`;




/**saved button */
const StyledSaveButton = styled.button`
  text-align: center;
  color: ${props => props.textColor || 'lightgrey'};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease; // Transition for color change
  
`;
function SaveButton() {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    
    setIsClicked(!isClicked); // Toggle the state
  };
  return (
    <StyledSaveButton onClick={handleClick} title="Save Recipe" textColor={isClicked ? 'red' : null }>
      <BookmarkIcon sx={{ fontSize: 40 }} />
    </StyledSaveButton>
  );
}

/**three dot more button**/
const StyledMoreVertButton = styled.button`
  padding: 10px 10px;
  color: ${props => props.textColor || 'lightgrey'};
  background-color: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const MoreVertButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the state
  };
  return (
    <AlignRight>
      <StyledMoreVertButton onClick={handleClick} textColor={isClicked ? 'black' : null}>
        <MoreVertIcon sx={{ fontSize: 30 }}/>
      </StyledMoreVertButton>
    </AlignRight>
    
  );
};

const ViewPostImpl = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // temp string inputs
  const headerImageURL = '/fish_post_dummy.jpg';
  const groceryItems = ["Apples peeled", "Bananas", "Milk", "Bread", "Eggs", "Coffee", "a pinch of salt", "item1", "item2", "item3", "item4", "item5"];
  const steps = [
    'Preheat the oven to 400 degrees F (200 degrees C).',
    'Arrange half the lemon slices in a single layer in a baking dish. Layer with 2 sprigs rosemary, and top with salmon fillets. Sprinkle salmon with salt, layer with remaining rosemary sprigs, and top with remaining lemon slices. Drizzle with olive oil.',
    'Bake 20 minutes in the preheated oven, or until fish is easily flaked with a fork.',
    'Do something else.',
    'Enjoy!!'
  ];

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the state
    setIsSticky(!isSticky); 
  };

  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch('https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/recipe/1');
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
  }, []);

  return (
    <PageImplView children={undefined}>
      <MainBackgroundWrapper>
        <Header/>
        {recipeData && (
        <div>
          <FloatingCardWrapper>
          <div> {/* title */}
          <HeaderImage headerImageURL={headerImageURL} ></HeaderImage>
           
            <AuthorIcon>
              <AuthorProfileImage/>
            </AuthorIcon>
            
            <MoreVertButton/>
            <ViewPostSectionWrapper>
              <br/><br/>
              <div>
                <DivFlex>
                <TitleText>{recipeData.title} <SaveButton/> </TitleText>
                <Gap></Gap>
                <StarRating/>

                </DivFlex>
                
                
                <DivFlex>
                  <AuthorAndDate> Author:  </AuthorAndDate>
                  {/*TODO: change link to author profile from id*/}
                  <AuthorAndDate><Link href="/main"> {recipeData.createdBy} </Link></AuthorAndDate>
                  <AuthorAndDate> | </AuthorAndDate>
                  <div>
                    {recipeData.edited ? (
                    <div>
                      <AuthorAndDate>Updated {recipeData.updatedAt}</AuthorAndDate>
                    </div>
                    ) : (
                      <div>
                        <AuthorAndDate>Created {recipeData.createdAt}</AuthorAndDate>
                      </div>
                    )}
                  </div>
                </DivFlex>
                <DivFlex>
                  <ServingCalorieTime> Serves {recipeData.serves}</ServingCalorieTime>
                  <ServingCalorieTime>{recipeData.calories} Calories (Jump to Nutrition Facts)</ServingCalorieTime>
                  <ServingCalorieTime><AccessTimeIcon/> {recipeData.time} min</ServingCalorieTime>
                </DivFlex>   
              </div>     
            </ViewPostSectionWrapper>
          </div>
          <DivSticky isSticky={isSticky} > {/* ingredients */}
            <ViewPostSectionWrapperNoBar>
              <AlignRight>
                <StyledPinButton onClick={handleClick} title="Pin Ingredients" textColor={isClicked ? 'red' : null } >
                  <PushPinIcon sx={{ fontSize: 40 }} />
                </StyledPinButton>            
              </AlignRight>
              <SectionTitles>Ingredients</SectionTitles>
              <CheckboxStyledList items={Object.entries(recipeData.ingredients).map(([ingredientName, ingredientAmount]) => (
                `${ingredientAmount} of ${ingredientName}`
              ))} />
            </ViewPostSectionWrapperNoBar>
          </DivSticky>
          <ViewPostSectionWrapper> {/* appliances */}
              <SectionTitles>Appliances</SectionTitles>
              <TwoStyledList items={recipeData.appliances}/>
          </ViewPostSectionWrapper>
          <ViewPostSectionWrapper> {/* directions */}
              <SectionTitles>Directions</SectionTitles>
              <StepList steps={recipeData.content}/>
          </ViewPostSectionWrapper>
          <ViewPostSectionWrapper> {/* buttons */}
              <div>
                <button type="button" className={styles.main_black}> I made this! </button>
                <button type="button" className={styles.circle_grey}><ShareIcon sx={{color: "#C5C5CF"}} fontSize="medium"/></button>
              </div>
          </ViewPostSectionWrapper>
          <ViewPostSectionWrapper> {/* nutrition facts */}
              <SectionTitles>Nutrition Facts</SectionTitles>
          </ViewPostSectionWrapper>
          <ViewPostSectionWrapperNoBar> {/* tags */}
              <SectionTitles>Tags</SectionTitles>
          </ViewPostSectionWrapperNoBar>
        </FloatingCardWrapper>
        </div>
      )}
      </MainBackgroundWrapper>
    </PageImplView>
  )
};
export default ViewPostImpl;

/** sticky ingredients pin */
const StyledPinButton = styled.button`
  display: float;
  border: none;
  color: ${props => props.textColor || '#F5F7FA'};
  background-color: transparent;
  transition: color 0.3s ease; // Transition for color change
`;
const DivSticky = styled.div`
  top: 0;
  position: ${props => props.isSticky ? 'sticky' : 'static'};
  background: white;
  border-bottom: 3px solid #f5f7fa;

`;


const SectionTitles = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  display: flex;
  align-items: center;

  color: #343C6A;
`

const AuthorAndDate = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  margin-right: 5px;
  color: #343C6A;
`
const ServingCalorieTime = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 350;
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-right: 25px;
  margin-top:10px;
  color: #B1B1B1;
`

/* author */
/* TODO: add author background img */
/* TODO: re-due position after add heading */
 
const AuthorIcon = styled.div`
  position: absolute;
  top: 420px; left: 48%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #FFE0EB;
`


/*grey background */
const MainBackgroundWrapper = styled.div`
  background: #f5f7fa;
  padding-bottom: 1em;   
  font-family: Inter;
  align: center;
`
/* floating card for viewing posts */
const FloatingCardWrapper = styled.div`
  border-radius: 25px;
  background: white;
  width: 850px;
  margin: 20px auto 20px auto;
  @media (max-width: 800px) {
    width: auto;
  }
`
/* sections within the floating card for viewing posts */
const ViewPostSectionWrapper = styled.div`
  border-bottom: 3px solid #f5f7fa;
  padding: 2em 1em 1em 2em;   
`
/* section tailored to ingredients and tags*/
const ViewPostSectionWrapperNoBar = styled.div`
  padding: 2em 1em 1em 2em;   
`

/* title text */
const TitleText = styled.div`
/* Lemon Yummy Salmon */
  width: 50%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  display: inline;
  align-items: center;
  color: #343C6A;
  display: block;
`


const DivFlex = styled.div`
  display:flex;
`
const AlignRight = styled.div`
  align-items: right;
  text-align: right;
  float: right;
`


