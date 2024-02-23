import { all, call } from '@redux-saga/core/effects'
import popUpSaga from '@lib/store/ui/popUp/popUp.saga'
import userDataSaga from '@lib/store/userData/userData.saga'
import recipeDataSaga from '@lib/store/recipeData/recipeData.saga'
import searchDataSaga from '@lib/store/searchData/searchData.saga'

const allSagas = [...popUpSaga, ...userDataSaga, ...searchDataSaga]

export default function* root() {
  yield all(allSagas.map(call))
}
