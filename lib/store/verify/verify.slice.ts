import { combineReducers, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@lib/store/store'

export interface IToken {
  token: string
}

export interface IId {
    id: string
  }

export interface IStatus {
  status: string
}

export interface VerifyDataState {

  token: string,
  id: string,
  status: string
  
}

const initialState = (): VerifyDataState => {
  return {
  
    token: '',
    id: '',
    status: 'Please Wait'
   
  }
}

const verifyDataSlice = createSlice({
  initialState: initialState(),
  name: 'verifyData',
  reducers: {
    // register flow
    requestFlowVerifyEmail: () => {},
    beginFlowVerifyEmail: () => {},
    successFlowVerifyEmail: () => {},
    failureFlowVerifyEmail: () => {},


    // setter
    setToken: (state, action: PayloadAction<IToken>) => {
      state.token = action.payload.token
    },
    setId: (state, action: PayloadAction<IId>) => {
      state.id = action.payload.id
    },
    setStatus: (state, action: PayloadAction<IStatus>) => {
        state.status = action.payload.status
      }
  },
})

const verifyData = (state: RootState): VerifyDataState => state.verify.root

// action creator
export const verifyDataAction = verifyDataSlice.actions

// selector
export const selectVerifyData = createSelector(verifyData, state => state)
export const selectToken = createSelector(verifyData, state => state.token)
export const selectId = createSelector(verifyData, state => state.id)
export const selectStatus = createSelector(verifyData, state => state.status)


// root reducer
export const verifyDataReducer = combineReducers({
  root: verifyDataSlice.reducer,
})
