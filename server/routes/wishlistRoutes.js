const express = require("express");
const {
  getAllWishlists,
  getWishlist,
  createOrUpdateWishlist,
  removeFromWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllWishlists).post(createOrUpdateWishlist);
router.route("/:userId").get(getWishlist).delete(deleteWishlist);
router.route("/:userId/:productId").delete(removeFromWishlist);

module.exports = router;
