const { response } = require("express");
const Purchase = require("../models/purchase");

const getPurchase = async (req, res = response) => {
  const purchases = await Purchase.find();

  const user = req.user._id;

  const filter = purchases.filter(
    (e) => e.user._id.toString() === user.toString()
  );

  res.status(201).json(filter);
};

const purchaseStatus = async (req, res = response) => {
  const { payment_id, status, cart } = req.body;

  const data = {
    payment_id,
    status,
    cart,
    user: req.user._id,
  };

  const purchase = new Purchase(data);

  await purchase.save();

  res.status(201).json(purchase);
};

module.exports = {
  purchaseStatus,
  getPurchase,
};
