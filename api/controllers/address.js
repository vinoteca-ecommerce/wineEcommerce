const { response } = require("express");
const Address = require("../models/address");

const getAddress = async (req, res = response) => {
  const address = await Address.find();

  const user = req.user._id;


  const filter = address.filter(
    (e) => e.user._id.toString() === user.toString()
  );

  res.status(201).json(filter);
};

const postAddress = async (req, res = response) => {
  const { name, address, city, province, phone_number, notes } = req.body;

  const data = {
    name,
    address,
    city,
    province,
    phone_number,
    notes,
    state: true,
    user: req.user._id,
  };

  const newAddress = new Address(data);

  await newAddress.save();

  res.status(201).json( data );
};

const updateAddress = async (req, res = response) => {

  const { id } = req.params;
  const { name, address, city, province, phone_number, notes } = req.body;

  const filter = await Address.findByIdAndUpdate(
    id,
    { name, address, city, province, phone_number, notes },
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  ).clone();

  res.status(201).json(filter);
};

module.exports = {
  postAddress,
  getAddress,
  updateAddress,
};
