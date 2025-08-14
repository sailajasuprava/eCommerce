const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cloth",
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Requested", "Approved", "Rejected", "Refunded"],
      default: "Requested",
    },
    refundAmount: {
      type: Number,
      min: 0,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    refundedAt: Date,
  },
  { timestamps: true }
);

const Return = mongoose.model("Return", returnSchema);

module.exports = Return;
