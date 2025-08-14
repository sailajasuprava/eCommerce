const express = require("express");
const {
  getAllClothes,
  getCloth,
  updateCloth,
  deleteCloth,
  createCloth,
} = require("../controllers/clothContoller");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(getAllClothes)
  .post(protect, restrictTo("admin"), createCloth);
router
  .route("/:clothId")
  .get(getCloth)
  .patch(protect, restrictTo("admin"), updateCloth)
  .delete(protect, restrictTo("admin"), deleteCloth);

module.exports = router;
