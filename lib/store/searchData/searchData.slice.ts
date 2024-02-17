import { combineReducers, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@lib/store/store'

export interface IKeyword {
  keyword: string
}

export interface IRelatedRecipes {
  relatedRecipes: string[]
}

export interface ISearchedResults {
  searchedResults: string[] // TODO: change it to res obj type
}

export interface SearchDataState {
  keyword: string
  relatedRecipes: string[]
  searchedResults: string[] // TODO: change it to res obj type
}

const initialState = (): SearchDataState => {
  return {
    keyword: '',
    relatedRecipes: [],
    searchedResults: [],
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
  },
})

const searchData = (state: RootState): SearchDataState => state.searchData.root

// action creator
export const searchDataAction = searchDataSlice.actions

// selector
export const selectsearchData = createSelector(searchData, state => state)
export const selectIsKeywordNotEmpty = createSelector(searchData, state => state.keyword.length > 0)
export const selectRelatedRecipes = createSelector(searchData, state => state.relatedRecipes)

// root reducer
export const searchDataReducer = combineReducers({
  root: searchDataSlice.reducer,
})
