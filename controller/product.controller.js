const { ObjectId } = require("mongodb");
const data = require("../data/data.json");
const {
  getProductsService,
  createProduct,
  updateProduct,
  bulkUpdateProduct,
  deleteProductById,
  bulkDeleteProductService,
} = require("../services/product.service");

exports.getAllProducts = async (req, res, next) => {
  try {
    // console.log(req.query);
    let filters = { ...req.query };

    // sort, page, limit -> exclude
    const excludeFields = ["limit", "page", "sort"];
    excludeFields.forEach((field) => delete filters[field]);

    // filtering with operators
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);

    // sorting product
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      queries.sortBy = sortBy;
    }

    //  filtering specific data
    if (req.query.fields) {
      const field = req.query.fields.split(",").join(" ");
      queries.field = field;
    }

    // pagination
    if (req.query.page) {
      const { page = 1, limit = 4 } = req.query;
      // page 1 --> 1-10
      // page 2 --> 11-20 page 2 --> skip 1-10 --> 2-1 -> 1 * 10
      // page 1 --> 21-30
      // page 1 --> 31-40
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const results = await getProductsService(filters, queries);

    res.status(200).json({
      status: "success",
      message: "successfully got the data",
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't got the data",
      error: error.message,
    });
  }
};

exports.createAProduct = async (req, res, next) => {
  try {
    // save or create product
    const result = await createProduct(req.body);

    // result.logger();

    res.status(200).json({
      status: "success",
      message: "data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data is not inserted.",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    // const filter = { _id: ObjectId(id) };

    const result = await updateProduct(id, data);

    res.status(200).json({
      status: "success",
      message: "data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data update fail",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProduct(req.body);

    res.status(200).json({
      status: "success",
      message: "data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data update fail",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductById(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "couldn't delete the product",
      });
    }

    res.status(200).json({
      status: "success",
      message: "data deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data deleted fail",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: "success",
      message: "data deleted  successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data deleted fail",
      error: error.message,
    });
  }
};

// upload files

exports.uploadImage = async (req, res, next) => {
  try {
    res.status(200).json(req.file);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
