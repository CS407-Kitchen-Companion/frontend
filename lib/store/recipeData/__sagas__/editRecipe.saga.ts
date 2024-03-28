import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'
import { recipeDataAction, selectRecipeData, RecipeDataState, selectRecipeDataVar } from '../recipeData.slice'
import { navActions } from '@lib/store/nav/nav.slice'


function* flowEditRecipeSaga() {
  yield put(recipeDataAction.beginFlowEditRecipe())
  
  const { 
    recipeDataVar, visibility, postID

  }: RecipeDataState = yield select(selectRecipeData)
  // noti that request user to check the form
  const { 
    title,
    content,
    serves,
    calories,
    time,
    tags,
    appliances,
    ingredients 
  } = recipeDataVar
  console.log({title,
    content,
    serves,
    time,
    calories,
    tags,
    appliances,
    ingredients })
  const { data, error } = yield fetchEndpoint('editRecipe', {
    title,
    content,
    serves,
    time,
    calories,
    tags,
    appliances,
    ingredients,
    visibility,
    postID
  })
  
  console.log(ingredients)
  
  if (error) {
    // TODO popup
    console.log(error)
    yield put(recipeDataAction.failureFlowEditRecipe())
    return
  }

  const { result } = data


  // TODO success popup
  console.log(data)
  yield put(navActions.push({ url: `/viewpost/${postID}` }))
  yield put(recipeDataAction.successFlowEditRecipe())
}

function* watchSubmitRegisterSaga() {
  yield takeLeading(recipeDataAction.requestFlowEditRecipe.type, flowEditRecipeSaga)
}
export default [watchSubmitRegisterSaga]

