import { integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const RecipeItem = list({
  access: {
    create: isSignedIn,
    read: isSignedIn,
    update: isSignedIn,
    delete: isSignedIn,
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    ingredient: relationship({ ref: 'Ingredient' }),
    recipe: relationship({ ref: 'Recipe.ingredients' }),
  },
});
