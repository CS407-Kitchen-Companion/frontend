import { all, call } from '@redux-saga/core/effects'
import popUpSaga from '@lib/store/ui/popUp/popUp.saga'
import userDataSaga from '@lib/store/userData/userData.saga'
import recipeDataSaga from '@lib/store/recipeData/recipeData.saga'
import searchDataSaga from '@lib/store/searchData/searchData.saga'
import navSaga from '@lib/store/nav/nav.saga'
import verifySaga from '@lib/store/verify/verify.saga'

const allSagas = [...popUpSaga, ...userDataSaga, ...searchDataSaga, ...recipeDataSaga, ...navSaga, ...verifySaga]

export default function* root() {
  yield all(allSagas.map(call))
}
