const { Category, User, Role, Product } = require("../models");



const rolValidator = async(role = '') =>{

    const rolExist = await Role.findOne({role});
    if(!rolExist){
         throw new Error(`Role ${role} doesnt exist.`);

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

module.exports = {
    rolValidator, categoryValidator,
    userExistById
}