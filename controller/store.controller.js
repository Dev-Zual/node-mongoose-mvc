const {
  getStoreService,
  createStoreService,
  getStoreByIdService,
} = require("../services/store.service");

exports.getStore = async (req, res, next) => {
  try {
    const store = await getStoreService();
    res.status(200).json({
      status: "success",
      message: "successfully got store",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
exports.createStore = async (req, res, next) => {
  try {
    const store = await createStoreService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully created store",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getStoreByIdService(id);
    res.status(200).json({
      status: "success",
      message: "successfully created store",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
