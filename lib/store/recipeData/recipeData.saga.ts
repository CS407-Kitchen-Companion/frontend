import createRecipe from '@lib/store/recipeData/__sagas__/createRecipe.saga'
import getRecipeById from '@lib/store/recipeData/__sagas__/getRecipeById.saga'


export default [...createRecipe, ...getRecipeById]
