import { combineReducers, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@lib/store/store'

export interface IName {
  name: string
}
export interface IEmail {
  email: string
}
export interface IPassword {
  password: string
}
export interface IToken {
  token: string
}
export interface UserDataState {
  username: string,
  email: string,
  password: string,
  token: string
}

const initialState = (): UserDataState => {
  return {
    username: '',
    email: '',
    password: '',
    token: ''
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
      state.username = action.payload.name
    },
    setEmail: (state, action: PayloadAction<IEmail>) => {
      state.email = action.payload.email
    },
    setPassword: (state, action: PayloadAction<IPassword>) => {
      state.password = action.payload.password
    },
    setToken: (state, action: PayloadAction<IToken>) => {
      state.token = action.payload.token
    },
  },
})

const userData = (state: RootState): UserDataState => state.userData.root

// action creator
export const userDataAction = userDataSlice.actions

// selector
export const selectuserData = createSelector(userData, state => state)
export const selectUserName = createSelector(userData, state => state.username)
export const selectEmail = createSelector(userData, state => state.email)

// root reducer
export const userDataReducer = combineReducers({
  root: userDataSlice.reducer,
})
