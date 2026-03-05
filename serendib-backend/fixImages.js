require("dotenv").config();
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

// Extremely reliable unsplash image IDs that are known to exist and load well
const images = {
    Coffee: [
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1461023058943-07cb14c97940?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1587049352847-4d4b124054da?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1529892485635-a45aa811bc34?auto=format&fit=crop&w=400&q=80"
    ],
    Tea: [
        "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1576092055620-337583ee3abf?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1563822249548-9a72b6353d1e?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80"
    ],
    "Cold Beverage": [
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1505256904975-6f81a79fde62?auto=format&fit=crop&w=400&q=80"
    ],
    Pastry: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1621236378699-f21eec49e49a?auto=format&fit=crop&w=400&q=80"
    ],
    Dessert: [
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80"
    ],
    Savory: [
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1509315811345-672d83ce2be3?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1626200419189-3bc8ba79a61b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1613564834361-9436948817d1?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1481070555726-e2fe83477d15?auto=format&fit=crop&w=400&q=80"
    ]
};

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const items = await MenuItem.find();

        // Track indices to naturally round-robin through images per category
        let counts = { Coffee: 0, Tea: 0, "Cold Beverage": 0, Pastry: 0, Dessert: 0, Savory: 0 };

        let updatedCount = 0;

        for (let item of items) {
            if (images[item.category]) {
                const imgList = images[item.category];
                const newImg = imgList[counts[item.category] % imgList.length];

                item.image = newImg;
                counts[item.category]++;
                await item.save();
                updatedCount++;
            }
        }
        console.log(`Successfully fixed images for ${updatedCount} items!`);
    } catch (error) {
        console.error("Error connecting or updating DB:", error);
    } finally {
        process.exit(0);
    }
}
updateImages();
