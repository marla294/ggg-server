import { KeystoneContext } from '@keystone-next/types';
import { RecipeItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToRecipe(
  root: any,
  {
    ingredientId,
    recipeId,
    quantity,
  }: { ingredientId: string; recipeId: string; quantity: string },
  context: KeystoneContext
): Promise<RecipeItemCreateInput> {
  // 1. Query the current user, see if they are signed in
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the recipe
  const allRecipeItems = await context.lists.RecipeItem.findMany({
    where: {
      ingredient: { id: ingredientId },
      recipe: { id: recipeId },
    },
    resolveFields: 'id, quantity',
  });
  const [existingRecipeItem] = allRecipeItems;
  // 3. See if the item they are adding is already in the recipe
  // 3.1 If so, ingrement by the quantity that they are adding
  if (existingRecipeItem) {
    return context.lists.RecipeItem.updateOne({
      id: existingRecipeItem.id,
      data: { quantity: existingRecipeItem.quantity + +quantity },
    });
  }
  // 3.2 If not, create a new recipe item
  return context.lists.RecipeItem.createOne({
    data: {
      ingredient: { connect: { id: ingredientId } },
      recipe: { connect: { id: recipeId } },
      quantity: +quantity,
    },
  });
}

export default addToRecipe;
