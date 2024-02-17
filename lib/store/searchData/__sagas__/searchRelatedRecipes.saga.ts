import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { searchDataAction, SearchDataState, selectsearchData } from '@lib/store/searchData/searchData.slice'

function* flowSearchRelatedRecipesSaga() {
  yield put(searchDataAction.beginFlowRelatedRecepies())
  const { keyword }: SearchDataState = yield select(selectsearchData)

  if (keyword.length < 1) {
    return
  }

  const { data, error, isLoading } = yield fetchEndpoint('getRelatedRecipes', {
    keyword,
  })

  if (isLoading) {
    // TODO handle loading
  }

  if (error) {
    // TODO popup
    yield put(searchDataAction.failureFlowRelatedRecepies())
    return
  }

  const { result } = data

  // TODO success popup

  yield put(searchDataAction.successFlowRelatedRecepies())
}

function* watchSearchRelatedRecipesSaga() {
  yield takeLeading(searchDataAction.requestFlowRelatedRecepies.type, flowSearchRelatedRecipesSaga)
}

export default [watchSearchRelatedRecipesSaga]
