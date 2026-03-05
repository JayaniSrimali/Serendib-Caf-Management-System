require("dotenv").config();
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

const massiveNewItems = [
    // --- Coffee ---
    { name: "Espresso", description: "A highly concentrated, intensely flavored shot of premium Sri Lankan coffee.", price: 600.00, category: "Coffee", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80" },
    { name: "Double Espresso", description: "Two shots of intense premium coffee for an extra kick.", price: 800.00, category: "Coffee", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80" },
    { name: "Vanilla Latte", description: "Smooth espresso and steamed milk with a touch of sweet vanilla syrup.", price: 1300.00, category: "Coffee", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80" },
    { name: "Coconut Milk Mocha", description: "Our signature dark roast blended with rich chocolate and vegan coconut milk.", price: 1450.00, category: "Coffee", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80" },
    { name: "Irish Coffee (Non-Alcoholic)", description: "A classic coffee with non-alcoholic Irish cream flavored syrup and topped with whipped cream.", price: 1500.00, category: "Coffee", image: "https://images.unsplash.com/photo-1620052303531-15b5cd3d5de3?w=400&q=80" },

    // --- Tea ---
    { name: "Jasmine Green Tea", description: "Light green tea naturally scented with fresh jasmine blossoms.", price: 750.00, category: "Tea", image: "https://images.unsplash.com/photo-1627492275510-9118c7bc76f5?w=400&q=80" },
    { name: "Mint Infusion", description: "A refreshing caffeine-free herbal tea made from fresh mint leaves.", price: 700.00, category: "Tea", image: "https://images.unsplash.com/photo-1576092055620-337583ee3abf?w=400&q=80" },
    { name: "Ginger Black Tea", description: "Strong Ceylon black tea infused with freshly grated warm ginger.", price: 700.00, category: "Tea", image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80" },
    { name: "Sri Lankan Milk Tea (Kiri The)", description: "The authentic everyday creamy sweet milk tea found in local Sri Lankan shops.", price: 350.00, category: "Tea", image: "https://images.unsplash.com/photo-1596450514735-8025e11addac?w=400&q=80" },
    { name: "Plain Kahata Tea", description: "Strong, dark, and sweet plain black Ceylon tea, the true farmer's choice.", price: 250.00, category: "Tea", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },

    // --- Cold Beverages ---
    { name: "Iced Americano", description: "Espresso shots topped with cold water and ice.", price: 850.00, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80" },
    { name: "Strawberry Milkshake", description: "Thick creamy shake made from fresh strawberries and vanilla ice cream.", price: 1200.00, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1579954115545-a95591f28b24?w=400&q=80" },
    { name: "Iced Milo Frappe", description: "A crowd favorite - icy, crunchy, and richly chocolate malt Milo drink.", price: 1100.00, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80" },
    { name: "Fresh Lime Soda", description: "Fizzy club soda with a squeeze of fresh local lime and simple syrup.", price: 600.00, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
    { name: "Avocado Blast", description: "Creamy, naturally sweet avocado and milk smoothie, a Sri Lankan staple.", price: 1250.00, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1629851722830-ec6bc5b76ab6?w=400&q=80" },

    // --- Pastry & Bakery ---
    { name: "Pain au Chocolat", description: "Flaky buttery croissant dough filled with two strips of rich dark chocolate.", price: 950.00, category: "Pastry", image: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=400&q=80" },
    { name: "Fish Bun (Malu Paan)", description: "The iconic triangular Sri Lankan bun packed with spicy mackerel and potato filling.", price: 300.00, category: "Pastry", image: "https://images.unsplash.com/photo-1509315811345-672d83ce2be3?w=400&q=80" },
    { name: "Chicken Patty", description: "Golden, multi-layered flaky pastry holding savory spiced chicken mince.", price: 350.00, category: "Pastry", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&q=80" },
    { name: "Cinnamon Roll", description: "Soft dough swirled with Ceylon cinnamon and brown sugar, topped with cream cheese icing.", price: 850.00, category: "Pastry", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80" },
    { name: "Almond Croissant", description: "Twice-baked butter croissant filled with sweet almond frangipane and topped with sliced almonds.", price: 1000.00, category: "Pastry", image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=400&q=80" },

    // --- Desserts ---
    { name: "Chocolate Biscuit Pudding", description: "The ultimate Sri Lankan sweet treat: layers of Marie biscuits soaked in milk and rich chocolate buttercream.", price: 850.00, category: "Dessert", image: "https://images.unsplash.com/photo-1611095901309-847253bada88?w=400&q=80" },
    { name: "Curd & Treacle (Kiri Peni)", description: "Rich, creamy buffalo curd served with pure sweet Kithul palm treacle.", price: 600.00, category: "Dessert", image: "https://images.unsplash.com/photo-1495147466023-af5c19cbce24?w=400&q=80" },
    { name: "New York Cheesecake", description: "Dense, creamy, and rich vanilla cheesecake built on a graham cracker crust.", price: 1650.00, category: "Dessert", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80" },
    { name: "Red Velvet Cupcake", description: "Moist ruby-red cake topped with thick cream cheese frosting.", price: 550.00, category: "Dessert", image: "https://images.unsplash.com/photo-1614707682071-6c1f2ad4908b?w=400&q=80" },
    { name: "Tiramisu Slice", description: "Italian dessert made of ladyfingers dipped in espresso, layered with a whipped mascarpone mixture.", price: 1500.00, category: "Dessert", image: "https://images.unsplash.com/photo-1571115177098-24c42d640fb9?w=400&q=80" },

    // --- Savory & Meals ---
    { name: "Roast Paan & Pol Sambol", description: "Crunchy wood-fired roast bread served with spicy coconut sambol.", price: 450.00, category: "Savory", image: "https://images.unsplash.com/photo-1626200419189-3bc8ba79a61b?w=400&q=80" },
    { name: "Devilled Chicken Sub", description: "Sweet, spicy, and tangy Sri Lankan style devilled chicken packed into a submarine bun.", price: 1200.00, category: "Savory", image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?w=400&q=80" },
    { name: "Spicy Tuna Sandwich", description: "Creamy and spicy tuna mix with crunchy onions spread over toasted artisan bread.", price: 950.00, category: "Savory", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80" },
    { name: "Seafood Pol Roti", description: "Spiced coconut flatbread mixed with chopped squid and prawn pieces. Served with Lunu Miris.", price: 750.00, category: "Savory", image: "https://images.unsplash.com/photo-1509315811345-672d83ce2be3?w=400&q=80" },
    { name: "Chicken Biryani (Weekend Special)", description: "Fragrant basmati rice cooked with whole spices, served with a succulent piece of chicken and raita.", price: 1800.00, category: "Savory", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" }
];

const seedMoreLKR = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for massive LKR seeding...");

        const result = await MenuItem.insertMany(massiveNewItems);
        console.log(`Successfully added ${result.length} MORE LKR items to the menu!`);

    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        process.exit(0);
    }
};

seedMoreLKR();
