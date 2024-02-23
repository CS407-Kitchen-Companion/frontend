import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import isUndefined from 'lodash/isUndefined'
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
  const relatedRecipes = isUndefined(data) ? [] : data.data
  yield put(searchDataAction.setRelatedRecipes({ relatedRecipes }))
  yield put(searchDataAction.setIsSubmitted({ isSubmitted: false }))
  console.log('relatedrecipes')
  console.log(relatedRecipes)

  if (error) {
    yield put(searchDataAction.failureFlowRelatedRecepies())
    return
  }

  yield put(searchDataAction.successFlowRelatedRecepies())
}

function* watchSearchRelatedRecipesSaga() {
  yield takeLeading(searchDataAction.requestFlowRelatedRecepies.type, flowSearchRelatedRecipesSaga)
}

export default [watchSearchRelatedRecipesSaga]
