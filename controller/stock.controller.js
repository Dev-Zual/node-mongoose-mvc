const {
  getStockService,
  createStockService,
  getAStockService,
} = require("../services/stock.service");

exports.getStock = async (req, res) => {
  try {
    const result = await getStockService();
    res.status(200).json({
      status: "success",
      message: "successfully got stock",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.createStock = async (req, res) => {
  try {
    const stock = await createStockService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully created stock",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getAStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await getAStockService(id);
    res.status(200).json({
      status: "success",
      message: "successfully got stock",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
