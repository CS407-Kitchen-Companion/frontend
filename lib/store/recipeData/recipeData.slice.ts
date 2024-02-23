import { combineReducers, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@lib/store/store'

export interface RecipeDataState {
  title: string,
  content: string[],
  servings: number,
  time: number,
  tags: string[],
  appliances: string[],
  ingredients: string[]
}

const initialState = (): RecipeDataState => {
  return {
    title: '',
    content: [],
    servings: 0,
    time: 0,
    tags: [],
    appliances: [],
    ingredients: []
  }
}

const recipeDataSlice = createSlice({
  initialState: initialState(),
  name: 'recipeData',
  reducers: {
    // register flow
    requestFlowCreateRecipe: () => {},
    beginFlowCreateRecipe: () => {},
    successFlowCreateRecipe: () => {},
    failureFlowCreateRecipe: () => {},



    // setter
    setRecipe: (state, action: PayloadAction<RecipeDataState>) => {
      state.title = action.payload.title
      state.content = action.payload.content
      state.servings = action.payload.servings
      state.time = action.payload.time
      state.tags = action.payload.tags
      state.appliances = action.payload.appliances
      state.ingredients = action.payload.ingredients
    },
    
  },
})

const recipeData = (state: RootState): RecipeDataState => state.recipeData.root

// action creator
export const recipeDataAction = recipeDataSlice.actions

// selector
export const selectrecipeData = createSelector(recipeData, state => state)


// root reducer
export const recipeDataReducer = combineReducers({
  root: recipeDataSlice.reducer,
})
