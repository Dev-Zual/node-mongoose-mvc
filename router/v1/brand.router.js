const express = require("express");
const brandControllers = require("../../controller/brand.controller");
const router = express.Router();

router
  .route("/")
  .get(brandControllers.getBrand)
  .post(brandControllers.createBrand);

router
  .route("/:id")
  .get(brandControllers.getBrandById)
  .patch(brandControllers.updateBrandById);

module.exports = router;
