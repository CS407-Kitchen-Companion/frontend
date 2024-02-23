import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UrlObject } from 'url'

interface NavSliceState {}

export interface TransitionOptions {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

export interface NavChangePayload {
  url: UrlObject | string
  as?: UrlObject | string
  options?: TransitionOptions
}

export const initialState = (): NavSliceState => {
  return {}
}

const navSlice = createSlice({
  initialState: initialState(),
  name: 'nav',
  reducers: {
    push: (state, action: PayloadAction<NavChangePayload>) => {},
    replace: (state, action: PayloadAction<NavChangePayload>) => {},
    back: (state, action) => {},
  },
})

// action creator
export const navActions = navSlice.actions

// reducer
export const navReducer = navSlice.reducer
