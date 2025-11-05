const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');

dotenv.config();

// Menu data to seed
const menuItems = [
  // Biryanis
  {
    name: 'Prawns Biriyani',
    description: 'Fragrant rice dish with succulent prawns and aromatic spices.',
    price: 419,
    category: 'biryanis',
    image: 'https://lh5.googleusercontent.com/proxy/YSiFdIaKRYW0QsO7mSFMgfYDA7cy7yAfQSVrkvowKz8FQGhYqE45sx3q8bGJvZus1CP6O3O0XASwIC8NUtO_Bei0-Yo85EGU2Q2r_idqqUMQZm84zMs5gQ7b',
    isAvailable: true,
    preparationTime: 35,
    rating: 4.7
  },
  {
    name: 'Dum Biryani',
    description: 'Aromatic slow-cooked biryani with marinated meat and saffron.',
    price: 150,
    category: 'biryanis',
    image: 'https://suhana.com/cdn/shop/articles/500-x-380-Biryani.png?v=1709544702',
    isAvailable: true,
    preparationTime: 30,
    rating: 4.5
  },
  {
    name: 'Fry Piece Biryani',
    description: 'Crispy fried chicken or meat dish with bold spices.',
    price: 200,
    category: 'biryanis',
    image: 'https://i.ytimg.com/vi/iNwTdd2uk9s/maxresdefault.jpg',
    isAvailable: true,
    preparationTime: 30,
    rating: 4.6
  },
  {
    name: 'Wings Biriyani',
    description: 'Marinated chicken wings cooked with basmati rice.',
    price: 230,
    category: 'biryanis',
    image: 'https://us2guntur.com/images//10067img/ChikWingsBiryani_B_281020.jpg',
    isAvailable: true,
    preparationTime: 32,
    rating: 4.4
  },
  {
    name: 'Mutton Biryani',
    description: 'Tender mutton biryani with rich flavors and spices.',
    price: 530,
    category: 'biryanis',
    image: 'https://delishglobe.com/wp-content/uploads/2024/10/Mutton-Biryani-735x538.png',
    isAvailable: true,
    preparationTime: 40,
    rating: 4.8
  },
  {
    name: 'Hyderabadi Biryani',
    description: 'Layered chicken biryani with authentic Hyderabadi flavors.',
    price: 280,
    category: 'biryanis',
    image: 'https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-chicken-Biryani.jpg',
    isAvailable: true,
    preparationTime: 35,
    rating: 4.9
  },

  // Mandis
  {
    name: 'Chicken Mandi',
    description: 'Yemeni-style rice with grilled chicken and aromatic spices.',
    price: 750,
    category: 'mandis',
    image: 'https://images.slurrp.com/prod/recipe_images/transcribe/dinner/Chicken-Mandi.webp',
    isAvailable: true,
    preparationTime: 45,
    rating: 4.7
  },
  {
    name: 'Mutton Mandi',
    description: 'Tender mutton with long-grain rice and Arabic flavors.',
    price: 999,
    category: 'mandis',
    image: 'https://img.freepik.com/free-psd/delicious-lamb-shank-rice-dish-savory-stew-aromatic-spices_84443-42616.jpg',
    isAvailable: true,
    preparationTime: 50,
    rating: 4.8
  },

  // Cool Drinks
  {
    name: 'Coca Cola',
    description: 'Classic carbonated cola beverage.',
    price: 40,
    category: 'cool-drinks',
    image: 'https://citma.shorthandstories.com/6e7d13ef-02b7-42af-9d16-cce70df03f84/assets/G3zfKMJ2tq/shorthand-images5-2560x1440.jpg',
    isAvailable: true,
    preparationTime: 2,
    rating: 4.5
  },
  {
    name: 'Thums Up',
    description: 'Bold, fizzy cola with strong carbonation.',
    price: 40,
    category: 'cool-drinks',
    image: 'https://images.cnbctv18.com/wp-content/uploads/2022/02/thums-up-1-1019x573.png',
    isAvailable: true,
    preparationTime: 2,
    rating: 4.6
  },

  // Fast Foods
  {
    name: 'Fried Rice',
    description: 'Stir-fried rice with vegetables, eggs, and soy sauce.',
    price: 120,
    category: 'fast-foods',
    image: 'https://thechutneylife.com/wp-content/uploads/2021/03/Thaibasilfriedrice-reshoot-3-scaled.jpg',
    isAvailable: true,
    preparationTime: 20,
    rating: 4.4
  },
  {
    name: 'Chicken Manchurian',
    description: 'Crispy chicken in spicy, tangy sauce.',
    price: 240,
    category: 'fast-foods',
    image: 'https://orders.popskitchen.in/storage/2024/09/image-148.png',
    isAvailable: true,
    preparationTime: 25,
    rating: 4.7
  }
];

// Connect to database and seed
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected');

    // Delete existing menu items
    await MenuItem.deleteMany();
    console.log('🗑️  Existing menu items deleted');

    // Insert new menu items
    await MenuItem.insertMany(menuItems);
    console.log('✅ Menu items seeded successfully');

    console.log(`📊 Total items seeded: ${menuItems.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
