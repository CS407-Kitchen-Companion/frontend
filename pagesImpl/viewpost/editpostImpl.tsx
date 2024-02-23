import styled from '@emotion/styled'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';

export default function EditRecipeImpl() {
  return (
    <PageImplView>
      <Header />
      <MainBackgroundWrapper>
        <FormBackgroundWrapper>
            <FormWrapper>
                <h1 style={{
                  color: 'black',
                  
                  }}> 
                Add a Recipe 
                </h1>
                <RecipeForm></RecipeForm>
            </FormWrapper>
        </FormBackgroundWrapper>
      </MainBackgroundWrapper>
    </PageImplView>
  )
}

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState('');
  const [servings, setServings] = useState('');
  const router = useRouter();
  
  //Ingredient handling
  const [ingredients, setIngredients] = useState([{ value: '' }]);
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { value: '' }]);
  };
  const handleChangeIngredient = (index: any, e: any) => {
    const newIngredients = [...ingredients];
    newIngredients[index].value = e.target.value;
    setIngredients(newIngredients);
  };
  const handleDeleteIngredient = (index: any) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

//Direction handling
const [directions, setDirections] = useState([{ value: '' }]);
const handleAddDirection = () => {
  setDirections([...directions, { value: '' }]);
};
const handleChangeDirection = (index: any, e: any) => {
  const newDirections = [...directions];
  newDirections[index].value = e.target.value;
  setDirections(newDirections);
};
const handleDeleteDirection = (index: any) => {
  const newDirections = [...directions];
  newDirections.splice(index, 1);
  setDirections(newDirections);
};

//appliance handling
const [appliances, setAppliances] = useState([{ value: '' }]);
const handleAddAppliance = () => {
  setAppliances([...appliances, { value: '' }]);
};
const handleChangeAppliance = (index: any, e: any) => {
  const newAppliances = [...appliances];
  newAppliances[index].value = e.target.value;
  setAppliances(newAppliances);
};
const handleDeleteAppliance= (index: any) => {
  const newAppliances = [...appliances];
  newAppliances.splice(index, 1);
  setAppliances(newAppliances);
};

//Tag handling
const [tags, setTags] = useState([{ value: '' }]);
const handleAddTag = () => {
  setTags([...tags, { value: '' }]);
};
const handleChangeTag = (index: any, e: any) => {
  const newTags = [...tags];
  newTags[index].value = e.target.value;
  setTags(newTags);
};
const handleDeleteTag= (index: any) => {
  const newTags = [...tags];
  newTags.splice(index, 1);
  setTags(newTags);
};
    
    
const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
  event.preventDefault();
  console.log(title);
  console.log(ingredients);
  router.push("/main");
  alert('Recipe updated!')      
  };

  
  return (
     <div>
      
     <form onSubmit={handleSubmit}>
      
       <StyledLabel>Title</StyledLabel>
       <div></div>
       <StyledInput
       placeholder='Name your recipe'
       type="text"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
       required
       >
       </StyledInput>

        <IngredientWrapper>
       <StyledLabel>Ingredients</StyledLabel>
        <StyledDescription>
          Enter one ingredient per line. Include the quantity(i.e. cups, tablespoons)
          and any special preparations (i.e. softened, chopped).
        </StyledDescription>
       {ingredients.map((ingredient, index) => (
         <div key={index}>
           <StyledInput
             type="text"
             value={ingredient.value}
             onChange={(e) => handleChangeIngredient(index, e)}
             placeholder={`Ingredient ${index + 1}`}
           />
           <StyledDeleteButton type="button" onClick={() => handleDeleteIngredient(index)}>
             Remove
           </StyledDeleteButton>
         </div>
       ))}
       <StyledAddButton type="button" onClick={handleAddIngredient}>
         + Add Ingredient
       </StyledAddButton>
       </IngredientWrapper>

       <IngredientWrapper>
       <StyledLabel>Directions</StyledLabel>
        <StyledDescription>
          Explain how to make your recipe, including oven temperatures, baking or cooking times, pan sizes etc. 
        </StyledDescription>
       {directions.map((direction, count) => (
         <div key={count}>
           <StyledInput
             type="text"
             value={direction.value}
             onChange={(e) => handleChangeDirection(count, e)}
             placeholder={`Step ${count + 1}`}
           />
           <StyledDeleteButton type="button" onClick={() => handleDeleteDirection(count)}>
             Remove
           </StyledDeleteButton>
         </div>
       ))}
       <StyledAddButton type="button" onClick={handleAddDirection}>
         + Add Step
       </StyledAddButton>
       </IngredientWrapper>
       
       <IngredientWrapper>
       <StyledLabel>Equipment</StyledLabel>
        <StyledDescription>
          What equipment is needed to make your recipe(i.e. toaster, oven, microwave etc) 
        </StyledDescription>
       {appliances.map((appliance, count) => (
         <div key={count}>
           <StyledInput
             type="text"
             value={appliance.value}
             onChange={(e) => handleChangeAppliance(count, e)}
             placeholder={`Equipment ${count + 1}`}
           />
           <StyledDeleteButton type="button" onClick={() => handleDeleteAppliance(count)}>
             Remove
           </StyledDeleteButton>
         </div>
       ))}
       <StyledAddButton type="button" onClick={handleAddAppliance}>
         + Add Equipment
       </StyledAddButton>
       </IngredientWrapper>

       <IngredientWrapper>
       <StyledLabel>Tags</StyledLabel>
        <StyledDescription>
          Describe your recipe with some one-word tags (ex. italian, fast, vegan, etc) 
        </StyledDescription>
       {tags.map((tag, count) => (
         <div key={count}>
           <StyledInput
             type="text"
             value={tag.value}
             onChange={(e) => handleChangeTag(count, e)}
             placeholder={`Tag ${count + 1}`}
           />
           <StyledDeleteButton type="button" onClick={() => handleDeleteTag(count)}>
             Remove
           </StyledDeleteButton>
         </div>
       ))}
       <StyledAddButton type="button" onClick={handleAddTag}>
         + Add Tag
       </StyledAddButton>
       </IngredientWrapper>

       <StyledLabel>Time</StyledLabel>
       <StyledDescription>How long does your recipe take to make from 
        start to finish in minutes
       </StyledDescription>
       <StyledInput
       type="text"
       value={time}
       onChange={(e) => setTime(e.target.value)}
       placeholder= '30 minutes, 240 mintues'
       >
       </StyledInput>

       <StyledLabel>Servings</StyledLabel>
       <StyledDescription>How many servings does your recipe make
       </StyledDescription>
       <StyledInput
       type="text"
       value={time}
       onChange={(e) => setTime(e.target.value)}
       placeholder= '2 servings, 5 servings'
       >
       </StyledInput>

       <div>
       <StyledAddButton type="submit">Submit</StyledAddButton>
       </div>
     </form>
     
     
   </div>
   
 );
  };

const MainBackgroundWrapper = styled.div`
  background: #f5f7fa;
  height: auto;
  min-height: 100vh;
`
const FormBackgroundWrapper = styled.div`
  background: white;
  background-size: auto;
  height: auto;
  width: 60%;
  margin-top: 1%;
  margin-left: 20%;
  border-radius: 20px;
`
const RightWrapper = styled.div`
  background: #f5f7fa;
  background-size: auto;
  margin-left: 80%;
  height: 80vh;
`
const LeftWrapper = styled.div`
  background: #f5f7fa;
  background-size: auto;
  width: 80%;
  height: 100%;
  float: left;
`
const FormWrapper = styled.div`
  background: white;
  background-size: auto;
  height: 100%;
  width: 60%;
  padding: 3%;
  margin-left: 2%;
  border-radius: 10px;
`
const StyledLabel = styled.label`
color: black;
font-weight: bold;
font-size: 30px;
`
const StyledInput = styled.input`
background: #f5f7fa;
width: 600px;
height: 50px;
border-radius: 10px;
border: 1px solid #f5f7fa;
margin: 5px;
margin-left: 0px;
`
const IngredientWrapper = styled.div`
margin-top: 10%;
`
const StyledDescription = styled.p`
border: 0;
width: 650px;
margin-bottom: 0px;
`
const StyledDeleteButton = styled.button`
background: #f5f7fa;
width: 60px;
height: 50px;
border-radius:  10px ;
border: 1px solid #f5f7fa
`
const StyledAddButton = styled.button`
color: lightgray;
font-weight: bold;
background: #2D3566;
width: 250px;
height: 50px;
border-radius:  30px ;
border: 1px solid #2D3566;
`
