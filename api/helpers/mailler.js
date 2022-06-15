const nodemailer=require('nodemailer');
const user = require('../models/user');
const logo= require=('logo')




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
      html:`
     <center>
     <h3>Gracias por registrarte!</h3>
     <p>Haz click en el siguiente link para confirmar tu cuenta:<a href="${urlConfirm}"> Confirm </a></p>
     <img src=https://res.cloudinary.com/dwtkwakbc/image/upload/v1655222412/logoVinoteca_ozquit.png width="250px" height="250px" />
     </center>
      `
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
    html:`
    <center>
    <h4>Muchas gracias por tu compra! tu pedido a sido recibido por nuestro equipo y sera enviado en la brevedad.</h4>
    <img src=https://res.cloudinary.com/dwtkwakbc/image/upload/v1655222412/logoVinoteca_ozquit.png width="250px" height="250px" />
    </center>
    `
}).then(()=>user)

}





module.exports={
  sendConfirmationEmail,
  purchaseEmail}