const { Category, User, Role, Product } = require("../models");



const rolValidator = async(role = '') =>{

    const rolExist = await Role.findOne({role});
    if(!rolExist){
         throw new Error(`Role ${role} doesnt exist`);

    }
}



module.exports = {
    rolValidator
}