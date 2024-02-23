import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { ISubmitRegisterResult, ResponseError } from '@lib/store/api/api.type'
import { userDataAction, UserDataState, selectuserData } from '@lib/store/userData/userData.slice'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'
import { navActions } from '@lib/store/nav/nav.slice'


function* flowUpdatePasswordSaga() {
    console.log('test')
  yield put(userDataAction.beginFlowUpdatePassword())
  const { newPassword, oldPassword, userId }: UserDataState = yield select(selectuserData)
  // noti that request user to check the form
  
  const { data, error } = yield fetchEndpoint('changePassword', {
    userId,
    oldPassword,
    newPassword,
        
    
  })

  if (error) {
    // TODO popup
    yield put(userDataAction.failureFlowUpdatePassword())
    return
  }

  const { result } = data

  // TODO success popup
  yield put(navActions.push({ url: '/login' }))
  yield put(userDataAction.successFlowUpdatePassword())
}

function* watchUpdatePasswordSaga() {
  yield takeLeading(userDataAction.requestFlowUpdatePassword.type, flowUpdatePasswordSaga)
}

export default [watchUpdatePasswordSaga]
