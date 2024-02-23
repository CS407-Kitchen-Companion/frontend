import { combineReducers, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@lib/store/store'

export interface IKeyword {
  keyword: string
}

export interface IRelatedRecipes {
  relatedRecipes: string[]
}

export interface ISearchedResults {
  searchedResults: []
}

export interface IFilter {
  filter: {}
}

export interface SearchDataState {
  keyword: string
  relatedRecipes: string[]
  searchedResults: []
  filter: {}
}

const initialState = (): SearchDataState => {
  return {
    keyword: '',
    relatedRecipes: [],
    searchedResults: [],
    filter: {
      // TODO: FIX MOCK DATA to REAL
      Cusine: {},
      Difficulty: {},
      Appliance: {},
      MealType: {},
      Diet: {},
      'Calorie Count': {},
      Servings: {},
      Time: {},
      Ingredients: {},
    },
  }
}

const searchDataSlice = createSlice({
  initialState: initialState(),
  name: 'searchData',
  reducers: {
    // input change flow
    requestFlowRelatedRecepies: () => {},
    beginFlowRelatedRecepies: () => {},
    successFlowRelatedRecepies: () => {},
    failureFlowRelatedRecepies: () => {},

    // submit flow
    requestFlowSubmitSearch: () => {},
    beginFlowSubmitSearch: () => {},
    successFlowSubmitSearch: () => {},
    failureFlowSubmitSearch: () => {},

    // submit flow
    requestFlowGetFilter: () => {},
    beginFlowGetFilter: () => {},
    successFlowGetFilter: () => {},
    failureFlowGetFilter: () => {},

    // setter
    setKeyword: (state, action: PayloadAction<IKeyword>) => {
      state.keyword = action.payload.keyword
    },
    setRelatedRecipes: (state, action: PayloadAction<IRelatedRecipes>) => {
      state.relatedRecipes = action.payload.relatedRecipes
    },
    setSearchedResults: (state, action: PayloadAction<ISearchedResults>) => {
      state.searchedResults = action.payload.searchedResults
    },
    setFilter: (state, action: PayloadAction<IFilter>) => {
      state.filter = action.payload.filter
    },
  },
})

const searchData = (state: RootState): SearchDataState => state.searchData.root

// action creator
export const searchDataAction = searchDataSlice.actions

// selector
export const selectsearchData = createSelector(searchData, state => state)
export const selectIsKeywordNotEmpty = createSelector(searchData, state => state.keyword.length > 0)
export const selectRelatedRecipes = createSelector(searchData, state => state.relatedRecipes)
export const selectFilter = createSelector(searchData, state => state.filter)

// root reducer
export const searchDataReducer = combineReducers({
  root: searchDataSlice.reducer,
})
