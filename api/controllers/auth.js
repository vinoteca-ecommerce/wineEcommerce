const jwt_decode= require('jwt-decode')
const  { response } = require('express');
const bcryptjs = require('bcryptjs');
const {jwtGenerator} = require('../helpers/jwtgenerator')
const User = require('../models/user');
const jwt = require('jsonwebtoken');


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

const googleSingIn=async(req,res)=>{
    const {id_token}=req.body;

    try {
        const {name, email , picture}=jwt_decode(id_token)
        
        let user= await User.findOne({email});
        console.log(user)
        if(!user){
            
            const data={
                name,
                email,
                img:picture,
                password:'/._./',
                google:true
            }
            user= new User(data)
            await user.save();
        }
        if(!user.state){
            return res.status(401).json({
                msg:'blocked user.'
            })
        }

        const token = await jwtGenerator(user.id);

        res.json({
            token,
            user})
    } catch (error) {
        res.status(400).send('bad request, contact the admin')
    }
}

const verifyAccount=async(req,res)=>{
    const{token}=req.params
    let email=null
    try {
        const payload=jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        email=payload.uid
    } catch (error) {
        res.json({
            status:'failed',
            msg:error
        })
    }
    return User.findById(email)
        .then(user=>{

            if(!user) throw new Error('User not found');
            if(user.verified) return res.send('User already verified!');
            user.verified=true;
            user.save();
            res.send('User verified')
        })
}




module.exports = {
    loginController,
    googleSingIn,
    verifyAccount
}