import { KeystoneContext } from '@keystone-next/types';
import { ShoppingListItemUpdateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function updateShoppingItemQuantity(
  root: any,
  { ingredientId, quantity }: { ingredientId: string; quantity: string },
  context: KeystoneContext
): Promise<ShoppingListItemUpdateInput> {
  // 1. Query the current user, see if they are signed in
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current user's shopping list
  const allShoppingListItems = await context.lists.ShoppingListItem.findMany({
    where: {
      ingredient: { id: ingredientId },
    },
    resolveFields: 'id, quantity',
  });
  const [existingShoppingListItem] = allShoppingListItems;
  // 3. See if the item they are adding is already in their shopping list
  // 3.1 If so, overwrite the quantity
  if (existingShoppingListItem) {
    return context.lists.ShoppingListItem.updateOne({
      id: existingShoppingListItem.id,
      data: { quantity: +quantity * 10 },
    });
  }
}

export default updateShoppingItemQuantity;
