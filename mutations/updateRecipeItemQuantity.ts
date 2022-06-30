import { KeystoneContext } from '@keystone-next/types';
import { RecipeItemUpdateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function updateRecipeItemQuantity(
  root: any,
  {
    ingredientId,
    recipeId,
    quantity,
  }: { ingredientId: string; recipeId: string; quantity: string },
  context: KeystoneContext
): Promise<RecipeItemUpdateInput> {
  // 1. Query the current user, see if they are signed in
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current user's shopping list
  const allRecipeItems = await context.lists.RecipeItem.findMany({
    where: {
      recipe: { id: recipeId },
      ingredient: { id: ingredientId },
    },
    resolveFields: 'id, quantity',
  });
  const [existingRecipeItem] = allRecipeItems;
  // 3. See if the item they are adding is already in their shopping list
  // 3.1 If so, overwrite the quantity
  if (existingRecipeItem) {
    return context.lists.RecipeItem.updateOne({
      id: existingRecipeItem.id,
      data: { quantity: +quantity },
    });
  }
}

export default updateRecipeItemQuantity;
