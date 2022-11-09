const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "please provide a name for this product"],
      trim: true,
      lowercase: true,
      // unique: [true, "please provide a unique name"],
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: [validator.isURL, "please provide valid url(s)"],
      },
    ],
    // {
    //   validator: (value) => {
    //     if (!Array.isArray(value)) {
    //       return false;
    //     }
    //     let isValid = true;
    //     value.forEach((url) => {
    //       if (!validator.isURL(url)) isValid = false;
    //     });
    //     return isValid;
    //   },
    //   message: "please provide valid url",
    // },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        required: [true, "please provide a store name"],
        trim: true,
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chattogram",
            "sylhet",
            "rajshahi",
            "khulna",
            "borishal",
            "mymenshing",
            "rangpur",
          ],
          message: "{VALUE} is not a valid name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        required: [true, "please provide a supplier name"],
        trim: true,
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
  { collection: "stock" }
);

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
