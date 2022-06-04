const nodemailer=require('nodemailer');
const user = require('../models/user');





const sendConfirmationEmail= async(user,token)=>{
 const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6f168f09064529",   
      pass: "c3117350e386e4"
    }
  });
//Poner la variable para el deployment
  const urlConfirm=`http://localhost:3000/confirmed?token=${token}`
  return transport.sendMail({
      from:'vinotecahenry@gmail.com',
      to:user.email,
      subject:"Please confirm your email",
      html:`<p>Confirm your email <a href="${urlConfirm}"> Confirm </a></p>`
  }).then(()=>user)
}


module.exports={sendConfirmationEmail}