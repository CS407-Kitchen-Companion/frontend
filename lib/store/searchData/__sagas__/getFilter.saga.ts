import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { searchDataAction, SearchDataState, selectsearchData } from '@lib/store/searchData/searchData.slice'
import isUndefined from 'lodash/isUndefined'

function* flowGetFilterSaga() {
  yield put(searchDataAction.beginFlowGetFilter())

  const {
    data: { data },
    error,
  } = yield fetchEndpoint('getFilter', {})
  const filter = isUndefined(data) ? [] : data.data
  
  console.log(filter)

  if (error) {
    yield put(searchDataAction.failureFlowGetFilter())
    return
  }
  // TODO uncomment it later
  // yield put(searchDataAction.setFilter({ filter: data }))
  yield put(searchDataAction.successFlowRelatedRecepies())
}

function* watchGetFilterSaga() {
  yield takeLeading(searchDataAction.requestFlowGetFilter.type, flowGetFilterSaga)
}

export default [watchGetFilterSaga]
