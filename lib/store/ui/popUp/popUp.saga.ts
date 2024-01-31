import { put, take, takeLeading } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { popUpActions, PopUpContentInfo } from '@lib/store/ui/popUp/popUp.slice'

export function* popUpWork(action: PayloadAction<PopUpContentInfo>) {
  yield put(popUpActions.setContent(action.payload))
  yield put(popUpActions.show())
  const result: PayloadAction = yield take([
    popUpActions.onPrimary.type,
    popUpActions.onSecondary.type,
    popUpActions.onDismiss.type,
  ])
  yield put(popUpActions.hide())
  return result
}

export function* watchPopUp() {
  yield takeLeading(popUpActions.request.type, popUpWork)
}

export default [watchPopUp]
