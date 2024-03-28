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
  const { id, profilePicture, bio }: UserDataState = yield select(selectUserData)
  // noti that request user to check the form
  console.log('id: ' + id + 'pfp: '+ profilePicture + 'bio: '+ bio)
  const { data, error } = yield fetchEndpoint('editUser', {
    id,
    photo: profilePicture,
    details: bio
    
  })
  console.log('id: ' + id + 'pfp: '+ profilePicture + 'bio: '+ bio)
  if (error ) {
    // TODO popup
    
    yield put(userDataAction.failureFlowEditUser())
    return
  }
  
  if(data){
    
    yield put(userDataAction.setBio({bio}))
    yield put(userDataAction.setProfilePicture({profilePicture}))
    yield put(userDataAction.successFlowEditUser())
  } 
 // yield put(userDataAction.setEditing({editing: false}))

  // TODO success popup
 
}

function* watchSubmitLoginSaga() {
  yield takeLeading(userDataAction.requestFlowEditUser.type, flowEditUserSaga)
}

export default [watchSubmitLoginSaga]
