import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canManageIngredients: checkbox({
    defaultValue: false,
    label: 'User can update and delete any ingredient',
  }),
  canManageRecipes: checkbox({
    defaultValue: false,
    label: 'User can update and delete any recipe',
  }),
  canManageRecipeImages: checkbox({
    defaultValue: false,
    label: 'User can update and delete any recipe image',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can Edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
