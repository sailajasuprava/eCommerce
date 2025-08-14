const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "Order must belong to a cart"],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Card", "UPI", "NetBanking", "COD"],
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Paid", "Failed"],
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
    itemsPrice: {
      type: Number,
      required: true,
      min: [0, "Items price can't be negative"],
    },
    shippingPrice: {
      type: Number,
      required: true,
      min: [0, "Shipping price can't be negative"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price can't be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
