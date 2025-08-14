const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cloth",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
