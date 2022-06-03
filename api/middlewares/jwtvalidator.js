const { response } = require('express')
const jwt = require('jsonwebtoken');
const { User } = require('../models/');

const jwtValidator = async(req, res = response, next) =>{

    const token = req.header('token')

    if(!token){
        return res.status(401).json({
            msg: 'token is required.'
        });
    }

    try {
       const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

       const user = await User.findById(uid);

      
       if (!user){
           return res.status(401).json({
               msg: 'User doesnt exist'
           })
       }
       if(!user.state){
           return res.status(401).json({
               msg : 'User is inactive'
           })
       }

       req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token invalid'
        })
    }


    

}

module.exports = {
    jwtValidator
};

