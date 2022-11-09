const express = require("express");
const stockController = require("../../controller/stock.controller");
const router = express.Router();

router
  .route("/")
  .get(stockController.getStock)
  .post(stockController.createStock);
router.route("/:id").get(stockController.getAStock).patch();

module.exports = router;
