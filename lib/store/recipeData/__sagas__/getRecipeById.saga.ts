import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { RecipeDataState, recipeDataAction, selectRecipeDataVar, selectPostID, selectRecipeData, selectIsSubmitted } from '@lib/store/recipeData/recipeData.slice'
import isUndefined from 'lodash/isUndefined'

function* flowGetRecipeByIdSaga() {
  console.log('IN flowGetRecipeByIdSaga...')

  yield put(recipeDataAction.beginFlowGetRecipeById())
  const { postID }: RecipeDataState = yield select(selectRecipeData)

  const { data, error } = yield fetchEndpoint('getRecipeById', {
    postID, 
  })

  const recipeDataVar = isUndefined(data) ? [] : data.data
  yield put(recipeDataAction.setRecipeDataVar({ recipeDataVar }))
  yield put(recipeDataAction.setIsSubmitted({ isSubmitted: true }))

  console.log('recipeDataVar', recipeDataVar)
  console.log('selectRecipeDataVar', selectRecipeDataVar)
  console.log('selectIsSubmitted', selectIsSubmitted)
  

  if (error) {
    yield put(recipeDataAction.failureFlowGetRecipeById())
    return
  }
  // TODO uncomment it later
  // yield put(recipeDataAction.setFilter({ filter: data }))
  yield put(recipeDataAction.successFlowGetRecipeById())
}

function* watchGetRecipeByIdSaga() {
  yield takeLeading(recipeDataAction.requestFlowGetRecipeById.type, flowGetRecipeByIdSaga)
}

export default [watchGetRecipeByIdSaga]
