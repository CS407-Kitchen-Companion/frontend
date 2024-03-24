import { combineReducers, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@lib/store/store'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'

export interface IPostID {
  postID: number
}

export interface IRecipeDataVar {
  recipeDataVar: {
    title: string,
    createdAt: string,
    createdBy: number,
    edited: boolean,
    updatedAt: string,
    ratings: number[],
    ratingCount: number,
    calculatedRating: number,
    calories: number,
    serves: number,
    content: string[],
    time: number,
    tags: string[],
    appliances: string[],
    ingredients: string[],
    comments: string[],
  }
}

export interface IIsSubmitted {
  isSubmitted: boolean
}

export interface RecipeDataState {
  postID: number
  recipeDataVar: {
    title: string,
    createdAt: string,
    createdBy: number,
    edited: boolean,
    updatedAt: string,
    ratings: number[],
    ratingCount: number,
    calculatedRating: number,
    calories: number,
    serves: number,
    content: string[],
    time: number,
    tags: string[],
    appliances: string[],
    ingredients: string[],
    comments: string[],
  }
  isSubmitted: boolean
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
    postID: 0,
    recipeDataVar: {
      title: '',
      createdAt: '',
      createdBy: 0,
      edited: false,
      updatedAt: '',
      ratings: [],
      ratingCount: 0,
      calculatedRating: 0,
      calories: 0,
      serves: 0,
      content: [],
      time: 0,
      tags: [],
      appliances: [],
      ingredients: [],
      comments: [],
    },
    isSubmitted: false,
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

    // get recipe flow
    requestFlowGetRecipeById: () => {},
    beginFlowGetRecipeById: () => {},
    successFlowGetRecipeById: () => {},
    failureFlowGetRecipeById: () => {},

    // setter 
    setPostID: (state, action: PayloadAction<IPostID>) => {
      state.postID = action.payload.postID
    },
    setRecipeDataVar: (state, action: PayloadAction<IRecipeDataVar>) => {
      state.recipeDataVar = action.payload.recipeDataVar
    },
    setIsSubmitted: (state, action: PayloadAction<IIsSubmitted>) => {
      state.isSubmitted = action.payload.isSubmitted
    },
    setTitle: (state, action: PayloadAction<ITitle>) => {
      state.recipeDataVar.title = action.payload.title
    },
    setContent: (state, action: PayloadAction<IContent>) => {
      state.recipeDataVar.content = action.payload.content
    },
    setServings: (state, action: PayloadAction<IServings>) => {
      state.recipeDataVar.serves = action.payload.serving
    },
    setTime: (state, action: PayloadAction<ITime>) => {
      state.recipeDataVar.time = action.payload.timer
    },
    setTags: (state, action: PayloadAction<ITags>) => {
      state.recipeDataVar.tags = action.payload.tag
    },
    setAppls: (state, action: PayloadAction<IAppls>) => {
      state.recipeDataVar.appliances = action.payload.appls
    },
    setIngr: (state, action: PayloadAction<IIngr>) => {
      state.recipeDataVar.ingredients = action.payload.ingr
    },

    
  },
})

const recipeData = (state: RootState): RecipeDataState => state.recipeData.root

// action creator
export const recipeDataAction = recipeDataSlice.actions

// selector
export const selectRecipeData = createSelector(recipeData, state => state)
export const selectPostID = createSelector(recipeData, state => state.postID)
export const selectIsPostIDNotEmpty = createSelector(recipeData, state => state.postID > 0)
export const selectRecipeDataVar = createSelector(recipeData, state => state.recipeDataVar)
export const selectIsRecipeDataVarValid = createSelector(recipeData, state => state.recipeDataVar.title !== '')
export const selectIsSubmitted = createSelector(recipeData, state => state.isSubmitted)



// root reducer
export const recipeDataReducer = combineReducers({
  root: recipeDataSlice.reducer,
})
