const { response } = require("express");
const User = require('../models/user')




const getUsers=async(req,res=response)=>{
  const {limit=10,from=0}=req.query
 
  const [total, users]=await Promise.all([
    User.countDocuments({state:true}),
    User.find({state:true})
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    Users:total,
    users
  })

}



const getUserById=async (req,res=response)=>{
  const {id}=req.params
  
  const user=await User.findById(id);
console.log(id)
  if(!user){
    return res.status(404).send(`The user with de ID ${id} doesn't exist.`)
  }  
  res.send(
    user
  )
}

const postUser = async (req, res=response) => {
    const body = req.body; 
    const usuario = new User(body);
  

    await usuario.save();
  
    res.status(201).json(usuario);
  };
  


  module.exports = {
    postUser,
    getUserById,
    getUsers
  }