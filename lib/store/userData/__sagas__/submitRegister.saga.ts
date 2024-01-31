import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { ISubmitRegisterResult, ResponseError } from '@lib/store/api/api.type'
import { userDataAction, UserDataState, selectuserData } from '@lib/store/userData/userData.slice'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'

function generateSubmitApplicationErrorNotifictionTexts(error: ResponseError) {
  switch (error.status) {
    case 400:
      return {
        mainTexts: ['Error', '400'],
      }
    case 401:
      return {
        mainTexts: ['Error', '401'],
      }
    default:
      return {
        mainTexts: ['Error', 'DEFAULT'],
      }
  }
}

function* flowSubmitRegisterSaga() {
  yield put(userDataAction.beginFlowSubmitRegister())
  const { name }: UserDataState = yield select(selectuserData)
  // noti that request user to check the form
  if (
    !checkLength({
      string: name,
      length: 1,
      comparisonType: ComparisonType.BIGGER,
    })
  ) {
    // TODO: popup
    yield put(userDataAction.failureFlowSubmitRegister())
    return
  }

  const { data, error }: { data: ISubmitRegisterResult; error: ResponseError } = yield fetchEndpoint('submitRegister', {
    name,
  })

  if (error) {
    // TODO popup
    yield put(userDataAction.failureFlowSubmitRegister())
    return
  }

  const { result } = data

  // TODO success popup

  yield put(userDataAction.successFlowSubmitRegister())
}

function* watchSubmitRegisterSaga() {
  yield takeLeading(userDataAction.requestFlowSubmitRegister.type, flowSubmitRegisterSaga)
}

export default [watchSubmitRegisterSaga]
