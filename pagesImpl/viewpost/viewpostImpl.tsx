import styled from '@emotion/styled'
import React, { useState } from 'react';
import Link from 'next/link'


import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import styles from '@pagesImpl/__components__/Button.module.css'
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PushPinIcon from '@mui/icons-material/PushPin';


/**npm install @mui/icons-material */




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
  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the state
    setIsSticky(!isSticky); 
  };

  return (
    <PageImplView children={undefined}>
      <MainBackgroundWrapper>
        <h1>Viewing a Post</h1>
        <FloatingCardWrapper>
          <div>
            <CardPostImg></CardPostImg>
            <AuthorIcon></AuthorIcon>
            <MoreVertButton/>
            <ViewPostSectionWrapper>
              <br/><br/>
              <div>
                <TitleText>Lemon Yummy Salmon <SaveButton/> </TitleText>
                <DivFlex>
                  <AuthorAndDate> Author:  </AuthorAndDate>
                  <AuthorAndDate><Link href="/main"> AuthorName </Link></AuthorAndDate>
                  <AuthorAndDate> | </AuthorAndDate>
                  <AuthorAndDate>Updated insert_date_here</AuthorAndDate>
                </DivFlex>
                <DivFlex>
                  <ServingCalorieTime> Serves 2</ServingCalorieTime>
                  <ServingCalorieTime>257 Calories (Jump to Nutrition Facts)</ServingCalorieTime>
                  <ServingCalorieTime><AccessTimeIcon/> 20 min</ServingCalorieTime>
                </DivFlex>   
              </div>     
            </ViewPostSectionWrapper>
          </div>

          <DivSticky isSticky={isSticky}>
            <ViewPostSectionWrapperNoBar>
              <AlignRight>
                <StyledPinButton onClick={handleClick} title="Pin Ingredients" textColor={isClicked ? 'red' : null } >
                  <PushPinIcon sx={{ fontSize: 40 }} />
                </StyledPinButton>            
              </AlignRight>
                <SectionTitles>Ingredients</SectionTitles>
                <StyledList>
                    <li>1 lemon, thinly sliced</li>
                    <li>4 sprigs fresh rosemary</li>
                    <li>2 salmon fillets, bones and skin removed</li>
                    <li>coarse salt to taste</li>
                    <li>1 tablespoon olive oil, or as needed</li>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Coffee</li>
                    <li>Tea</li>
                    <li>Milk</li>
                </StyledList>
            </ViewPostSectionWrapperNoBar>
          </DivSticky>
            
            <ViewPostSectionWrapper>
                <SectionTitles>Appliances</SectionTitles>
                <StyledList>
                    <li>Oven</li>
                    <li>Refrigerator</li>
                </StyledList>
            </ViewPostSectionWrapper>
            <ViewPostSectionWrapper>
                <SectionTitles>Directions</SectionTitles>
                <h3>Step 1</h3>
                <div>Preheat the oven to 400 degrees F (200 degrees C).</div>
                <h3>Step 2</h3>
                <div>
                Arrange half the lemon slices in a single layer in a baking dish. 
                Layer with 2 sprigs rosemary, and top with salmon fillets. 
                Sprinkle salmon with salt, layer with remaining rosemary sprigs, and top with remaining lemon slices. 
                Drizzle with olive oil.
                </div>
                <h3>Step 3</h3>
                <div>
                Bake 20 minutes in the preheated oven, or until fish is easily flaked with a fork.
                </div>
            </ViewPostSectionWrapper>
            <ViewPostSectionWrapper>
                <div>
                  <button type="button" className={styles.main_black}> I made this! </button>
                  <button type="button" className={styles.circle_grey}><ShareIcon sx={{color: "#C5C5CF"}} fontSize="medium"/></button>
                </div>
            </ViewPostSectionWrapper>
            <ViewPostSectionWrapper>
                <SectionTitles>Nutrition Facts</SectionTitles>
            </ViewPostSectionWrapper>
            <ViewPostSectionWrapperNoBar>
                <SectionTitles>Tags</SectionTitles>
            </ViewPostSectionWrapperNoBar>
        </FloatingCardWrapper>
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
  top: 330px; left: 47%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #FFE0EB;
`

/* img header for viewing posts*/
const CardPostImg = styled.div`
  width: auto;
  height: 300px;
  background: blue;
  border-radius: 25px 25px 0px 0px;
`
/*grey background */
const MainBackgroundWrapper = styled.div`
  background: #f5f7fa;
  padding-bottom: 1em;   
  font-family: Inter;
`
/* floating card for viewing posts */
const FloatingCardWrapper = styled.div`
  border-radius: 25px;
  background: white;
  margin-left: 20%;
  margin-right: 20%;
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
/* two column layout for bullet lists */
const StyledList = styled.ul`
  list-style: disc;

  /* Responsive two-column layout */
  @media (min-width: 768px) {
    columns: 2;
    column-gap: 10px;
  }
`

