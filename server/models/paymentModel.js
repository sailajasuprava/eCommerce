const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Payment must be linked to a user"],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Payment must be linked to an order"],
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Card", "UPI", "NetBanking", "COD"],
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    transactionId: {
      type: String,
      required: function () {
        return this.status !== "Pending";
      },
      unique: true,
      sparse: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    gatewayResponse: {
      type: Object, // You can store raw response from payment gateway if needed
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
