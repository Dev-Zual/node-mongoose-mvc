const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const port = process.env.PORT || 8080;

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Database connection is successful".red.bold);
  } catch (error) {
    console.log("Database connection error");
    console.log(error.message);
    process.exit(1);
  }
};

app.listen(port, () => {
  console.log(`server running at ${port}`.yellow.bold);
  dbConnection();
});
