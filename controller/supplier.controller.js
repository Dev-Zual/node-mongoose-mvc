const {
  getSupplierService,
  createSupplierService,
  getASupplierService,
  updateSupplierService,
} = require("../services/supplier.service");

exports.getSupplier = async (req, res) => {
  try {
    const suppliers = await getSupplierService();

    res.status(200).json({
      status: "success",
      message: "successfully got supplier",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully create supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getASupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await getASupplierService(id);
    res.status(200).json({
      status: "success",
      message: "successfully got the supplier",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await updateSupplierService(id, req.body);
    res.status(200).json({
      status: "success",
      message: "successfully updated the supplier",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
