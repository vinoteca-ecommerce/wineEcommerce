const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { jwtGenerator } = require("../helpers/jwtgenerator");
const { sendConfirmationEmail } = require("../helpers/mailler");

const getUsers = async (req, res = response) => {
  const { limit, start = 0 } = req.query;

  const users = await User.find({ state: true });
  const result = users.slice(start, limit);

  res.json({
    Users: result.length,
    result,
  });
};
const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(200).json({
    user,
  });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({ user });
};

const undeleteUser = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: true });

  res.send(user);
};

const getUserById = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send(`The user with de ID ${id} doesn't exist.`);
  }
  res.send(user);
};

const postUser = async (req, res = response) => {
  const { name, password, email, role } = req.body;
  const user = new User({ name, password, email, role });
  //encriptacion
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  const token = await jwtGenerator(user.id);

  sendConfirmationEmail(user, token);
  res.status(201).json({
    user,
    token,
  });
};

const userUpdateRole = async (req, res = response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ msg: " Debes especificar Rol " });
  }

  if (role === "ADMIN_ROLE") {
    const user = await User.findByIdAndUpdate(id, { role: "ADMIN_ROLE" });
    user.save();
    return res.status(201).json(user);
  }

  if (role === "SALES_ROLE") {
    const user = await User.findByIdAndUpdate(id, { role: "SALES_ROLE" });
    user.save();
    return res.status(201).json(user);
  }
  if(role === 'USER_ROLE'){
    const user = await User.findByIdAndUpdate(id, { role: "USER_ROLE" });
    user.save();
    return res.status(201).json(user);

  }

  return res.status(400).json({msg: 'Datos invalidos'})

};

module.exports = {
  postUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  undeleteUser,
  userUpdateRole,
};
