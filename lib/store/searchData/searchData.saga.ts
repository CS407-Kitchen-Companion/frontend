import searchRelatedRecipesSaga from '@lib/store/searchData/__sagas__/searchRelatedRecipes.saga'
import submitSearchSaga from '@lib/store/searchData/__sagas__/submitSearch.saga'
import getFilterSaga from '@lib/store/searchData/__sagas__/getFilter.saga'

export default [...searchRelatedRecipesSaga, ...submitSearchSaga, ...getFilterSaga]
