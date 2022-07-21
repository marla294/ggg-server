import { relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const Recipe = list({
  access: {
    create: isSignedIn,
    read: rules.canManageRecipes,
    update: rules.canManageRecipes,
    delete: rules.canManageRecipes,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'RecipeImage.recipe',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    user: relationship({
      ref: 'User.recipes',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
    ingredients: relationship({
      ref: 'RecipeItem.recipe',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
      },
    }),
    type: select({
      options: [
        { label: 'uncategorized', value: 'uncategorized' },
        { label: 'dessert', value: 'dessert' },
        { label: 'meat', value: 'meat' },
        { label: 'pasta', value: 'pasta' },
        { label: 'salad', value: 'salad' },
        { label: 'sandwich', value: 'sandwich' },
        { label: 'shopping list', value: 'shopping list' },
        { label: 'side', value: 'side' },
        { label: 'snack', value: 'snack' },
        { label: 'soup', value: 'soup' },
        { label: 'spice blend', value: 'spice blend' },
      ],
      defaultValue: 'uncategorized',
      ui: {
        displayMode: 'select',
        createView: { fieldMode: 'edit' },
      },
    }),
  },
});
