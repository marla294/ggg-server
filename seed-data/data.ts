function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

export const ingredients = [
  {
    name: 'Broccoli',
    description: 'it tries to warn you with its terrible taste',
    store: 'whole foods',
    units: 'oz',
    aisle: 'produce',
    homeArea: 'fridge',
    photo: {
      id: '6261a66b3ecc7e2d5cdbdbc4',
      filename: 'broccoli.jpg',
      originalFilename: 'broccoli.jpg',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      _meta: {
        public_id: 'ggg_test/6261a66b3ecc7e2d5cdbdbc4',
        width: 2500,
        height: 1875,
        format: 'jpg',
        resource_type: 'image',
        created_at: timestamp(),
        tags: [],
        bytes: 202440,
        type: 'upload',
        placeholder: false,
        url:
          'https://res.cloudinary.com/dczyzum8v/image/upload/v1650566765/ggg_test/6261a66b3ecc7e2d5cdbdbc4.jpg',
        secure_url:
          'https://res.cloudinary.com/dczyzum8v/image/upload/v1650566765/ggg_test/6261a66b3ecc7e2d5cdbdbc4.jpg',
        original_filename: 'file',
      },
    },
  },
  {
    name: 'Salmon',
    description: 'usually swims in the sea but here we eat it',
    store: 'whole foods',
    units: 'oz',
    aisle: 'meat',
    homeArea: 'freezer',
    photo: {
      id: 'frozen-norwegian-salmon',
      filename: 'frozen-norwegian-salmon.jpg',
      originalFilename: 'frozen-norwegian-salmon.jpg',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      _meta: {
        public_id: 'ggg_test/frozen-norwegian-salmon',
        width: 700,
        height: 391,
        format: 'jpg',
        resource_type: 'image',
        created_at: timestamp(),
        tags: [],
        bytes: 28320,
        type: 'upload',
        placeholder: false,
        url:
          'https://res.cloudinary.com/dczyzum8v/image/upload/v1650575336/ggg_test/frozen-norwegian-salmon.jpg',
        secure_url:
          'https://res.cloudinary.com/dczyzum8v/image/upload/v1650575336/ggg_test/frozen-norwegian-salmon.jpg',
        original_filename: 'file',
      },
    },
  },
];
