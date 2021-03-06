
const { Category, User, Role, Product, Purchase, Address } = require("../models");



const rolValidator = async(role = '') =>{

    const rolExist = await Role.findOne({role});
    if(!rolExist){
         throw new Error(`Role ${role} doesnt exist.`);

    }
}

const emailExist = async(email = '')=>{
    const emailValid = await User.findOne({email});
    if(emailValid){
        throw new Error(`The email: ${email} already exist`)
    }
}


const userExistById=async(id='')=>{
    const validateUser= await User.findById(id)
    if(!validateUser){
        throw new Error (`The ID ${id} doesn't exists.`)
    }
}


const categoryValidator =  async(id = '')=>{
    
    const categoryExist = await Category.findById(id);
    if(!categoryExist){
        throw new Error(`The category: ${id} doesnt exist.`)
    }
}

const productIdValidator = async (id='')=>{
    
    const productExist = await Product.findById(id);
    if(!productExist){
        throw new Error(`The product : ${id} doesnt exist`)
    }


}


const purchaseValidator = async (id='') =>{
    const purchaseExist = await Purchase.findById(id);
    if(!purchaseExist){
        throw new Error (`The purchase: ${id} doesnt exist`)
    }
}
 
const addressValidator = async (id='')=>{

    const addressExist = await Address.findById(id);
    
    if(!addressExist){
        throw new Error (`The Adress : ${id} doesnt exist`)
    }
}

module.exports = {
    rolValidator, 
    categoryValidator,
    userExistById,
    emailExist,
    productIdValidator,
    purchaseValidator,
    addressValidator
}