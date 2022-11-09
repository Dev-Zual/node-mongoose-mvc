const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandByIdService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await createBrandService(data);
    res.status(200).json({
      status: "success",
      message: "Brand created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.getBrand = async (req, res, next) => {
  try {
    const result = await getBrandService();
    res.status(200).json({
      status: "success",
      message: "successfully got brand",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);
    if (!brand) {
      res.status(400).json({
        status: "failed",
        error: "couldn't get brand with id '" + id + "'",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully got brand",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.updateBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandByIdService(id, req.body);
    if (!result.nModified) {
      res.status(400).json({
        status: "failed",
        error: "couldn't update brand with id '" + id + "'",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully update brand with '" + id + "' this id.",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
