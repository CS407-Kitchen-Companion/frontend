import styled from '@emotion/styled'
import React, { useState } from 'react';
import Link from 'next/link'


import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { Header } from '@pagesImpl/__components__/Header'

import styles from '@pagesImpl/__components__/Button.module.css'
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PushPinIcon from '@mui/icons-material/PushPin';


/**npm install @mui/icons-material */

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

const Container = styled.div`
  margin-bottom: 20px;
`;

const Step = styled.div`
  margin-bottom: 10px;
`;

const StepHeader = styled.h3`
  margin-bottom: 5px;
`;

const StepInstructions = styled.p`
  margin-bottom: 0;
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
  @media (min-width: 768px) {
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
  const groceryItems = ["Apples", "Bananas", "Milk", "Bread", "Eggs", "Coffee", "a pinch of salt", "item1", "item2", "item3", "item4", "item5"];
  const steps = [
    'Do something',
    'Do something else',
    'Do another thing',
  ];

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the state
    setIsSticky(!isSticky); 
  };

  return (
    <PageImplView children={undefined}>
      <MainBackgroundWrapper>
        <Header/>
        <FloatingCardWrapper>
          <div> {/* title */}
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
          <DivSticky isSticky={isSticky} > {/* ingredients */}
            <ViewPostSectionWrapperNoBar>
              <AlignRight>
                <StyledPinButton onClick={handleClick} title="Pin Ingredients" textColor={isClicked ? 'red' : null } >
                  <PushPinIcon sx={{ fontSize: 40 }} />
                </StyledPinButton>            
              </AlignRight>
              <SectionTitles>Ingredients</SectionTitles>
              <CheckboxStyledList items={groceryItems}/>
            </ViewPostSectionWrapperNoBar>
          </DivSticky>
          <ViewPostSectionWrapper> {/* appliances */}
              <SectionTitles>Appliances</SectionTitles>
              <StyledList>
                  <li>Oven</li>
                  <li>Refrigerator</li>
              </StyledList>
          </ViewPostSectionWrapper>
          <ViewPostSectionWrapper> {/* directions */}
              <SectionTitles>Directions</SectionTitles>
              <StepList steps={steps}/>
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
  top: 420px; left: 47%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #FFE0EB;
`

/* img header for viewing posts*/
const CardPostImg = styled.div`
  width: auto;
  height: 310px;
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
  margin: 20px 20% 20% 20%;
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

