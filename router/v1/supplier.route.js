const express = require("express");
const supplierController = require("../../controller/supplier.controller");
const router = express.Router();

router
  .route("/")
  .get(supplierController.getSupplier)
  .post(supplierController.createSupplier);

router
  .route("/:id")
  .get(supplierController.getASupplier)
  .patch(supplierController.updateSupplier);

module.exports = router;
