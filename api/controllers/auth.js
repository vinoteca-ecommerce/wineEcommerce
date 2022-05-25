const  { response } = require('express');
const bcryptjs = require('bcryptjs');
const {jwtGenerator} = require('../helpers/jwtgenerator')
const User = require('../models/user');


const loginController = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                msg: 'Email is invalid'
            });
        }
        if (!user.state){
            return res.status(400).json({
                msg: 'User is invalid'
            });
        }

       const validatePassword = bcryptjs.compareSync(password, user.password);
   
       if(!validatePassword){
        return res.status(400).json({
            msg: 'Password is invalid'
        });
       }
        const token = await jwtGenerator(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Please contact with the administrator.'
        });
    }


   
}

module.exports = {
    loginController
}