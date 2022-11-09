const mongoose = require("mongoose");
// const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
// SCHEMA -> MODEL --> QUERY

// SCHEMA
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      minLength: [3, "Name should be min 3"],
      maxLength: [100, "Name should be max 100"],
      unique: [true, "Product name should be unique"],
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a product description."],
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        // validate: {
        //   validator: (value) => {
        //     if (!Array.isArray(val*ue)) {
        //       return false;
        //     }
        //     let isValid = true;
        //     value.forEach((url) => {
        //       if (!validator.isURL(url)) {
        //         isValid = false;
        //       }
        //     });
        //     return isValid;
        //   },
        //   message: "Please provide valid image urls",
        // },
      },
    ],
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
    // quantity: {
    //   type: Number,
    //   required: true,
    //   min: [0, "quantity can't be negative."],
    //   validate: {
    //     validator: (value) => {
    //       const isValid = Number.isInteger(value);
    //       if (isValid) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     },
    //   },
    //   message: "quantity must be an integer.",
    // },
    // status: {
    //   type: String,
    //   required: true,
    //   enum: {
    //     values: ["in-stock", "out-of-stock", "discontinued"],
    //     message: "status can't be {VALUE}",
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre / post
// productSchema.pre("save", function (next) {
//   console.log("before saving data");

//   // this ->
//   if (this.quantity == 0) {
//     this.status = "out-of-stock";
//   }
//   next();
// });

// productSchema.post("save", function (doc, next) {
//   console.log("after saving data");
//   next();
// });

// mongoose instance
productSchema.methods.logger = function () {
  console.log(`data saved for ${this.name}`);
};

// create the MODEL
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
