import { combineReducers, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@lib/store/store'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'

export interface RecipeDataState {
  title: string,
  content: string[],
  serves: number,
  calories: number,
  time: number,
  tags: string[],
  appliances: string[],
  ingredients: string[],
}

export interface ITitle {
  title: string
}
export interface IContent {
  content: string[]
}
export interface IServings {
  serving: number
}
export interface ITime {
  timer: number
}
export interface ITags {
  tag: string[]
}
export interface IAppls {
  appls: string[]
}
export interface IIngr {
  ingr: string[]
}


const initialState = (): RecipeDataState => {
  return {
    title: '',
    content: [],
    serves: 0,
    calories: 0,
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
      state.serves = action.payload.serves
      state.time = action.payload.time
      state.tags = action.payload.tags
      state.appliances = action.payload.appliances
      state.ingredients = action.payload.ingredients
    },
    setTitle: (state, action: PayloadAction<ITitle>) => {
      state.title = action.payload.title
    },
    setContent: (state, action: PayloadAction<IContent>) => {
      state.content = action.payload.content
    },
    setServings: (state, action: PayloadAction<IServings>) => {
      state.serves = action.payload.serving
    },
    setTime: (state, action: PayloadAction<ITime>) => {
      state.time = action.payload.timer
    },
    setTags: (state, action: PayloadAction<ITags>) => {
      state.tags = action.payload.tag
    },
    setAppls: (state, action: PayloadAction<IAppls>) => {
      state.appliances = action.payload.appls
    },
    setIngr: (state, action: PayloadAction<IIngr>) => {
      state.ingredients = action.payload.ingr
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
