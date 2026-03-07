const MenuItem = require("../models/MenuItem");

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({});
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFeaturedItems = async (req, res) => {
    try {
        const items = await MenuItem.find({ featured: true });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, discountPrice, category, image, featured } = req.body;
        const menuItem = new MenuItem({ name, description, price, discountPrice, category, image, featured });
        const createdMenuItem = await menuItem.save();
        res.status(201).json(createdMenuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const { name, description, price, discountPrice, category, image, available, featured } = req.body;
        const menuItem = await MenuItem.findById(req.params.id);

        if (menuItem) {
            menuItem.name = name || menuItem.name;
            menuItem.description = description || menuItem.description;
            menuItem.price = price || menuItem.price;
            menuItem.discountPrice = discountPrice !== undefined ? discountPrice : menuItem.discountPrice;
            menuItem.category = category || menuItem.category;
            menuItem.image = image || menuItem.image;
            menuItem.available = available !== undefined ? available : menuItem.available;
            menuItem.featured = featured !== undefined ? featured : menuItem.featured;

            const updatedMenuItem = await menuItem.save();
            res.json(updatedMenuItem);
        } else {
            res.status(404).json({ message: "Menu item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (menuItem) {
            await menuItem.deleteOne();
            res.json({ message: "Menu item removed" });
        } else {
            res.status(404).json({ message: "Menu item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMenuItems, getFeaturedItems, createMenuItem, updateMenuItem, deleteMenuItem };
