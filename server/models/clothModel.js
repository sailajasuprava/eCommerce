const mongoose = require("mongoose");

function arrayLimit(val) {
  return val.length <= 5;
}

const clothSchema = new mongoose.Schema(
  {
    prodname: {
      type: String,
      required: [true, "Clothing item name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      maxlength: 1000,
    },
    fabric: {
      type: String,
      required: [true, "Fabric is required"],
      trim: true,
      maxlength: 50,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["men", "women", "kids", "unisex"],
    },
    fit: {
      type: String,
      required: [true, "Fit is required"],
      enum: ["Slim", "Regular", "Relaxed", "Loose"],
    },
    occasion: {
      type: String,
      required: [true, "occasion is required"],
      enum: ["Casual", "Formal", "Party", "Sports", "Ethnic"],
    },
    //#fff not required in case of pants
    sleeveType: {
      type: String,
      enum: [
        "Sleeveless",
        "Short Sleeve",
        "Three-Quarter Sleeves",
        "Long Sleeve",
      ],
    },
    //#fff not required in case of pants
    neckType: {
      type: String,
      enum: ["Round Neck", "V-Neck", "Collared", "Boat Neck"],
    },
    //#fff not required in case of pants
    pattern: {
      type: String,
      required: [true, "pattern is required"],
      enum: [
        "Solid",
        "Printed",
        "Striped",
        "Checked",
        "Embroidered",
        "Lace",
        "Floral",
      ],
    },
    variants: [
      {
        color: {
          type: String,
          lowercase: true,
          required: true,
        },
        sizes: [
          {
            size: {
              type: String,
              enum: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
              required: true,
            },
            stock: {
              type: Number,
              default: 0,
              min: 0,
            },
          },
        ],
      },
    ],
    price: {
      type: Number,
      required: [true, "Fit is required"],
      min: [0, "Price must be a positive number"],
    },
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    offerPrice: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String], // URLs
      validate: [arrayLimit, "{PATH} exceeds the limit of 5 images"],
      default: [],
    },
    sku: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//VIRTUAL POPULATE
clothSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const Cloth = mongoose.model("Cloth", clothSchema);

module.exports = Cloth;
