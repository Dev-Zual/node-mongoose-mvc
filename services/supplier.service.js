const Supplier = require("../models/Supplier");

exports.getSupplierService = async () => {
  const result = await Supplier.find({});
  return result;
};
exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};
exports.getASupplierService = async (id) => {
  const result = await Supplier.findOne({ _id: id });
  return result;
};
exports.updateSupplierService = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data);
  return result;
};
