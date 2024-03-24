import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { StarRating } from '@pagesImpl/__components__/StarRating'
import { MoreVertButton, SimplePopup } from '@pagesImpl/__components__/MoreVertButton'
import { Tags } from '@pagesImpl/__components__/Tags'
import { IRData } from '@pagesImpl/viewpost/postIdImpl'
import { CommentSection, ICommentSection, IComment, IReply } from '@pagesImpl/__components__/CommentSection'

import { 
  userDataAction,
  selectUserData,
  selectUserName,
  selectId, 
  UserDataState,
  IName,
  selectIsSubmitted,
  selectIsUsernameValid
} from '@lib/store/userData/userData.slice'

import Link from 'next/link'
import Image from 'next/image'
import styles from '@pagesImpl/__components__/Button.module.css'
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PushPinIcon from '@mui/icons-material/PushPin';
import fish from 'public/fish_post_dummy.jpg';

//main viewing of recipe i.e. header, ingredients, appliances, directions, nutrition, tags 


export const ViewPostRecipe = ({ rDataTemp }: { rDataTemp: IRData }) => {
  const recipeDataTemp: IRData = { ...rDataTemp }

  return (
    <>
      <RecipePostHeader rDataTemp={recipeDataTemp}/>
      <RecipePostIngredients rDataTemp={recipeDataTemp}/>
      <RecipePostAppliances rDataTemp={recipeDataTemp}/>
      <RecipePostDirections rDataTemp={recipeDataTemp}/>
      <RecipePostNutrition rDataTemp={recipeDataTemp}/>
      <RecipePostTags rDataTemp={recipeDataTemp}/>
      <RecipePostComments rDataTemp={recipeDataTemp}/>
    </>
  );
}

/* RECIPE HEADER */
const RecipePostHeader = ({ rDataTemp }: { rDataTemp: IRData }) => {
  //TODO: update image 
  const headerImageURL = '/spaget.jpg'  
  
  // Create a new object recipeDataVar by copying the properties of recipeDataTemp
  const recipeDataVar: IRData = { ...rDataTemp }

  const dispatch = useDispatch()
  const isSubmitted = useSelector(selectIsSubmitted)
  const authorId = recipeDataVar.createdBy
  const [authorUsername, setAuthorUsername] = useState<String>('temp')
  const userDataVar = useSelector(selectUserData)
  const isUsernameValid = useSelector(selectIsUsernameValid)

  //TODO: fix author username pull

  useEffect(() => {
    if (authorId < 0) {
      console.error('userId is not a valid number')
    } 
    else {
      console.log('authorId:', authorId)
      dispatch(userDataAction.setId({ id: authorId }))
      dispatch(userDataAction.requestFlowGetUserById())  
    }
  }, [authorId]);

  const [author, setAuthor] = useState<UserDataState>(userDataVar);
  useEffect(() => {
    console.log('check submitted auth')
    if (isSubmitted && isUsernameValid) {
      setAuthor(userDataVar)
      //setAuthorUsername(author.username)
  
      console.log('author', author)
      //console.log('author username', authorUsername)
    }
  }, [isSubmitted, isUsernameValid]);

  
  

  return (
    <>

    <SimplePopup></SimplePopup>
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
              <TitleText>{recipeDataVar.title} </TitleText>
              
              <SaveButton/>
            </DivFlexCenter>
            <Gap/>
            <StarRating/>
          </DivFlex>

          <DivFlex>
            <AuthorAndDate> Author: </AuthorAndDate>
            <AuthorAndDate>
              {(isSubmitted) ? (
                <Link href="/main"> user number FOUND </Link>
              ) : (
                <Link href="/main"> user number {recipeDataVar.createdBy} </Link>
              )}
            </AuthorAndDate>
            <AuthorAndDate> | </AuthorAndDate>
            <div>
              {(isSubmitted && isUsernameValid) ? (
                <div>
                  <AuthorAndDate>Updated {recipeDataVar.updatedAt}</AuthorAndDate>
                </div>
              ) : (
                <div>
                  <AuthorAndDate>Created {recipeDataVar.createdAt}</AuthorAndDate>
                </div>
              )}
            </div>
          </DivFlex>
          <DivFlex>
            <ServingCalorieTime> Serves {recipeDataVar.serves}</ServingCalorieTime>
            <ServingCalorieTime>{recipeDataVar.calories} Calories (Jump to Nutrition Facts)</ServingCalorieTime>
            <ServingCalorieTime>
              <AccessTimeIcon /> {recipeDataVar.time} min
            </ServingCalorieTime>
          </DivFlex>
        </div>
      </ViewPostSectionWrapper>
      <StyledLine/>
    </>
  );
}
//header img
const HeaderImage: React.FC<{ headerImageURL: string }> = ({ headerImageURL }) => {
  return (
    <>
      <CardPostImg>
        <HeaderImageDiv ImageURL={headerImageURL}/>
      </CardPostImg>
    </>
  );
}
const HeaderImageDiv = styled.div<{ ImageURL: string }>`
  width: 100%;
  height: 310px; 
  background-image: url(${props => props.ImageURL});
  background-size: cover; /* This ensures the image covers the entire div */
  background-position: center; 
  overflow: "hidden";
  border-radius: 25px 25px 0px 0px;
`
const CardPostImg = styled.div`
  position: "relative"
  width: 100%;
  height: 310px;
  border-radius: 25px 25px 0px 0px;
  background-color: blue;
  overflow: "hidden";
`
//author icon
const AuthorProfileImage = () => {
  //TODO:make dynamic

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
const AuthorIcon = styled.div`
/* TODO: add author background img */
  position: absolute;
  top: 420px;
  left: 48%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #ffe0eb;
`

const AuthorAndDate = styled.div`
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-top: 5px;
`
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
const ServingCalorieTime = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  margin-top: 10px;
`


//save button
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
`
const FolderList = styled.ul`
  list-style: none;
  padding: 0;
`
const FolderItem = styled.li`
  cursor: pointer;
  /* Your folder item styles */
  padding: 5px 10px; /* Example padding */
  &:hover {
    background-color: #f0f0f0; /* Example background color on hover */
  }
`


/* RECIPE INGREDIENTS */
const RecipePostIngredients = ({ rDataTemp }: { rDataTemp: IRData }) => {
  // Create a new object recipeDataVar by copying the properties of recipeDataTemp
  const recipeDataVar: IRData = { ...rDataTemp }
  const [isClicked, setIsClicked] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  const handleClick = () => {
    //for pin button on ingredients
    setIsClicked(!isClicked) // Toggle the state
    setIsSticky(!isSticky)
  }

  return (
    <>
      <DivSticky isSticky={isSticky}>
      <ViewPostSectionWrapper>
        <AlignRight>
          <StyledPinButton onClick={handleClick} title="Pin Ingredients" textColor={isClicked ? 'red' : null}>
            <PushPinIcon sx={{ fontSize: 40 }} />
          </StyledPinButton>
        </AlignRight>
        <SectionTitles>Ingredients</SectionTitles>
        <CheckboxStyledList
          items={Object.entries(recipeDataVar.ingredients).map(
            ([ingredientName, ingredientAmount]) => `${ingredientAmount} of ${ingredientName}`
          )}
        />
      </ViewPostSectionWrapper>
      </DivSticky>
    </>
  );
}
//checkbox
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
    <>
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
    </>
  )
}
const List = styled.ul`
  list-style-type: none;
  padding: 0 0 0 1em;
  line-height: 24px;

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
const StyledPinButton = styled.button<{textColor?: string}>`
  display: float;
  border: none;
  color: ${props => props.textColor || '#F5F7FA'};
  background-color: transparent;
  transition: color 0.1s ease;
  cursor: pointer;
`
const DivSticky = styled.div<{isSticky?: boolean}>`
  top: 0;
  position: ${props => (props.isSticky ? 'sticky' : 'static')};
  background: white;
  border-bottom: 3px solid #f5f7fa;
`


/* RECIPE APPLIANCES */
const RecipePostAppliances = ({ rDataTemp }: { rDataTemp: IRData }) => {
  // Create a new object recipeDataVar by copying the properties of recipeDataTemp
  const recipeDataVar: IRData = { ...rDataTemp }

  return (
    <>
      <ViewPostSectionWrapper>
        {/* appliances */}
        <SectionTitles>Appliances</SectionTitles>
        <TwoStyledList items={recipeDataVar.appliances} />
      </ViewPostSectionWrapper>
      <StyledLine/>
    </>
  );
}
/* two column layout for bullet lists **/
const TwoStyledList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <>
      <TwoColumnStyledList>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </TwoColumnStyledList>
    </>
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


/* RECIPE DIRECTIONS */
const RecipePostDirections = ({ rDataTemp }: { rDataTemp: IRData }) => {
  // Create a new object recipeDataVar by copying the properties of recipeDataTemp
  const recipeDataVar: IRData = { ...rDataTemp }

  //TODO: update timerComponent
  return (
    <>
      <ViewPostSectionWrapper>
        <SectionTitles>Directions</SectionTitles>
          <div style={{ position: 'relative', top: '17em', left: '5em' }}>
          </div>
        <StepList steps={recipeDataVar.content} />
      </ViewPostSectionWrapper>
      <StyledLine/>
    </>
  );
}
//direction step list
const StepList: React.FC<{ steps: string[] }> = ({ steps }) => {
  return (
    <>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepHeader>Step {index + 1}</StepHeader>
          <StepInstructions>{step}</StepInstructions>
        </Step>
      ))}
  </>
  );
}
const Step = styled.div`
  margin-bottom: 40px;
`
const StepHeader = styled.h3`
  margin-bottom: 0px;
`
const StepInstructions = styled.p`
  margin-bottom: 0;
`


/* RECIPE NUTRITION FACTS */
const RecipePostNutrition = ({ rDataTemp }: { rDataTemp: IRData }) => {
  // Create a new object recipeDataVar by copying the properties of recipeDataTemp
  const recipeDataVar: IRData = { ...rDataTemp }

  return (
    <>
     <ViewPostSectionWrapper>
        <SectionTitles>Nutrition Facts</SectionTitles>
      </ViewPostSectionWrapper>
      <StyledLine/>
    </>
  );
}

/* RECIPE TAGS */
const RecipePostTags = ({ rDataTemp }: { rDataTemp: IRData }) => {
  // Create a new object recipeDataVar by copying the properties of recipeDataTemp
  const recipeDataVar: IRData = { ...rDataTemp }

  return (
    <>
     <ViewPostSectionWrapper>
        <SectionTitles>Tags</SectionTitles>
        <Tags items={recipeDataVar.tags} />
      </ViewPostSectionWrapper>
      <StyledLine/>
    </>
  );
}

/* RECIPE COMMENTS */
const RecipePostComments = ({ rDataTemp }: { rDataTemp: IRData }) => {
  // Create a new object recipeDataVar by copying the properties of recipeDataTemp
  const recipeDataVar: IRData = { ...rDataTemp }

  //TODO: add comment data from backend - make CommentSection take in arg
  //TODO: fix numberOf to isBoolean and read length of array for num
  
  // Temporary dummy data for replies

  const dummyReplies: IReply[] = [
    { userId: 101, content: 'Reply 1 content' },
    { userId: 102, content: 'Reply 2 content. th sisf gsf gs gs sReply 2 content. th sisf gsf gs gs ssdg s fa dfa f sfafbajsf adfg sd fgs fgfa fa f sdfjbaksjfnasfa sf asf af asf a fa f af gs f sfa fsdfgsf asg sa radgsdfhsr a fgs s f a fafgsfgdfgsetgsd f sg s gs gssdg s fa dfa f sfafbajsf adfg sd fgs fgfa fa f sdfjbaksjfnasfa sf asf af asf a fa f af gs  f sfa fsdfgsf asg sa radgsdfhsr a fgs s f a fafgsfgdfgsetgsd f sg s gs gs ' },
    { userId: 103, content: 'Reply 3 content' },
  ];

  // Temporary dummy data for comments
  const dummyComments: IComment[] = [
    {
      userId: 1,
      content: 'Comment 1 content',
      //hasImages: false,
      hasImages: true,
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
      //images: [],
      hasReplies: true,
      replies: dummyReplies.slice(0, 2), // Using only the first two replies for this comment
    },
    {
      userId: 2,
      content: 'Comment 2 content',
      hasImages: false,
      images: [],
      hasReplies: true,
      replies: dummyReplies.slice(0, 3), // Using only the first two replies for this comment
    },
    {
      userId: 3,
      content: 'Comment 3 content',
      hasImages: true,
      images: ['image1.jpg', 'image2.jpg'],
      hasReplies: false,
      replies: [],
    },
  ];

// Temporary dummy data for the comment section
const tempData: ICommentSection = {
  commentSection: dummyComments,
};

  return (
    <>
     <ViewPostSectionWrapper>
        <SectionTitles>Comments</SectionTitles>
        <CommentSection commentSection={tempData}/>
      </ViewPostSectionWrapper>
    </>
  );
}


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

