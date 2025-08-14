const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
    },
    carrier: {
      type: String,
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ["Pending", "Shipped", "In Transit", "Delivered", "Failed"],
      default: "Pending",
    },
    estimatedDelivery: Date,
    shippedAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Shipping = mongoose.model("Shipping", shippingSchema);

module.exports = Shipping;
