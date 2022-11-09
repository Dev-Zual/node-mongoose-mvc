const Store = require("../models/Store.js");

exports.getStoreService = async () => {
  const store = await Store.find({});
  return store;
};
exports.createStoreService = async (data) => {
  const store = await Store.create(data);
  return store;
};
exports.getStoreByIdService = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};
