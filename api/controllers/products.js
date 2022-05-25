const { response } = require("express");
const Product = require("../models/product");



const getWines = async( req, res = response )  =>{

    const { limit = 10 , start = 0 } = req.query;
    const query = { state: true  };

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate('category', 'name')
        .skip(Number(start))
        .limit(Number(limit)),
    ]);


    res.json({
      total,
      products
    });

}





const postProduct = async (req, res = response) => {
  const { state, name, ...body } = req.body;

  const productDB = await Product.findOne({ name });

  if (productDB) {
    return res.status(400).json({
      msg: `The product:  ${name} already exist`,
    });
  }

  const data = {
    ...body,
    name,
  };
  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

module.exports = {
  postProduct,
  getWines
};
