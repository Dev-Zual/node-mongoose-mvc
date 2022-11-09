const mongoose = require("mongoose");
const Stock = require("../models/Stock");
const ObjectId = mongoose.Types.ObjectId;

exports.getStockService = async () => {
  const result = await Stock.find({});
  return result;
};
exports.createStockService = async (data) => {
  const result = await Stock.create(data);
  return result;
};
exports.getAStockService = async (id) => {
  // const result = await Stock.findOne({ _id: id })
  //   .populate("brand.id")
  //   .populate("store.id")
  //   .populate("suppliedBy.id");

  const stock = await Stock.aggregate([{ $match: { _id: ObjectId(id) } }]);

  return stock;
};
