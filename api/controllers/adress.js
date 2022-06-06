const { response } =  require('express');
const Adress = require('../models/adress');



const postAdress = async(req, res = response) => {

    const { name , adress, city, province, phone_number, notes } = req.body

    const data = {
        name,
        adress,
        city,
        province,
        phone_number,
        notes,
        state: true,
        user: req.user._id
    }

    const newAdress = new Adress(data);

    await newAdress.save();

    res.status(201).json({data});

}




module.exports = {
    postAdress
}