import searchRelatedRecipesSaga from '@lib/store/searchData/__sagas__/searchRelatedRecipes.saga'
import submitSearchSaga from '@lib/store/searchData/__sagas__/submitSearch.saga'

export default [...searchRelatedRecipesSaga, ...submitSearchSaga]
