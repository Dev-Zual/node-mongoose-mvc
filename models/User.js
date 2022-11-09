const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "please provide a valid email!"],
      trim: true,
      lowercase: true,
      unique: [true, "please provide a email!"],
    },
    password: {
      type: String,
      required: [true, "password is required!"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumber: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "password {VALUE} is not strong enough",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "please confirm your password!"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "password don't match",
      },
    },
    role: {
      type: String,
      enum: ["buyer", "store-manager", "admin"],
      default: "buyer",
    },
    firstName: {
      type: String,
      required: [true, "please provide a first name"],
      trim: true,
      minLength: [3, "name must be at least 3 characters!,"],
      maxLength: [100, "name is too large!"],
    },
    lastName: {
      type: String,
      required: [true, "please provide a first name"],
      trim: true,
      minLength: [3, "name must be at least 3 characters!,"],
      maxLength: [100, "name is too large!"],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "please provide a valid contact number!",
      ],
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, "please provide a valid url!"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "inactive",
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  // const salt = bcrypt.genSaltSync(10);
  const saltRounds = 10;
  const password = this.password;

  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  return (isPasswordValid = bcrypt.compareSync(password, hash));
};

userSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.confirmationToken = token;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
