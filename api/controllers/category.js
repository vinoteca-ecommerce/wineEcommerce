const { response } = require("express");
const { Category, Product } = require("../models");

const getCategories = async (req, res = response) => {
  const { limit, start = 0 } = req.query;
  const query = { state: true };

  const categories = await Category.find(query);

  const result = categories.slice(start, limit);

  res.json({
    total: result.length,
    result,
  });
};

const getCategoriesId = async (req, res = response) => {
  const { id } = req.params;
  const { limit, start = 0 } = req.query;
  const query = { category: id };

  const productsCategory = await Product.find(query).populate(
    "category",
    "name"
  );

  const result = productsCategory.slice(start, limit);

  res.json({
    total: result.length,
    result,
  });
};

const postCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDb = await Category.findOne({ name });

  if (categoryDb) {
    return res.status(400).json({
      msg: `The category:  ${name} already exist `,
    });
  }

  const data = {
    name,
  };

  const newCategory = await Category(data);

  await newCategory.save();

  res.status(201).json(newCategory);
};

const categoryUpdate = async (req, res = response) => {
  const { id } = req.params;
  const { state, ...body } = req.body;

  body.name = body.name.toUpperCase();

  const category = await Category.findByIdAndUpdate(id, body, { new: true });

  res.json(category);
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json(category);
};

module.exports = {
  postCategory,
  getCategories,
  getCategoriesId,
  categoryUpdate,
  deleteCategory,
};
