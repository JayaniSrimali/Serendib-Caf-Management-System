require("dotenv").config();
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");
const Review = require("./models/Review");

const itemsLKR = [
    // --- Hot Coffees ---
    { name: "Caramel Macchiato", description: "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and finished with a caramel drizzle.", price: 1500.00, category: "Coffee", image: "/assets/coffee_batch.png" },
    { name: "Flat White", description: "Smooth ristretto shots of espresso get the perfect amount of steamed whole milk.", price: 1200.00, category: "Coffee", image: "/assets/coffee_batch.png" },
    { name: "Hazelnut Latte", description: "Rich, full-bodied espresso combined with hazelnut syrup and steamed milk.", price: 1400.00, category: "Coffee", image: "/assets/coffee_batch.png" },
    { name: "Ceylon Cinnamon Latte", description: "Cozy blend of rich espresso & pure Ceylon cinnamon.", price: 1100.00, discountPrice: 950.00, featured: true, category: "Coffee", image: "/assets/ceylon_cinnamon_latte.png" },
    { name: "Serendib Mocha", description: "Dark chocolate meets our signature dark roast.", price: 1400.00, featured: true, category: "Coffee", image: "/assets/serendib_mocha.png" },
    { name: "Classic Cappuccino", description: "Perfect balance of espresso, steamed milk and foam.", price: 1050.00, category: "Coffee", image: "/assets/coffee_batch.png" },


    // --- Teas ---
    { name: "Earl Grey Reserve", description: "A robust black tea with rich notes of bergamot citrus and a hint of lavender.", price: 800.00, category: "Tea", image: "/assets/beverage_batch.png" },
    { name: "Spiced Chai Latte", description: "Black tea infused with cinnamon, clove and other warming spices is combined with steamed milk.", price: 1100.00, category: "Tea", image: "/assets/beverage_batch.png" },

    // --- Cold Beverages ---
    { name: "Organic Iced Coffee", description: "Cold brewed overnight for a perfectly smooth finish.", price: 950.00, featured: true, category: "Cold Beverage", image: "/assets/organic_iced_coffee.png" },
    { name: "Mocha Frappé", description: "Rich chocolate flavor, coffee, milk and ice blended together and topped with whipped cream.", price: 1650.00, category: "Cold Beverage", image: "/assets/beverage_batch.png" },
    { name: "Fresh King Coconut Water", description: "100% natural, refreshing king coconut water sourced directly from local Sri Lankan palms.", price: 300.00, category: "Cold Beverage", image: "/assets/pastry_batch.png" },

    // --- Savory ---
    { name: "Seeni Sambol & Egg Bun", description: "A true Sri Lankan classic: soft bun stuffed with sweet & spicy caramelized onions and a boiled egg.", price: 450.00, category: "Savory", image: "/assets/seeni_sambol_egg_bun.png" },
    { name: "Chicken Kottu Wrap", description: "The famous Sri Lankan street food sensation, packed into a convenient and flavorful toasted wrap.", price: 1800.00, category: "Savory", image: "/assets/chicken_kottu_wrap.png" },
    { name: "Spicy Chicken Pastry", description: "Flaky crust packed with savory roasted chicken.", price: 850.00, discountPrice: 750.00, category: "Savory", image: "/assets/pastry_batch.png" },

    // --- Desserts & Pastries ---
    { name: "Chocolate Lava Cake", description: "Warm, rich chocolate cake with a gooey molten chocolate center.", price: 1600.00, category: "Dessert", image: "/assets/dessert_batch.png" },
    { name: "Watalappan Delight", description: "Creamy traditional coconut custard pudding crafted with dark jaggery, cashew nuts, and warm spices.", price: 900.00, category: "Dessert", image: "/assets/watalappan_delight.png" },
    { name: "Kithul Treacle Cake", description: "Moist cake sweetened with natural Kithul treacle.", price: 1200.00, discountPrice: 1000.00, featured: true, category: "Dessert", image: "/assets/kithul_treacle_cake.png" },
    { name: "Blueberry Muffin", description: "Tender, fluffy crumb loaded with juicy blueberries and topped with a sweet streusel crunch.", price: 750.00, category: "Pastry", image: "/assets/dessert_batch.png" },
    { name: "Butter Croissant", description: "Classic French-style pastry made with 100% pure butter for a delicate, flaky crust.", price: 850.00, category: "Pastry", image: "/assets/pastry_batch.png" }
];

const reviews = [
    { name: "Sarah L.", role: "Coffee Enthusiast", rating: 5, review: "The Ceylon Cinnamon Latte is world-class. A truly authentic Sri Lankan experience in every sip!", image: "/assets/reviewer_1.png" },
    { name: "James W.", role: "Food Critic", rating: 5, review: "Incredible ambiance and even better coffee. The Serendib Mocha is a masterpiece of dark chocolate and roast.", image: "/assets/reviewer_2.png" },
    { name: "Amali R.", role: "Regular Guest", rating: 5, review: "My go-to spot for morning meetings. The Kithul Treacle Cake is simply divine. Highly recommended!", image: "/assets/reviewer_3.png" },
];

const seedLKR = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for LKR seeding...");

        // Wipe old DB
        await MenuItem.deleteMany({});
        await Review.deleteMany({});
        console.log("Deleted old menu items and reviews.");

        const menuResult = await MenuItem.insertMany(itemsLKR);
        console.log(`Successfully added ${menuResult.length} LKR items to the menu!`);

        const reviewResult = await Review.insertMany(reviews);
        console.log(`Successfully added ${reviewResult.length} customer reviews!`);

    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        process.exit(0);
    }
};

seedLKR();
