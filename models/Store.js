const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
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
    description: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      type: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true },
  { collection: "store" }
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
