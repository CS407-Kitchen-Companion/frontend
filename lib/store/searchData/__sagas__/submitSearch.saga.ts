import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { searchDataAction, SearchDataState, selectsearchData } from '@lib/store/searchData/searchData.slice'
import isUndefined from 'lodash/isUndefined'

function* flowSubmitSearchSaga() {
  yield put(searchDataAction.beginFlowSubmitSearch())
  const { keyword }: SearchDataState = yield select(selectsearchData)

  const { data, error } = yield fetchEndpoint('getSearchedResults', {
    keyword,
  })
  const searchedResults = isUndefined(data) ? [] : data.data

  if (error) {
    // nav to 404
    yield put(searchDataAction.failureFlowSubmitSearch())
    return
  }

  yield put(searchDataAction.setSearchedResults({ searchedResults }))
  yield put(searchDataAction.successFlowSubmitSearch())
}

function* watchSubmitSearchSaga() {
  yield takeLeading(searchDataAction.requestFlowSubmitSearch.type, flowSubmitSearchSaga)
}

export default [watchSubmitSearchSaga]
