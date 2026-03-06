require("dotenv").config();
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

const itemsLKR = [
    // --- Hot Coffees ---
    { name: "Caramel Macchiato", description: "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and finished with a caramel drizzle.", price: 1500.00, category: "Coffee", image: "https://images.unsplash.com/photo-1485600108316-2fd4262b487c?w=400&q=80" },
    { name: "Flat White", description: "Smooth ristretto shots of espresso get the perfect amount of steamed whole milk.", price: 1200.00, category: "Coffee", image: "https://images.unsplash.com/photo-1574044199971-ceb5c40af9d6?w=400&q=80" },
    { name: "Hazelnut Latte", description: "Rich, full-bodied espresso combined with hazelnut syrup and steamed milk.", price: 1400.00, category: "Coffee", image: "https://images.unsplash.com/photo-1620052303531-15b5cd3d5de3?w=400&q=80" },
    { name: "Ceylon Cinnamon Latte", description: "Cozy blend of rich espresso & pure Ceylon cinnamon.", price: 1100.00, category: "Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80" },
    { name: "Serendib Mocha", description: "Dark chocolate meets our signature dark roast.", price: 1400.00, category: "Coffee", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80" },

    
    // --- Teas ---
    { name: "Earl Grey Reserve", description: "A robust black tea with rich notes of bergamot citrus and a hint of lavender.", price: 800.00, category: "Tea", image: "https://images.unsplash.com/photo-1596450514735-8025e11addac?w=400&q=80" },
    { name: "Spiced Chai Latte", description: "Black tea infused with cinnamon, clove and other warming spices is combined with steamed milk.", price: 1100.00, category: "Tea", image: "https://images.unsplash.com/photo-1576092055620-337583ee3abf?w=400&q=80" },

    // --- Cold Beverages ---
    { name: "Organic Iced Coffee", description: "Cold brewed overnight for a perfectly smooth finish.", price: 950.00, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1461023058943-07cb14c97940?w=400&q=80" },
    { name: "Mocha Frappé", description: "Rich chocolate flavor, coffee, milk and ice blended together and topped with whipped cream.", price: 1650.00, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1594916606019-b68aae36e9d6?w=400&q=80" },
    { name: "Fresh King Coconut Water", description: "100% natural, refreshing king coconut water sourced directly from local Sri Lankan palms.", price: 300.00, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1601292193524-1234c910408d?w=400&q=80" },

    // --- Savory ---
    { name: "Seeni Sambol & Egg Bun", description: "A true Sri Lankan classic: soft bun stuffed with sweet & spicy caramelized onions and a boiled egg.", price: 450.00, category: "Savory", image: "https://images.unsplash.com/photo-1509315811345-672d83ce2be3?w=400&q=80" },
    { name: "Chicken Kottu Wrap", description: "The famous Sri Lankan street food sensation, packed into a convenient and flavorful toasted wrap.", price: 1800.00, category: "Savory", image: "https://images.unsplash.com/photo-1626200419189-3bc8ba79a61b?w=400&q=80" },

    // --- Desserts & Pastries ---
    { name: "Chocolate Lava Cake", description: "Warm, rich chocolate cake with a gooey molten chocolate center.", price: 1600.00, category: "Dessert", image: "https://images.unsplash.com/photo-1611095901309-847253bada88?w=400&q=80" },
    { name: "Watalappan Delight", description: "Creamy traditional coconut custard pudding crafted with dark jaggery, cashew nuts, and warm spices.", price: 900.00, category: "Dessert", image: "https://images.unsplash.com/photo-1495147466023-af5c19cbce24?w=400&q=80" },
    { name: "Kithul Treacle Cake", description: "Moist cake sweetened with natural Kithul treacle.", price: 1200.00, category: "Dessert", image: "https://images.unsplash.com/photo-1557365362-e6e729a73e44?w=400&q=80" },
    { name: "Blueberry Muffin", description: "Tender, fluffy crumb loaded with juicy blueberries and topped with a sweet streusel crunch.", price: 750.00, category: "Pastry", image: "https://images.unsplash.com/photo-1607958996333-41bb279435a2?w=400&q=80" },
    { name: "Butter Croissant", description: "Classic French-style pastry made with 100% pure butter for a delicate, flaky crust.", price: 850.00, category: "Pastry", image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=400&q=80" }
];

const seedLKR = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for LKR seeding...");

        // Wipe old DB
        await MenuItem.deleteMany({});
        console.log("Deleted old menu items.");

        const result = await MenuItem.insertMany(itemsLKR);
        console.log(`Successfully added ${result.length} LKR items to the menu!`);

    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        process.exit(0);
    }
};

seedLKR();
