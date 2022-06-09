const nodemailer=require('nodemailer');
const user = require('../models/user');





const sendConfirmationEmail= async(user,token)=>{
 const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    auth: {
      user: "vinotecahenry@gmail.com",   
      pass: "eootayrvhprrinon"
    }
  });
//Poner la variable para el deployment
  const urlConfirm=`http://localhost:3000/confirmed?token=${token}`
  return transport.sendMail({
      from:'Vinoteca Henry🍷 <vinotecahenry@gmail.com>',
      to:user.email,
      subject:"Please confirm your email",
      html:`<p>Click the following link to confirm your email <a href="${urlConfirm}"> Confirm </a></p>`
  }).then(()=>user)
}

const purchaseEmail=(user)=>{
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    auth: {
      user: "vinotecahenry@gmail.com",   
      pass: "eootayrvhprrinon"
    }
  });
  return transport.sendMail({
    from:'Vinoteca Henry🍷 <vinotecahenry@gmail.com>',
    to:user.email,
    subject:"Confirmacion de compra",
    html:`<p>Muchas gracias por tu compra! tu pedido a sido recibido por nuestro equipo y sera enviado en la brevedad.</p>`
}).then(()=>user)

}





module.exports={
  sendConfirmationEmail,
  purchaseEmail}