import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { isSignedIn, permissions } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: process.env.CLOUDINARY_FOLDER,
};

export const IngredientImage = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManageIngredients,
    delete: permissions.canManageIngredients,
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    ingredient: relationship({ ref: 'Ingredient.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'ingredient'],
    },
  },
});
