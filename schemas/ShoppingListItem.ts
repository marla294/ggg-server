import { integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const ShoppingListItem = list({
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    ingredient: relationship({ ref: 'Ingredient' }),
    user: relationship({ ref: 'User.shoppingList' }),
  },
});
