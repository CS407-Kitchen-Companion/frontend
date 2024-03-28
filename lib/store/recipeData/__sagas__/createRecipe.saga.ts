import { put, take, takeLeading, select, fork, takeEvery } from '@redux-saga/core/effects'
import { fetchEndpoint } from '@lib/store/helperSaga/fetchEndpoint'
import { checkLength, ComparisonType } from '@lib/utils/checkLength'
import { recipeDataAction, selectRecipeData, RecipeDataState, selectRecipeDataVar } from '../recipeData.slice'
import { navActions } from '@lib/store/nav/nav.slice'


function* flowCreateRecipeSaga() {
  yield put(recipeDataAction.beginFlowCreateRecipe())
  
  const { 
    recipeDataVar, visibility 
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
  const { data, error } = yield fetchEndpoint('createRecipe', {
    title,
    content,
    serves,
    time,
    calories,
    tags,
    appliances,
    ingredients,
    visibility 
  })
  
  console.log(ingredients)
  
  if (error) {
    // TODO popup
    console.log(error)
    yield put(recipeDataAction.failureFlowCreateRecipe())
    return
  }

  const { result } = data


  // TODO success popup
  console.log(data)
  yield put(navActions.push({ url: '/main' }))
  yield put(recipeDataAction.successFlowCreateRecipe())
}

function* watchSubmitRegisterSaga() {
  yield takeLeading(recipeDataAction.requestFlowCreateRecipe.type, flowCreateRecipeSaga)
}

export default [watchSubmitRegisterSaga]
