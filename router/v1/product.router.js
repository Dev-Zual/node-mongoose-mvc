const express = require("express");
const productsController = require("../../controller/product.controller");
const authorization = require("../../middleware/authorization");
const uploader = require("../../middleware/multer");
const verifyToken = require("../../middleware/verifyToken");

const router = express.Router();

router
  .route("/upload-image")
  .post(uploader.single("image"), productsController.uploadImage);

router.route("/bulk-update").patch(productsController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productsController.bulkDeleteProduct);

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    productsController.createAProduct
  );

// always id paramiter route  stay in the bottom othewise bulk update is not work
router
  .route("/:id")
  .get()
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProductById);

module.exports = router;
