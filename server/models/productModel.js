const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    prodname: {
      type: String,
      required: [true, "This field is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "This field is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "This field is required."],
    },
    image: {
      type: String,
      required: [true, "This field is required."],
    },
    category: {
      type: String,
      required: [true, "This field is required."],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
