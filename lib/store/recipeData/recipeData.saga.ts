import createRecipe from '@lib/store/recipeData/__sagas__/createRecipe.saga'
import getRecipeById from '@lib/store/recipeData/__sagas__/getRecipeById.saga'
import deleteRecipe from '@lib/store/recipeData/__sagas__/deleteRecipe.saga'
import editRecipe from './__sagas__/editRecipe.saga'

export default [...createRecipe, ...getRecipeById, ...deleteRecipe, ...editRecipe]
