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

export interface Iid {
  id: string
}
export interface UserDataState {
  username: string,
  email: string,
  password: string,
  token: string,
  id: string
}

const initialState = (): UserDataState => {
  return {
    username: '',
    email: '',
    password: '',
    token: '',
    id: '',
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

    // login flow
   
    requestFlowSubmitLogin: () => {},
    beginFlowSubmitLogin: () => {},
    successFlowSubmitLogin: () => {},
    failureFlowSubmitLogin: () => {},

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
    setId: (state, action: PayloadAction<Iid>) => {
      state.id = action.payload.id
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
export const selectToken = createSelector(userData, state => state.token)
export const selectPassword = createSelector(userData, state => state.password)
export const selectId = createSelector(userData, state => state.id)

// root reducer
export const userDataReducer = combineReducers({
  root: userDataSlice.reducer,
})
