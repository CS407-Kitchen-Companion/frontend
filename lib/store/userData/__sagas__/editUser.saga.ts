import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { ISubmitRegisterResult, ResponseError } from '@lib/store/api/api.type'
import { userDataAction, UserDataState, selectUserData } from '@lib/store/userData/userData.slice'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'
import { navActions } from '@lib/store/nav/nav.slice'
import { isUndefined } from 'lodash'
import Cookies from 'js-cookie';


function* flowEditUserSaga() {
  yield put(userDataAction.beginFlowEditUser())
  const { username, password }: UserDataState = yield select(selectUserData)
  // noti that request user to check the form
  if (
    !checkLength({
      string: username,
      length: 1,
      comparisonType: ComparisonType.BIGGER,
    })
  ) {
    // TODO: popup
    yield put(userDataAction.failureFlowEditUser())
    return
  }
  const { data, error } = yield fetchEndpoint('editUser', {
    username,
    password
    
  })

  if (error ) {
    // TODO popup
    
    yield put(userDataAction.failureFlowEditUser())
    return
  }
  if(data){
    
    const {token} =  data.data
    const id = data.response
    console.log(token)
    console.log(data.response)
    yield put(userDataAction.setToken({token}))
    yield put(userDataAction.setId({id}))
    Cookies.set('token', token, { expires: 7, secure: true });
    Cookies.set('id', id, { expires: 7, secure: true });

    yield put(navActions.push({ url: '/main' }))
    yield put(userDataAction.successFlowEditUser())
  } 
  

  // TODO success popup
 
}

function* watchSubmitLoginSaga() {
  yield takeLeading(userDataAction.requestFlowEditUser.type, flowEditUserSaga)
}

export default [watchSubmitLoginSaga]
