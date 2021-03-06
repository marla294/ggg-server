import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Ingredient } from './schemas/Ingredient';
import { IngredientImage } from './schemas/IngredientImage';
import { RecipeImage } from './schemas/RecipeImage';
import { RecipeItem } from './schemas/RecipeItem';
import { Role } from './schemas/Role';
import { ShoppingListItem } from './schemas/ShoppingListItem';
import { Recipe } from './schemas/Recipe';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { permissionsList } from './schemas/fields';
import { extendGraphqlSchema } from './mutations';

const databaseURL =
  process.env.DATABASE_URL ||
  'mongodb+srv://marla294:Ebe1dnY9GvuyHvuR@gggcluster.le4fn.mongodb.net/ggg?retryWrites=true&w=majority';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 365, // How long should a user stay logged in
  secret: process.env.COOKIE_SECRET,
  sameSite: 'none',
  secure: true,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    async sendToken(args) {
      console.log({ args });

      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true, // pass along cookie from session config
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      User,
      Ingredient,
      IngredientImage,
      Role,
      ShoppingListItem,
      Recipe,
      RecipeImage,
      RecipeItem,
    }),
    extendGraphqlSchema,
    ui: {
      // Only show the UI for people who pass this test
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL query
      User: `id role { ${permissionsList.join(' ')} }`,
    }),
  })
);
