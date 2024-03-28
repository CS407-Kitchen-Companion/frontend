import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { ISubmitRegisterResult, ResponseError } from '@lib/store/api/api.type'
import { userDataAction, UserDataState, selectUserData } from '@lib/store/userData/userData.slice'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'
import { navActions } from '@lib/store/nav/nav.slice'
import { isUndefined } from 'lodash'
import Cookies from 'js-cookie';


function* flowDeleteUserSaga() {
  yield put(userDataAction.beginFlowDeleteUser())
  const { id}: UserDataState = yield select(selectUserData)
  // noti that request user to check the form
 
  const { data, error } = yield fetchEndpoint('deleteAccount', {
    id
    
  })

  if (error ) {
    // TODO popup
    
    yield put(userDataAction.failureFlowDeleteUser())
    return
  }

    Cookies.remove('token');
    Cookies.remove('id');

    yield put(navActions.push({ url: '/login' }))
    yield put(userDataAction.successFlowDeleteUser())
  

  // TODO success popup
 
}

function* watchDeleteUserSaga() {
  yield takeLeading(userDataAction.requestFlowDeleteUser.type, flowDeleteUserSaga)
}

export default [watchDeleteUserSaga]
