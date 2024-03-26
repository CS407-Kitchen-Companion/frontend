import styled from '@emotion/styled'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useRouter } from"next/navigation";
import { FormEvent } from 'react'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { recipeDataAction } from '@lib/store/recipeData/recipeData.slice'
import { forEach } from 'lodash';


export default function CreateRecipeImpl() {
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
  const dispatch = useDispatch()
  
  //Ingredient handling
  const [ingrs, setIngrs] = useState([{ ingredient: '', amount: 0, unit: 'g' }]);
  const [ingredients, setIngredients] = useState([{ ingredient: '', amount: '', unit: 'g' }]);
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: '', amount: '', unit: 'g' }]);
    setIngrs([...ingrs, { ingredient: '', amount: 0, unit: '' }]);
  };
  const handleChangeIngredientName = (index: any, e: any) => {
    const newIngredients = [...ingredients];
    newIngredients[index].ingredient = e.target.value;
    setIngredients(newIngredients);
  };
  const handleChangeIngredientAmount = (index: any, e: any) => {
    const newIngredients = [...ingredients];
    newIngredients[index].amount = (e.target.value);
    setIngredients(newIngredients);
  };
  const handleChangeIngredientUnit = (index: any, e: any) => {
    const newIngredients = [...ingredients];
    newIngredients[index].unit = e.target.value;
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

//Visibility
const [visibility, setVisibility] = useState('public');

const handleChangeVisibility = (e: any) => {

  setVisibility(e.target.value);

};
    
    
const handleSubmit =  async (event: FormEvent<HTMLFormElement>)  => {
  event.preventDefault();
  
  dispatch(recipeDataAction.setTitle({title}))

  let content: Array<string> = ['']
  directions.forEach((element: any, index: number) => {
    content[index] = element.value
  });
  dispatch(recipeDataAction.setContent({content}))
  
  var serving = parseInt(servings)
  dispatch(recipeDataAction.setServings({serving}))

  var timer = parseInt(time)
  dispatch(recipeDataAction.setTime({timer}))

  let tag: Array<string> = ['']
  tags.forEach((element: any, index: number) => {
    tag[index] = element.value
  });
  dispatch(recipeDataAction.setTags({tag}))

  let appls: Array<string> = ['']
  appliances.forEach((element: any, index: number) => {
    appls[index] = element.value
  });
  dispatch(recipeDataAction.setAppls({appls}))

  console.log(ingredients)
  ingredients.forEach((element: any, index: number) => {
    const newIngredients = [...ingrs];
    newIngredients[index].ingredient = (element.ingredient);
    newIngredients[index].amount = parseFloat(element.amount);
    newIngredients[index].unit = (element.unit);
    setIngrs(newIngredients);
  });
  console.log(ingrs)
  dispatch(recipeDataAction.setIngr({ingrs}))
  dispatch(recipeDataAction.requestFlowCreateRecipe())
  
  //router.push("/");
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
           <StyledIngredientName
             type="text"
             value={ingredient.ingredient}
             onChange={(e) => handleChangeIngredientName(index, e)}
             placeholder={`Ingredient ${index + 1}`}
           />
           <StyledIngredientAmount
             type="text"
             value={ingredient.amount}
             onChange={(e) => handleChangeIngredientAmount(index, e)}
             placeholder={`Quantity (Ex. 2 Tbsp)`}
           />
           <StyledDropdown value={ingredient.unit} onChange={(e) => handleChangeIngredientUnit(index, e)}>
          <option value="g">gram(s)</option>
          <option value="Tbsp">Tablespoon(s)</option>
          <option value="tbsp">Teaspoon(s)</option>
          <option value="oz">Ounce(s)</option>
          </StyledDropdown>
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

        <IngredientWrapper>
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
       </IngredientWrapper>

       <IngredientWrapper>
       <StyledLabel>Servings</StyledLabel>
       <StyledDescription>How many servings does your recipe make
       </StyledDescription>
       <StyledInput
       type="text"
       value={servings}
       onChange={(e) => setServings(e.target.value)}
       placeholder= '2 servings, 5 servings'
       >
       </StyledInput>
       </IngredientWrapper>

       
       <StyledLabel>Visibility</StyledLabel>
       <StyledDescription>Can your recipe be viewed publicly?
       </StyledDescription>
        <StyledDropdown value={visibility} onChange={handleChangeVisibility}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </StyledDropdown>
       

       <IngredientWrapper>
       <StyledAddButton type="submit">Submit</StyledAddButton>
       </IngredientWrapper>
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
  width: auto;
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
  width: auto;
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
const StyledIngredientName = styled.input`
background: #f5f7fa;
width: 400px;
height: 50px;
border-radius: 10px;
border: 1px solid #f5f7fa;
margin: 5px;
margin-left: 0px;
`
const StyledIngredientAmount = styled.input`
background: #f5f7fa;
width: 200px;
height: 50px;
border-radius: 10px;
border: 1px solid #f5f7fa;
margin: 5px;
margin-left: 0px;
`
const IngredientWrapper = styled.div`
margin-top: 5%;
width: auto;
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

const StyledDropdown = styled.select`
margin: 1vh;
width: 100px;
height: 30px;
background: #f5f7fa;
border-radius: 5px;
`