const express = require("express");
const { getMenuItems, getFeaturedItems, createMenuItem, updateMenuItem, deleteMenuItem } = require("../controllers/menuController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/featured", getFeaturedItems);
router.route("/").get(getMenuItems).post(protect, admin, createMenuItem);
router.route("/:id").put(protect, admin, updateMenuItem).delete(protect, admin, deleteMenuItem);

module.exports = router;
