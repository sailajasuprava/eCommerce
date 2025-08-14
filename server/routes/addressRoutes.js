const express = require("express");
const {
  getAllAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
  createAddress,
} = require("../controllers/addressController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(restrictTo("admin"), getAllAddresses).post(createAddress);
router
  .route("/:userId")
  .get(getAddress)
  .patch(updateAddress)
  .delete(deleteAddress);

module.exports = router;
