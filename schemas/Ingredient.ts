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
        { label: 'whole foods', value: 'whole foods' },
        { label: 'hyvee', value: 'hyvee' },
        { label: 'family fare', value: 'family fare' },
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
        { label: 'uncategorized', value: 'uncategorized' },
        { label: 'oz', value: 'oz' },
        { label: 'tbs', value: 'tbs' },
        { label: 'tsp', value: 'tsp' },
        { label: 'can', value: 'can' },
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
        { label: 'produce', value: 'produce' },
        { label: 'meat', value: 'meat' },
        { label: 'dairy', value: 'dairy' },
        { label: 'canned goods', value: 'canned goods' },
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
        { label: 'pantry', value: 'pantry' },
        { label: 'fridge', value: 'fridge' },
        { label: 'freezer', value: 'freezer' },
        { label: 'kitchen', value: 'kitchen' },
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
    },
  },
});
