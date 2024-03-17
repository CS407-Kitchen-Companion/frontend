import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import { selectSearchedResults } from '@lib/store/searchData/searchData.slice'
import { Filter } from '@pagesImpl/__components__/Filter'
import { Header } from '@pagesImpl/__components__/Header'
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
  selectIsSubmitted,
  recipeDataReducer,
} from '@lib/store/recipeData/recipeData.slice'


import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Custom404 from '@pages/404'; // Import your custom 404 page


import styles from '@pagesImpl/__components__/Button.module.css'
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PushPinIcon from '@mui/icons-material/PushPin';
import fish from 'public/fish_post_dummy.jpg';

interface PostIdImplProps { //make sure postId is a string
  postId: string | undefined;
}

interface Recipe {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  comments: string[];
  ratings: number[];
  edited: boolean;
  serves: number;
  calories: number;
  time: number;
  ingredients: string[];
  appliances: string[];
  content: string[];
  tags: string[];
  ratingCount: number;
  calculatedRating: number;

  // Add other properties if needed
}

const PostIdImpl: React.FC<PostIdImplProps> = ({ postId }) => { //main viewpostpage
  const dispatch = useDispatch()
  const isPostIDNotEmpty = useSelector(selectIsPostIDNotEmpty) //bool if pos postID
  const postID = useSelector(selectPostID)
  const recipeDataVar = useSelector(selectRecipeDataVar)
  const isSubmitted = useSelector(selectIsSubmitted)
  
  
  


  const [recipeData, setRecipeData] = useState<Recipe | null>(null);
  const [error, setError] = useState(false);
  const [isClicked, setIsClicked] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  const headerImageURL = '/spaget.jpg'   // temp string inputs

  const handleClick = () => {
    //for pin button on ingredients
    setIsClicked(!isClicked) // Toggle the state
    setIsSticky(!isSticky)
  }

  /** grab postId to view that recipe*/
  useEffect(() => {

    // Check if postId exists before making the fetch request
    if (postId) {

      //set postID
      const postIDValue = parseInt(postId ?? '', 10);
      console.log('postIDValue:', postIDValue)
      dispatch(recipeDataAction.setPostID({ postID: postIDValue }))
      console.log('postID:', postID)
      if (postIDValue > 0)
      { 
        //positive postID
        console.log('sent dispatch for recipe data')
        dispatch(recipeDataAction.requestFlowGetRecipeById())
        console.log('recipeDataVar outside', recipeDataVar)
      }



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
          setError(true);
        }
      };

      fetchRecipeData();
    }


  }, [postId]) // Include postId as a dependency



  
  if (error) { //if unknown recipe id, 404
    return <Custom404 />;
  }
  return (
    <>
    {isSubmitted && (
      <div>
        <h1>hello world</h1>
        <h2>{recipeDataVar.title}</h2>
      </div>
    )}

      {recipeData && (
        <PageImplView>
        <Header />
        <MainBackgroundWrapper>
          <FloatingCardWrapper>
              <div>
                {' '}
                {/* title */}
                <HeaderImage headerImageURL={headerImageURL}></HeaderImage>
                <AuthorIcon>
                  <AuthorProfileImage />
                </AuthorIcon>
                <MoreVertButton />
                <ViewPostSectionWrapper>
                  <br />
                  <br />
                  <div>
                    <DivFlex>
                      <DivFlexCenter>
                        <TitleText>{recipeData.title} </TitleText>
                        <SaveButton />
                      </DivFlexCenter>
                      <Gap></Gap>
                      <StarRating />
                    </DivFlex>

                    <DivFlex>
                      <AuthorAndDate> Author: </AuthorAndDate>
                      {/*TODO: change link to author profile from id*/}
                      <AuthorAndDate>
                        <Link href="/main"> {recipeData.createdBy} </Link>
                      </AuthorAndDate>
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
                      <ServingCalorieTime>
                        <AccessTimeIcon /> {recipeData.time} min
                      </ServingCalorieTime>
                    </DivFlex>
                  </div>
                </ViewPostSectionWrapper>
              </div>
              <DivSticky isSticky={isSticky}>
                {' '}
                {/* ingredients */}
                <ViewPostSectionWrapperNoBar>
                  <AlignRight>
                    <StyledPinButton onClick={handleClick} title="Pin Ingredients" textColor={isClicked ? 'red' : null}>
                      <PushPinIcon sx={{ fontSize: 40 }} />
                    </StyledPinButton>
                  </AlignRight>
                  <SectionTitles>Ingredients</SectionTitles>
                  <CheckboxStyledList
                    items={Object.entries(recipeData.ingredients).map(
                      ([ingredientName, ingredientAmount]) => `${ingredientAmount} of ${ingredientName}`
                    )}
                  />
                </ViewPostSectionWrapperNoBar>
              </DivSticky>
              <ViewPostSectionWrapper>
                {' '}
                {/* appliances */}
                <SectionTitles>Appliances</SectionTitles>
                <TwoStyledList items={recipeData.appliances} />
              </ViewPostSectionWrapper>
              <ViewPostSectionWrapper>
                {' '}
                {/* directions */}
                <SectionTitles>Directions</SectionTitles>
                  <div style={{ position: 'relative', top: '17em', left: '5em' }}>
                  <TimerComponent/>
                  </div>
                <StepList steps={recipeData.content} />
              </ViewPostSectionWrapper>
              <ViewPostSectionWrapper>
                {' '}
                {/* buttons */}
                <div>
                  <button type="button" className={styles.main_black}>
                    {' '}
                    I made this!{' '}
                  </button>
                  <button type="button" className={styles.circle_grey}>
                    <ShareIcon sx={{ color: '#C5C5CF' }} fontSize="medium" />
                  </button>
                </div>
              </ViewPostSectionWrapper>
              <ViewPostSectionWrapper>
                {' '}
                {/* nutrition facts */}
                <SectionTitles>Nutrition Facts</SectionTitles>
              </ViewPostSectionWrapper>
              <ViewPostSectionWrapperNoBar>
                {' '}
                {/* tags */}
                <SectionTitles>Tags</SectionTitles>
                <Tags items={recipeData.tags} />
              </ViewPostSectionWrapperNoBar>
            </FloatingCardWrapper>
        </MainBackgroundWrapper>
      </PageImplView>
      )}
    </>
  );


};
export default PostIdImpl;

const RecipeDataVar = styled.div<{ isVisible: boolean }>`
  ${({ isVisible }) => css`
    ${isVisible
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}

  `}
`
const MainBackgroundWrapper = styled.div`
  display: flex;
  flex-flow: row;
  background: #f5f7fa;
`
/** sticky ingredients pin */
const StyledPinButton = styled.button<{textColor?: string}>`
  display: float;
  border: none;
  color: ${props => props.textColor || '#F5F7FA'};
  background-color: transparent;
  transition: color 0.3s ease; // Transition for color change
`;

const DivSticky = styled.div<{isSticky?: boolean}>`
  top: 0;
  position: ${props => (props.isSticky ? 'sticky' : 'static')};
  background: white;
  border-bottom: 3px solid #f5f7fa;
`

const SectionTitles = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  display: flex;
  align-items: center;

  color: #343c6a;
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
  margin-top: 5px;
  color: #343c6a;
`
const ServingCalorieTime = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 350;
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-right: 25px;
  margin-top: 10px;
  color: #b1b1b1;
`

/* author */
/* TODO: add author background img */
/* TODO: re-due position after add heading */
const AuthorIcon = styled.div`
  position: absolute;
  top: 420px;
  left: 48%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #ffe0eb;
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
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  display: inline;
  align-items: center;
  color: #343c6a;
  display: block;
`

const DivFlexCenter = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`
const DivFlex = styled.div`
  display: flex;
`
const DivJustifyContents = styled.div`
  justify-content: space-between;
`
const AlignRight = styled.div`
  align-items: right;
  text-align: right;
  float: right;
`
const DebuggingDiv = styled.div`
  background: pink;
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
        console.log('star rating data', data)
        setRating(data.data.calculatedRating);
      })
      .catch(error => {
        console.error('Error fetching rating:', error);
      });
  }, []);

  const handleRatingClick = (ratingValue: number) => {
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
        console.log('changed star rating',data);
        setSubmitted(true);
      })
      .catch(error => console.error('Error:', error));
    }
  };  

  const handleMouseOver = (ratingValue: number) => {
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
const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  width: 40%;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
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

/* two column layout for bullet lists **/
const TwoStyledList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <TwoColumnStyledList>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </TwoColumnStyledList>
  )
}
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
`
const Gap = styled.div`
  margin-left: 60px;
  margin-right: 60px;
`

/* show tags as little baubles **/
const Tags: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <TagDiv>
      {items.map((items, index) => (
        <DivTemp>
          <p key={index}>{items}</p>
        </DivTemp>
      ))}
    </TagDiv>
  )
}
const TagDiv = styled.div`
  display: flex;
  margin: 1em 0 0 0;
`
const DivTemp = styled.div`
  display: flex;
  padding: 0 2.5em;
  text-align: center;
  border-radius: 50px;
  margin: 0 1em 0 0;
  background: #dcfaf8;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
`

/* checkbox **/
const CheckboxStyledList: React.FC<{ items: string[] }> = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (item: string) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter(checkedItem => checkedItem !== item))
      console.log('DELETED ', item)
    } else {
      setCheckedItems([...checkedItems, item])

      console.log('ADDED ', item)
    }
  }

  return (
    <div>
      <List>
        {items.map((item: string, index : number) => (
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
  )
}
const List = styled.ul`
  list-style-type: none;
  padding: 0 0 0 1em;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #343c6a;

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
    border: 2px solid #343c6a;
    outline: none;
    cursor: pointer;
  }

  input[type='checkbox']:checked {
    background-color: #343c6a;
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
`
const CheckedList = styled.div`
  margin-top: 1rem;
`

/* three dot more button**/
const MoreVertButton = () => {
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setIsClicked(!isClicked) // Toggle the state
    router.push("/viewpost/edit")
  }

  const StyledMoreVertButton = styled.button`
    padding: 10px 10px;
    color: ${props => props.textColor || 'lightgrey'};
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `
  return (
    <AlignRight>
      <StyledMoreVertButton onClick={handleClick} textColor={isClicked ? 'black' : null}>
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </StyledMoreVertButton>
    </AlignRight>
  )
}

/* save button */
const SaveButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [msg, setMsg] = useState('');
  const [folders, setFolders] = useState([]);
  const dialogRef = useRef(null);
  const [isInFolder, setIsInFolder] = useState(false);

  useEffect(() => {
    const checkRecipeInFolder = async () => {
      try {
        const response = await fetch(`https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/folder/2/recipe/1`);
        if (!response.ok) {
          throw new Error('Failed to check if recipe is in folder');
        }
        const data = await response.json();
        console.log("checking save button", data.data, data.data === 'True');
        setIsInFolder(data.data === 'True');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkRecipeInFolder();
  }, [2, 1]);
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/folder/2');
        if (!response.ok) {
          throw new Error('Failed to fetch folders');
        }
        const data = await response.json();
        console.log(data.data)
        setFolders(data.data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []);
  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setIsOpen(false); // Close the pop-up when clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [folders]);

  const handleSaveToFolder = async (folderId, recipeId) => {
    try {
      const response = await fetch(`https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/folder/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          folder: 2,
          recipe: 1
        })
      });
        console.log(response)
      if (!response.ok) {
        throw new Error('Failed to save recipe to folder');
      }
  
      const responseData = await response.json();
  
      setMsg('Saved Recipe');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
  
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving recipe to folder:', error);
    }
  };
  

  return (
    <>
      <InlineCenteredDiv>

        <button onClick={() => setIsOpen(true)}>
         <BookmarkIcon sx={{ fontSize: 40, color: isInFolder ? 'red' : 'black' }} />
        </button>
        {showMessage && <SaveMsg>{msg}</SaveMsg>}
      </InlineCenteredDiv>

      {isOpen && (
        <DialogueWrapper>
        <DialogueBox ref={dialogRef}>
          <p>Save Recipe to a folder?</p>
          {folders ? (
            <FolderList>
              <FolderItem key={folders.id} onClick={() => handleSaveToFolder(folders.id)}>
                {folders.title}
              </FolderItem>
            </FolderList>
          ) : (
            <p>Loading folders...</p>
          )}
        </DialogueBox>
      </DialogueWrapper>
      
      )}
    </>
  );
};
const DialogueBox = styled.div`
  display: float;
  height: 15rem;
  width: 10rem;
  background-color: #fff;
  border-radius: 25px;
  border: 3px solid #f5f7fa;
  padding: 20px;

  font-style: normal;
  font-weight: 500;
  font-size: 20px;
`

const SaveMsg = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  color: 'lightgrey'};
`

const OpenButton = styled.button`
  text-align: center;
  color: ${props => props.textColor || 'lightgrey'};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease; // Transition for color change
`

const InlineCenteredDiv = styled.div`
  display: flex;
  //justify-content: center;
  align-items: center;
`

const DialogueWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

const FolderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FolderItem = styled.li`
  cursor: pointer;
  /* Your folder item styles */
  padding: 5px 10px; /* Example padding */
  &:hover {
    background-color: #f0f0f0; /* Example background color on hover */
  }
`;

/*timer for steps*/
const TimerComponent: React.FC = () => {
  const [createTimer, setCreateTimer] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);
  const [intervalId, setIntervalId] = useState<number>(-1); // Initialize intervalId with -1

  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  useEffect(() => {
    let intervalId: number;

    if (timeLeft <= 0 && timerOn) {
      setNotificationShown(true);
      setTimerOn(false);
      alert("Time is up!");
      setTimeLeft(0);
      setIsPaused(false);
    } else if (timerOn && timeLeft > 0 && !isPaused) {
      intervalId = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId); // Clear the interval when component unmounts or conditions change
  }, [timerOn, timeLeft, isPaused]);

  const handleStart = () => {
    const hoursRef = useRef<HTMLInputElement | null>(null);
    const minutesRef = useRef<HTMLInputElement | null>(null);
    const secondsRef = useRef<HTMLInputElement | null>(null);
 
    const hoursInput = hoursRef.current ? parseInt(hoursRef.current.value) || 0 : 0;
    const minutesInput = minutesRef.current ? parseInt(minutesRef.current.value) || 0 : 0;
    const secondsInput = secondsRef.current ? parseInt(secondsRef.current.value) || 0 : 0;

    const totalSeconds = hoursInput * 3600 + minutesInput * 60 + secondsInput;

    setTimeLeft(totalSeconds);
    setTimerOn(true);
    setIsPaused(false);
    setNotificationShown(false);
  };

  const handlePause = () => { //pause
    setIsPaused(!isPaused);
  };

  const handleStop = () => { //stop
    setTimerOn(false);
    setTimeLeft(0);
    setIsPaused(false); // Ensure timer stops and resets when stopped
    setNotificationShown(false);
  };

  const handleCreateTimer = () => { //stop
    setCreateTimer(!createTimer);

  };

  return (
    <div style={{ display: 'inline-block' }}>


      <button onClick={handleCreateTimer}>Timer?</button>
      { createTimer && !timerOn && (
        <>
          <div style={{ display: 'inline-block', marginRight: '10px' }}>
        <span>Hours:</span>
        <select ref={hoursRef}>
          {[...Array(10).keys()].map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>

      </div>

      <div style={{ display: 'inline-block', marginRight: '10px' }}>
        <span>Minutes:</span>
        <select ref={minutesRef} defaultValue="10"> {/* TODO: fix Set defaultValue to 10 */}
          {[...Array(59).keys()].map((minute) => (
            <option key={minute} value={minute}>{minute}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'inline-block' }}>
        <span>Seconds:</span>
        <select ref={secondsRef} >
          {[...Array(59).keys()].map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>
      <button onClick={handleStart}>Set Timer</button>
        </>
      )}


      {timerOn && (
        <>
          <button onClick={handlePause}>{isPaused ? 'Resume Timer' : 'Pause Timer'}</button>
          <button onClick={handleStop}>Stop Timer</button>
          <p style={{ display: 'inline-block', marginLeft: '10px' }}>Time left: {timeLeft} seconds</p>
        </>
      )}

      {notificationShown && <span style={{ display: 'inline-block', marginLeft: '10px' }}>Time is up!</span>}
    </div>
  );
};


