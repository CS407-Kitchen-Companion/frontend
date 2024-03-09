import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { ISubmitRegisterResult, ResponseError } from '@lib/store/api/api.type'
import { userDataAction, UserDataState, selectuserData } from '@lib/store/userData/userData.slice'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'
import { navActions } from '@lib/store/nav/nav.slice'
import { isUndefined } from 'lodash'


function* flowSubmitRegisterSaga() {
  yield put(userDataAction.beginFlowSubmitRegister())
  const { username, email, password }: UserDataState = yield select(selectuserData)
  // noti that request user to check the form
  if (
    !checkLength({
      string: username,
      length: 1,
      comparisonType: ComparisonType.BIGGER,
    })
  ) {
    // TODO: popup
    yield put(userDataAction.failureFlowSubmitRegister())
    return
  }

  const {data, error} = yield fetchEndpoint('submitRegister', {
    username, 
    password,
    email,
  })
  console.log('register')
  
  if (error) {
    // TODO popup
    alert('invalid credentials')
    yield put(userDataAction.failureFlowSubmitRegister())
    return
  }

  const registerResult = isUndefined(data) ? [] : data.data
  userDataAction.setId(registerResult.id)
  userDataAction.emptyPassword()


  // TODO success popup
  yield put(navActions.push({ url: '/login' }))
  yield put(userDataAction.successFlowSubmitRegister())
}

function* watchSubmitRegisterSaga() {
  yield takeLeading(userDataAction.requestFlowSubmitRegister.type, flowSubmitRegisterSaga)
}

export default [watchSubmitRegisterSaga]
