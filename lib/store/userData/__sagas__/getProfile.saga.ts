import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { ISubmitRegisterResult, ResponseError } from '@lib/store/api/api.type'
import { userDataAction, UserDataState, selectUserData } from '@lib/store/userData/userData.slice'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'
import { navActions } from '@lib/store/nav/nav.slice'
import { isUndefined } from 'lodash'
import Cookies from 'js-cookie';


function* flowGetProfileSaga() {
  yield put(userDataAction.beginFlowGetProfile())
  const { id, editing }: UserDataState = yield select(selectUserData)

  if(editing){

    yield put(userDataAction.failureFlowGetProfile())
    return
  }
  const { data, error } = yield fetchEndpoint('getUsernameById', {
    id
  })

  if (error ) {
    // TODO popup
    
    yield put(userDataAction.failureFlowGetProfile())
    return
  }

  if(data){
    const username = data.response
    console.log("username: "+username)
    yield put(userDataAction.setName({name: username}))
    
  } 

   const { data: data2, error: error2 } = yield fetchEndpoint('getUserPic', {
    id
  })

  if (error2 ) {
    // TODO popup
    
    yield put(userDataAction.failureFlowGetProfile())
    return
  }

  if(data2){
    const pic = data2.response
    console.log('pic: '+pic)
    yield put(userDataAction.setProfilePicture({profilePicture: pic}))
    
  } 
  
  const { data: data3, error: error3 } = yield fetchEndpoint('getUserBio', {
    id
  })

  if (error3 ) {
    // TODO popup
    
    yield put(userDataAction.failureFlowGetProfile())
    return
  }

  if(data3){
    const bio = data3.response
    console.log('bio: '+bio)
    yield put(userDataAction.setBio({bio}))
    
  } 

  // TODO success popup
  
  yield put(userDataAction.successFlowGetProfile())
}

function* watchSubmitLoginSaga() {
  yield takeLeading(userDataAction.requestFlowGetProfile.type, flowGetProfileSaga)
}

export default [watchSubmitLoginSaga]
