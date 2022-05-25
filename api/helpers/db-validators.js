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


module.exports = {
    rolValidator,
    userExistById
}