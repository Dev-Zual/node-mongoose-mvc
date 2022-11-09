const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Brand Name!"],
      trim: true,
      unique: true,
      maxLength: 100,
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    website: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },
    location: String,
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "brand",
  }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
