const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cloth",
      required: true,
      unique: true,
    },
    stockBySizeColor: [
      {
        size: String,
        color: String,
        quantity: {
          type: Number,
          min: 0,
          required: true,
        },
      },
    ],
    totalStock: {
      type: Number,
      required: true,
      min: 0,
    },
    restockDate: Date,
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
