const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user"],
      unique: true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cloth",
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          default: 1,
          min: [1, "Minimum quantity is 1"],
        },
        selectedSize: {
          type: String,
          required: [true, "Size is required"],
        },
        selectedColor: {
          type: String,
          required: [true, "Color is required"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
