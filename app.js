const express = require("express");
const cors = require("cors");
const app = express();
const productRoute = require("./router/v1/product.router");
const userRoute = require("./router/v1/user.route");
const storeRoute = require("./router/v1/store.route");
const supplierRoute = require("./router/v1/supplier.route");
const categoryRoute = require("./router/v1/category.route");
const stockRoute = require("./router/v1/stock.route");
const brandRoute = require("./router/v1/brand.router");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("route is working");
});

app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);

app.use(errorHandler);
module.exports = app;
