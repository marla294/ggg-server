import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions, rules } from '../access';

export const User = list({
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    delete: permissions.canManageUsers,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
    isHidden: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password({
      isRequired: true,
      minLength: 8,
    }),
    joinDate: text({ isRequired: false }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    ingredients: relationship({
      ref: 'Ingredient.user',
      many: true,
    }),
    shoppingList: relationship({
      ref: 'ShoppingListItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
      },
    }),
    recipes: relationship({
      ref: 'Recipe.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
      },
    }),
    recipeImages: relationship({
      ref: 'RecipeImage.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
      },
    }),
    recipeItems: relationship({
      ref: 'RecipeItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
      },
    }),
  },
});
