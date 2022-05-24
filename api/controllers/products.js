const { response } = require('express');
const Product = require('../models/product')


const postProduct = async(req, res = response)=>{

    const  {state, name ,...body}  = req.body
    
    const productDB = await Product.findOne({name})

    if(productDB){
        return res.status(400).json({
            msg: `The product:  ${name} already exist`
        });
    }


    const data = {
        ...body,
        name
    }
    const product = new Product(data);


    await product.save();



    res.status(201).json(product);

}

module.exports = {
    postProduct
}