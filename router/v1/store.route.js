const express = require("express");
const storeController = require("../../controller/store.controller");
const router = express.Router();

router
  .route("/")
  .get(storeController.getStore)
  .post(storeController.createStore);

router.route("/:id").get(storeController.getStoreById);

module.exports = router;
