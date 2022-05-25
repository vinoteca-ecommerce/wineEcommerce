const { response } = require("express");
const User = require('../models/user')





const postUser = async (req, res) => {
    const body = req.body; 
    const usuario = new User(body);
  

    await usuario.save();
  
    res.status(201).json(usuario);
  };
  


  module.exports = {
    postUser
  }