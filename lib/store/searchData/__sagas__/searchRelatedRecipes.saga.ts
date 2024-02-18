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

  const { data, error } = yield fetchEndpoint('getRelatedRecipes', {
    keyword,
  })

  if (error) {
    yield put(searchDataAction.failureFlowRelatedRecepies())
    return
  }

  const { relatedRecipes } = data

  yield put(searchDataAction.setRelatedRecipes({ relatedRecipes }))
  yield put(searchDataAction.successFlowRelatedRecepies())
}

function* watchSearchRelatedRecipesSaga() {
  yield takeLeading(searchDataAction.requestFlowRelatedRecepies.type, flowSearchRelatedRecipesSaga)
}

export default [watchSearchRelatedRecipesSaga]
