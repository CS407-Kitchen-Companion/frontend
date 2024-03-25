import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import isUndefined from 'lodash/isUndefined'
import { selectVerifyData, verifyDataAction, VerifyDataState } from '../verify.slice'

function* flowGetUserByIdSaga() {

  yield put(verifyDataAction.beginFlowVerifyEmail())
  const { id, token }: VerifyDataState = yield select(selectVerifyData)

  const { data, error } = yield fetchEndpoint('verifyEmail', {
    id, 
    token
  })
  
  



  
  if (error) {
    const stat = error.data
    const status = stat.response
   
    yield put(verifyDataAction.setStatus({ status}))
    yield put(verifyDataAction.failureFlowVerifyEmail())
    return
  }

  const stat = data.data
    const status = stat.response
  yield put(verifyDataAction.setStatus({ status }))
  yield put(verifyDataAction.successFlowVerifyEmail())
}

function* watchVerifyEmailSaga() {
  yield takeLeading(verifyDataAction.requestFlowVerifyEmail.type, flowGetUserByIdSaga)
}

export default [watchVerifyEmailSaga]
