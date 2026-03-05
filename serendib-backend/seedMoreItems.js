require("dotenv").config();
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem"); // Assuming script runs from serendib-backend root

const moreItems = [
    // --- Hot Coffees ---
    { name: "Caramel Macchiato", description: "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and finished with a caramel drizzle.", price: 6.50, category: "Coffee", image: "https://images.unsplash.com/photo-1485600108316-2fd4262b487c?w=400&q=80" },
    { name: "Cafe Americano", description: "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance.", price: 3.50, category: "Coffee", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80" },
    { name: "Flat White", description: "Smooth ristretto shots of espresso get the perfect amount of steamed whole milk to create a not-too-strong, not-too-creamy, just-right flavor.", price: 5.00, category: "Coffee", image: "https://images.unsplash.com/photo-1574044199971-ceb5c40af9d6?w=400&q=80" },
    { name: "Hazelnut Latte", description: "Our rich, full-bodied espresso combined with hazelnut syrup and steamed milk, then topped with a light layer of foam.", price: 5.75, category: "Coffee", image: "https://images.unsplash.com/photo-1620052303531-15b5cd3d5de3?w=400&q=80" },

    // --- Teas ---
    { name: "Nuwara Eliya Black Tea", description: "The champagne of Ceylon teas, known for its light, golden hue and delicate, fragrant flavor.", price: 4.00, category: "Tea", image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80" },
    { name: "Spiced Chai Latte", description: "Black tea infused with cinnamon, clove and other warming spices is combined with steamed milk.", price: 5.50, category: "Tea", image: "https://images.unsplash.com/photo-1576092055620-337583ee3abf?w=400&q=80" },
    { name: "Matcha Green Tea Latte", description: "Smooth and creamy matcha sweetened just right and served with steamed milk.", price: 6.00, category: "Tea", image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&q=80" },
    { name: "Earl Grey Reserve", description: "A robust black tea with rich notes of bergamot citrus and a hint of lavender.", price: 4.50, category: "Tea", image: "https://images.unsplash.com/photo-1596450514735-8025e11addac?w=400&q=80" },

    // --- Cold Beverages ---
    { name: "Iced Caramel Coffee", description: "Our signature blend served chilled over ice and sweetened with caramel syrup.", price: 5.00, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&q=80" },
    { name: "Tropical Passionfruit Iced Tea", description: "Premium black tea shaken with ice and infused with tangy exotic passionfruit.", price: 4.75, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80" },
    { name: "Mocha Frappé", description: "Rich chocolate flavor, coffee, milk and ice blended together and topped with whipped cream.", price: 6.50, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1594916606019-b68aae36e9d6?w=400&q=80" },
    { name: "Fresh King Coconut Water", description: "100% natural, refreshing king coconut water sourced directly from local Sri Lankan palms.", price: 3.50, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1601292193524-1234c910408d?w=400&q=80" },

    // --- Savory ---
    { name: "Seeni Sambol & Egg Bun", description: "A true Sri Lankan classic: soft bun stuffed with sweet & spicy caramelized onions and a boiled egg.", price: 3.50, category: "Savory", image: "https://images.unsplash.com/photo-1509315811345-672d83ce2be3?w=400&q=80" },
    { name: "Mutton Rolls (2 pcs)", description: "Crispy, breaded rolls generously filled with spiced minced mutton and potatoes, served with chili sauce.", price: 5.50, category: "Savory", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
    { name: "Loaded Cheese Toast", description: "Thick artisan sourdough topped with a blend of melted sharp cheddar and mozzarella with green chilies.", price: 6.00, category: "Savory", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80" },
    { name: "Chicken Kottu Wrap", description: "The famous Sri Lankan street food sensation, packed into a convenient and flavorful toasted wrap.", price: 7.50, category: "Savory", image: "https://images.unsplash.com/photo-1626200419189-3bc8ba79a61b?w=400&q=80" },

    // --- Desserts & Pastries ---
    { name: "Watalappan Delight", description: "Creamy traditional coconut custard pudding crafted with dark jaggery, cashew nuts, and warm spices.", price: 6.50, category: "Dessert", image: "https://images.unsplash.com/photo-1495147466023-af5c19cbce24?w=400&q=80" },
    { name: "Butter Croissant", description: "Classic French-style pastry made with 100% pure butter for a delicate, flaky crust.", price: 3.75, category: "Pastry", image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=400&q=80" },
    { name: "Chocolate Lava Cake", description: "Warm, rich chocolate cake with a gooey molten chocolate center, served with vanilla bean ice cream.", price: 8.00, category: "Dessert", image: "https://images.unsplash.com/photo-1611095901309-847253bada88?w=400&q=80" },
    { name: "Blueberry Muffin", description: "Tender, fluffy crumb loaded with juicy blueberries and topped with a sweet streusel crunch.", price: 4.25, category: "Pastry", image: "https://images.unsplash.com/photo-1607958996333-41bb279435a2?w=400&q=80" },
    { name: "Love Cake Slice", description: "A rich, heavily spiced Sri Lankan cake dense with semolina, cashews, pumpkin preserve, and rose water.", price: 5.50, category: "Dessert", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" }
];

const seedAdditionalItems = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        const result = await MenuItem.insertMany(moreItems);
        console.log(`Successfully added ${result.length} new items to the menu!`);

    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        process.exit(0);
    }
};

seedAdditionalItems();
