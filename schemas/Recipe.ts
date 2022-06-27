import { relationship, text } from '@keystone-next/fields';
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
  },
});
