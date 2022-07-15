import { integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const RecipeItem = list({
  access: {
    create: isSignedIn,
    read: rules.canManageRecipeItems,
    update: rules.canManageRecipeItems,
    delete: rules.canManageRecipeItems,
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    ingredient: relationship({ ref: 'Ingredient' }),
    recipe: relationship({ ref: 'Recipe.ingredients' }),
    user: relationship({
      ref: 'User.recipeItems',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
  ui: {
    listView: {
      initialColumns: ['ingredient'],
    },
  },
});
