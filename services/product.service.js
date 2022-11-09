const Brand = require("../models/Brand");
const Product = require("../models/Product");

exports.getProductsService = async (filters, queries) => {
  const results = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.field)
    .sort(queries.sortBy);
  // .limit(+limit)
  // .skip(skip);
  // const results = await Products.where("name")
  //   .equals(/\w/)
  //   .where("quantity")
  //   .gt(100)
  //   .limit(2);
  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, results };
};

exports.createProduct = async (data) => {
  const product = await Product.create(data);
  // const product = new Products(req.body);

  // instance creation -> do something -> save()
  // if (product.quantity == 0) {
  //   product.status = "out-of-stock";
  // }

  // const result = await product.save();

  const { _id: productId, brand } = product;

  await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } });
  return product;
};

exports.updateProduct = async (productId, data) => {
  //   const result = await Products.updateOne(
  //     { _id: productId },
  //     { $set: data },
  //     {
  //       runValidators: true,
  //     }
  //   );

  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProduct = async (data) => {
  // const result = await Products.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  const products = [];
  data.ids.forEach((product) =>
    products.push(Product.updateOne({ _id: product.id }, product.data))
  );

  const result = await Promise.all(products);

  return result;
};

exports.deleteProductById = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (id) => {
  const result = await Product.deleteMany({});

  return result;
};
