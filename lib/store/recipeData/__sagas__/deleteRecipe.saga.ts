import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'
import { recipeDataAction, selectRecipeData, RecipeDataState, selectRecipeDataVar } from '../recipeData.slice'
import { navActions } from '@lib/store/nav/nav.slice'


function* flowDeleteRecipeSaga() {
  yield put(recipeDataAction.beginFlowDeleteRecipe())
  
  const { 
    postID 
  }: RecipeDataState = yield select(selectRecipeData)
  // noti that request user to check the form
 
  
  const { data, error } = yield fetchEndpoint('deleteRecipe', {
    postID
  })
  
  console.log(postID)
  
  if (error) {
    // TODO popup
    console.log(error)
    yield put(recipeDataAction.failureFlowDeleteRecipe())
    return
  }

  const { result } = data


  // TODO success popup
  console.log(data)
  yield put(recipeDataAction.resetRecipe())
  yield put(navActions.push({ url: '/main' }))
  yield put(recipeDataAction.successFlowDeleteRecipe())
}

function* watchSubmitRegisterSaga() {
  yield takeLeading(recipeDataAction.requestFlowDeleteRecipe.type, flowDeleteRecipeSaga)
}

export default [watchSubmitRegisterSaga]
