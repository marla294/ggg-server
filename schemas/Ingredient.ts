import { relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const Ingredient = list({
  access: {
    create: isSignedIn,
    read: rules.canManageIngredients,
    update: rules.canManageIngredients,
    delete: rules.canManageIngredients,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'IngredientImage.ingredient',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    // TODO: make separate schema for store later on
    store: select({
      options: [
        { label: 'uncategorized', value: 'uncategorized' },
        { label: 'family fare', value: 'family fare' },
        { label: 'hyvee', value: 'hyvee' },
        { label: 'whole foods', value: 'whole foods' },
      ],
      defaultValue: 'uncategorized',
      ui: {
        displayMode: 'select',
        createView: { fieldMode: 'edit' },
      },
    }),
    // TODO: make separate schema for units later on
    units: select({
      options: [
        { label: 'none', value: 'none' },
        { label: 'bag', value: 'bag' },
        { label: 'box', value: 'box' },
        { label: 'can', value: 'can' },
        { label: 'cup', value: 'cup' },
        { label: 'dozen', value: 'dozen' },
        { label: 'gallon', value: 'gallon' },
        { label: 'jar', value: 'jar' },
        { label: 'lb', value: 'lb' },
        { label: 'loaf', value: 'loaf' },
        { label: 'oz', value: 'oz' },
        { label: 'tbs', value: 'tbs' },
        { label: 'tsp', value: 'tsp' },
      ],
      defaultValue: 'uncategorized',
      ui: {
        displayMode: 'select',
        createView: { fieldMode: 'edit' },
      },
    }),
    // TODO: make separate schema for aisle later on
    aisle: select({
      options: [
        { label: 'uncategorized', value: 'uncategorized' },
        { label: 'baked goods', value: 'baked goods' },
        { label: 'bakery', value: 'bakery' },
        { label: 'breakfast', value: 'breakfast' },
        { label: 'canned goods', value: 'canned goods' },
        { label: 'cheese', value: 'cheese' },
        { label: 'cleaning', value: 'cleaning' },
        { label: 'condiments', value: 'condiments' },
        { label: 'dairy', value: 'dairy' },
        { label: 'frozen', value: 'frozen' },
        { label: 'health', value: 'health' },
        { label: 'meat', value: 'meat' },
        { label: 'paper', value: 'paper' },
        { label: 'pasta', value: 'pasta' },
        { label: 'produce', value: 'produce' },
        { label: 'seafood', value: 'seafood' },
        { label: 'snacks', value: 'snacks' },
        { label: 'soups', value: 'soups' },
        { label: 'spices', value: 'spices' },
      ],
      defaultValue: 'uncategorized',
      ui: {
        displayMode: 'select',
        createView: { fieldMode: 'edit' },
      },
    }),
    // TODO: make separate schema for home area later on
    homeArea: select({
      options: [
        { label: 'uncategorized', value: 'uncategorized' },
        { label: 'freezer', value: 'freezer' },
        { label: 'fridge', value: 'fridge' },
        { label: 'kitchen', value: 'kitchen' },
        { label: 'pantry', value: 'pantry' },
        { label: 'upstairs', value: 'upstairs' },
      ],
      defaultValue: 'uncategorized',
      ui: {
        displayMode: 'select',
        createView: { fieldMode: 'edit' },
      },
    }),
    user: relationship({
      ref: 'User.ingredients',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'units', 'aisle', 'homeArea', 'store'],
      initialSort: {
        field: 'name',
        direction: 'ASC',
      },
    },
  },
});
