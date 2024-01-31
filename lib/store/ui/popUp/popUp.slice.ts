import isUndefined from 'lodash/isUndefined'
import type { RootState } from '@lib/store/store'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PopUpContentInfo {
  titles?: string[]
  contents?: string[]
  notices?: string[]
  primaryButton?: { text: string; icon?: 'link' }
  secondaryButton?: { text: string }
  buttonClickRequired?: boolean
  image?: { url: string; fixedHeight?: number }
  isHiddenByOutsideTouch: boolean
  externalContent?: string
}

interface PopUpState extends PopUpContentInfo {
  isVisible?: boolean
}

export const initialState = (): PopUpState => {
  return {
    isHiddenByOutsideTouch: false,
  }
}

const popUpSlice = createSlice({
  initialState: initialState(),
  name: 'popUp',
  reducers: {
    startTransition: () => {},
    duringTransition: () => {},
    endTransition: () => {},
    request: (state, action: PayloadAction<PopUpContentInfo>) => {},
    setContent: (state, action: PayloadAction<PopUpContentInfo>) => {
      state.titles = action.payload.titles
      state.contents = action.payload.contents
      state.notices = action.payload.notices
      state.primaryButton = action.payload.primaryButton
      state.secondaryButton = action.payload.secondaryButton
      state.image = action.payload.image
      state.isHiddenByOutsideTouch = action.payload.isHiddenByOutsideTouch
      state.externalContent = action.payload.externalContent
    },
    clearContent: () => {
      return initialState()
    },
    show: state => {
      state.isVisible = true
    },
    hide: state => {
      state.isVisible = false
    },
    onPrimary: () => {},
    onSecondary: () => {},
    onDismiss: () => {},
  },
})

const popUpState = (state: RootState): PopUpState => state.ui.popUp

// action creator
export const popUpActions = popUpSlice.actions

// reducer
export const popUpReducer = popUpSlice.reducer

// selector
export const selectPopUp = createSelector(popUpState, state => state)
export const selectPopUpIsHiddenByOutsideTouch = createSelector(popUpState, state => state.isHiddenByOutsideTouch)
export const selectPopUpIsVisible = createSelector(popUpState, state => state.isVisible)
export const selectPopUpHasContents = createSelector(popUpState, state =>
  [state.titles, state.contents, state.notices, state.image].every(el => !isUndefined(el))
)
