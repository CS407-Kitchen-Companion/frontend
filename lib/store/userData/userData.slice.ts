import { combineReducers, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@lib/store/store'

export interface IName {
  name: string
}

export interface UserDataState {
  name: string
}

const initialState = (): UserDataState => {
  return {
    name: '',
  }
}

const userDataSlice = createSlice({
  initialState: initialState(),
  name: 'userData',
  reducers: {
    // register flow
    requestFlowSubmitRegister: () => {},
    beginFlowSubmitRegister: () => {},
    successFlowSubmitRegister: () => {},
    failureFlowSubmitRegister: () => {},

    // setter
    setName: (state, action: PayloadAction<IName>) => {
      state.name = action.payload.name
    },
  },
})

const userData = (state: RootState): UserDataState => state.userData.root

// action creator
export const userDataAction = userDataSlice.actions

// selector
export const selectuserData = createSelector(userData, state => state)
export const selectUserName = createSelector(userData, state => state.name)

// root reducer
export const userDataReducer = combineReducers({
  root: userDataSlice.reducer,
})
