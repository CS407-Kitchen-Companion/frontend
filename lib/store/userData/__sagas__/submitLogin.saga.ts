import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { ISubmitRegisterResult, ResponseError } from '@lib/store/api/api.type'
import { userDataAction, UserDataState, selectuserData } from '@lib/store/userData/userData.slice'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'
import { navActions } from '@lib/store/nav/nav.slice'



function* flowSubmitLoginSaga() {
  yield put(userDataAction.beginFlowSubmitLogin())
  const { username, password }: UserDataState = yield select(selectuserData)
  // noti that request user to check the form
  if (
    !checkLength({
      string: username,
      length: 1,
      comparisonType: ComparisonType.BIGGER,
    })
  ) {
    // TODO: popup
    yield put(userDataAction.failureFlowSubmitLogin())
    return
  }
  const { data, error } = yield fetchEndpoint('submitLogin', {
    username,
    password
    
  })

  if (error) {
    // TODO popup
    
    yield put(userDataAction.failureFlowSubmitLogin())
    return
  }

  const { result } = data

  // TODO success popup
  yield put(navActions.push({ url: '/main' }))
  yield put(userDataAction.successFlowSubmitLogin())
}

function* watchSubmitLoginSaga() {
  yield takeLeading(userDataAction.requestFlowSubmitLogin.type, flowSubmitLoginSaga)
}

export default [watchSubmitLoginSaga]
