import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Recipe = list({
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: {
    name: text({ isRequired: true }),
    user: relationship({ ref: 'User.recipe' }),
  },
});
