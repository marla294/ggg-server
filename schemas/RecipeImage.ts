import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { isSignedIn, permissions, rules } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: process.env.CLOUDINARY_FOLDER,
};

export const RecipeImage = list({
  access: {
    create: isSignedIn,
    read: rules.canManageRecipeImages,
    update: rules.canManageRecipeImages,
    delete: rules.canManageRecipeImages,
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    recipe: relationship({ ref: 'Recipe.photo' }),
    user: relationship({
      ref: 'User.recipeImages',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'recipe'],
    },
  },
});
