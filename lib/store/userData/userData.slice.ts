import { combineReducers, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@lib/store/store'

export interface IName {
  name: string
}
export interface IVisibility {
  visibility: boolean
}
export interface IEmail {
  email: string
}
export interface IPassword {
  password: string
}
export interface IOldPwd{
  oldpwd: string
}
export interface INewPwd{
  newPwd: string
}
export interface IToken {
  token: string
}
export interface IBio {
  bio: string
}
export interface IProfilePicture {
  profilePicture: string
}

export interface IId {
  id: number
}

export interface IIsSubmitted {
  isSubmitted: boolean
}

export interface IEditing {
  editing: boolean
}

export interface UserDataState {
  username: string,
  email: string,
  password: string,
  newPassword: string,
  oldPassword: string,
  token: string,
  id: number,
  bio: string,
  profilePicture: string,
  isSubmitted: boolean,
  visibility: boolean,
  editing: boolean
}

const initialState = (): UserDataState => {
  return {
    username: '',
    email: '',
    password: '',
    newPassword: '',
    oldPassword: '',
    token: '',
    id: 0,
    bio: '',
    profilePicture: '',
    isSubmitted: false,
    visibility: true,
    editing: false
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

    //update password flow
    requestFlowUpdatePassword: () => {},
    beginFlowUpdatePassword: () => {},
    successFlowUpdatePassword: () => {},
    failureFlowUpdatePassword: () => {},

    //get user flow
    requestFlowGetUserById: () => {},
    beginFlowGetUserById: () => {},
    successFlowGetUserById: () => {},
    failureFlowGetUserById: () => {},

     //delete user flow
     requestFlowDeleteUser: () => {},
     beginFlowDeleteUser: () => {},
     successFlowDeleteUser: () => {},
     failureFlowDeleteUser: () => {},

     //edit user flow
     requestFlowEditUser: () => {},
     beginFlowEditUser: () => {},
     successFlowEditUser: () => {},
     failureFlowEditUser: () => {},

     //get profile flow
     requestFlowGetProfile: () => {},
     beginFlowGetProfile: () => {},
     successFlowGetProfile: () => {},
     failureFlowGetProfile: () => {},

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
    setOldPwd: (state, action: PayloadAction<IOldPwd>) => {
      state.oldPassword = action.payload.oldpwd
    },
    setNewPwd: (state, action: PayloadAction<INewPwd>) => {
      state.newPassword = action.payload.newPwd
    },
    setToken: (state, action: PayloadAction<IToken>) => {
      if(!(state.token === action.payload.token)){
      state.token = action.payload.token
      }
    },
    setId: (state, action: PayloadAction<IId>) => {
      if(!(state.id === action.payload.id)){
      state.id = action.payload.id
      }
    },
    setBio: (state, action: PayloadAction<IBio>) => {
      state.bio = action.payload.bio
    },
    setProfilePicture: (state, action: PayloadAction<IProfilePicture>) => {
      state.profilePicture = action.payload.profilePicture
    },
    emptyPassword: (state) => {
      state.password = ''
    },
    setIsSubmitted: (state, action: PayloadAction<IIsSubmitted>) => {
      state.isSubmitted = action.payload.isSubmitted
    },
    setVisibility: (state, action: PayloadAction<IVisibility>) => {
      state.visibility = action.payload.visibility
    },
    setEditing: (state, action: PayloadAction<IEditing>)=> {
      state.editing = action.payload.editing
    }

  },
})

const userData = (state: RootState): UserDataState => state.userData.root

// action creator
export const userDataAction = userDataSlice.actions

// selector
export const selectUserData = createSelector(userData, state => state)
export const selectUserName = createSelector(userData, state => state.username)
export const selectEmail = createSelector(userData, state => state.email)
export const selectToken = createSelector(userData, state => state.token)
export const selectPassword = createSelector(userData, state => state.password)
export const selectId = createSelector(userData, state => state.id)
export const selectBio = createSelector(userData, state => state.bio)
export const selectProfilePicture= createSelector(userData, state => state.profilePicture)
export const selectIsUsernameValid = createSelector(userData, state => state.username !== "")
export const selectIsSubmitted = createSelector(userData, state => state.isSubmitted)
export const selectUserVisibility = createSelector(userData, state => state.visibility)
export const selectEditing = createSelector(userData, state => state.editing)


// root reducer
export const userDataReducer = combineReducers({
  root: userDataSlice.reducer,
})
