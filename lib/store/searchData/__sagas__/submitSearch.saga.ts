import { put, take, takeLeading, select, call } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { searchDataAction, SearchDataState, selectsearchData } from '@lib/store/searchData/searchData.slice'
import isUndefined from 'lodash/isUndefined'
import { navActions } from '@lib/store/nav/nav.slice'

function* flowSubmitSearchSaga() {
  yield put(searchDataAction.beginFlowSubmitSearch())
  const { keyword }: SearchDataState = yield select(selectsearchData)

  const { data, error } = yield fetchEndpoint('getSearchedResults', {
    keyword,
  })
  const searchedResults = isUndefined(data) ? [] : data.data
  yield put(searchDataAction.setSearchedResults({ searchedResults }))
  yield put(searchDataAction.setIsSubmitted({ isSubmitted: true }))

  if (error) {
    // nav to 404
    yield put(searchDataAction.failureFlowSubmitSearch())
    // yield call(navActions.push())
    return
  }

  yield put(searchDataAction.successFlowSubmitSearch())
  yield put(navActions.push({ url: 'viewpost' }))
}

function* watchSubmitSearchSaga() {
  yield takeLeading(searchDataAction.requestFlowSubmitSearch.type, flowSubmitSearchSaga)
}

export default [watchSubmitSearchSaga]
