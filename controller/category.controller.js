const {
  createCategoryService,
  getCategoryService,
} = require("../services/category.service");

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully created category",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
exports.getCategory = async (req, res, next) => {
  try {
    const result = await getCategoryService();
    res.status(200).json({
      status: "success",
      message: "successfully got category",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
