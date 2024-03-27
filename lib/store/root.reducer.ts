import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import deepmerge from 'deepmerge'
import { RootState } from '@lib/store/store'
import { apiSlice } from '@lib/store/api/api.slice'
import { uiReducer } from '@lib/store/ui/ui.slice'
import { userDataReducer } from '@lib/store/userData/userData.slice'
import { recipeDataReducer } from './recipeData/recipeData.slice'
import { searchDataReducer } from '@lib/store/searchData/searchData.slice'
import { navReducer } from '@lib/store/nav/nav.slice'
import { verifyDataReducer } from './verify/verify.slice'

const combinedReducer = combineReducers({
  ui: uiReducer,
  userData: userDataReducer,
  recipeData: recipeDataReducer,
  searchData: searchDataReducer,
  nav: navReducer,
  verify: verifyDataReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

export type CombinedReducerState = ReturnType<typeof combinedReducer>

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = deepmerge(state, action.payload, {
      arrayMerge: (destinationArray, sourceArray, options) => sourceArray,
    })
    return nextState
  }

  return combinedReducer(state, action)
}

export default rootReducer
