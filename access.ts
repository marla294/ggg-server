import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
};

// Rules can return a boolean, or a filter which limits which ingredients they can CRUD
export const rules = {
  canManageIngredients({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // If they have the permission to manage all ingredients, return true
    if (permissions.canManageIngredients({ session })) {
      return true;
    }

    // If they are the owner of this ingredient, they can also manage it
    // This is a "where" filter that we can use with graphql
    return { user: { id: session.itemId } };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    if (permissions.canManageUsers({ session })) {
      return true;
    }

    // Otherwise they may only update themselves
    return { id: session.itemId };
  },
};
