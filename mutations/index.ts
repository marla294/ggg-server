import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToShoppingList from './addToShoppingList';
import updateShoppingItemQuantity from './updateShoppingItemQuantity';

const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToShoppingList(ingredientId: ID, quantity: String): ShoppingListItem
    }
    type Mutation {
      updateShoppingItemQuantity(
        ingredientId: ID
        quantity: String
      ): ShoppingListItem
    }
  `,
  resolvers: {
    Mutation: {
      addToShoppingList,
      updateShoppingItemQuantity,
    },
  },
});
