import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { UserDataState, userDataAction,  selectUserData } from '@lib/store/userData/userData.slice'
import isUndefined from 'lodash/isUndefined'

function* flowGetUserByIdSaga() {

  yield put(userDataAction.beginFlowGetUserById())
  const { id }: UserDataState = yield select(selectUserData)

  const { data, error } = yield fetchEndpoint('getUserById', {
    id, 
  })

  const name = isUndefined(data) ? [] : data.data
  yield put(userDataAction.setName({ name }))
  yield put(userDataAction.setIsSubmitted({ isSubmitted: true }))

  console.log('userdata', name)
  
  if (error) {
    yield put(userDataAction.failureFlowGetUserById())
    return
  }

  yield put(userDataAction.successFlowGetUserById())
}

function* watchGetUserByIdSaga() {
  yield takeLeading(userDataAction.requestFlowGetUserById.type, flowGetUserByIdSaga)
}

export default [watchGetUserByIdSaga]
