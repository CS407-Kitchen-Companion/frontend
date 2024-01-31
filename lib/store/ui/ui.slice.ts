import { combineReducers } from '@reduxjs/toolkit'
import { popUpReducer } from '@lib/store/ui/popUp/popUp.slice'

export const uiReducer = combineReducers({
  popUp: popUpReducer,
})
