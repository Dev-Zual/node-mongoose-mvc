const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a supplier name"],
    trim: true,
    lowercase: true,
    minLength: [3, "name must be at least 3 character."],
    maxLength: [100, "name is too large"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "please provide a valid email"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  brand: {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    id: {
      type: ObjectId,
      required: true,
      ref: "Brand",
    },
  },
  contactNumber: [
    {
      type: String,
      required: [true, "please provide a contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "please provide a valid phone number",
      },
    },
  ],
  emergencyContactNumber: {
    type: String,
    required: [true, "please provide a emergency contact number."],
    validate: {
      validator: (value) => {
        return validator.isMobilePhone(value);
      },
      message: "please provide a valid phone number.",
    },
  },
  tradeLicenseNumber: {
    type: Number,
    required: [true, "please provide a trade license number"],
  },
  presentAddress: {
    type: String,
    required: [true, "please provide your present Address"],
  },
  permanentAddress: {
    type: String,
    required: [true, "please provide your permanent Address"],
  },
  location: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: [
        "dhaka",
        "rajshahi",
        "chattogram",
        "sylhet",
        "khulna",
        "barishal",
        "rangpur",
        "mymenshing",
      ],
      message: "{VALUE} is not a correct division",
    },
  },
  imageURL: {
    type: String,
    validate: [validator.isURL, "please provide a valid url"],
  },
  nationalIdImage: {
    type: String,
    required: [true, "please provide your national id"],
    validate: [validator.isURL, "please provide a valid url"],
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
