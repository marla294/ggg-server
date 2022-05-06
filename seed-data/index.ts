import { ingredients } from './data';

export async function insertSeedData(ks: any) {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

  console.log(`🌱 Inserting Seed Data: ${ingredients.length} Ingredients`);
  const { mongoose } = adapter;
  for (const ingredient of ingredients) {
    console.log(`  🛍️ Adding Ingredient: ${ingredient.name}`);
    const { _id } = await mongoose
      .model('IngredientImage')
      .create({ image: ingredient.photo, altText: ingredient.description });
    ingredient.photo = _id;
    await mongoose.model('Ingredient').create(ingredient);
  }
  console.log(`✅ Seed Data Inserted: ${ingredients.length} Ingredients`);
  console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
  process.exit();
}
