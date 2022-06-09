import React, {useEffect, useState} from "react";
import authService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';

import Style from "./Login.module.css"


const Register = ()=>{
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate()

    function handleCredentialResponse(response) {

      const id_token=response.credential
      console.log("ID: " + response.credential);
      axios.post('http://localhost:8000/auth/google',{id_token})
        .then(resp=>{
          console.log(resp)
          if(resp.data.token){
            localStorage.setItem('user', JSON.stringify(resp.data))
          }
          navigate('/');
          window.location.reload()
        return resp.data

        })
        .catch(err=>console.log('hubo un error',err))
   }

    useEffect(()=>{
      /* global google*/
      google.accounts.id.initialize({
        client_id:"532220759696-a4234dpvkfififbf8pagjsmihvj8plof.apps.googleusercontent.com",
        callback: handleCredentialResponse
      })

      google.accounts.id.renderButton(
        document.getElementById('singInDiv'),
        {theme:"outline", size:"large"})
    },[])


    function ValidateEmail(mail) 
    {
     if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(mail))
      {
        return (true)
      }
      return (false)
    }

    function ValidarName(name){
      if (!/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(name)){
        return false
    } else {
      return true
    }
    }


    const handleRegister = async(e)=>{
        e.preventDefault();

        if(ValidarName(name) === false){
          return alert("Prohibido ingresar numero o caracteres en el nombre")
           }

        if(passwordConfirm !== password){
return alert("Por favor ingrese correctamente la confirmacion de la contraseña")

        }

        if(ValidateEmail(email) === false){
  return alert("Por favor ingrese un email correcto")
   }

     console.log(ValidarName(name))
     console.log(name)


        try {
            console.log(2)
            await authService.register(name, password,email).then(
                (response)=>{
                    navigate('/confirmmail')
                    window.location.reload()
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
      <div className={Style.backg} style={{margin: '5.8em auto',padding: '.9em 1em .9em 1em'}}>
        <h1 className={Style.h1}>Register</h1>
        <form className={Style.form} onSubmit={handleRegister}>
        <div className={Style.login}>
          <input
            className={Style.input}
            type="text"
            maxLength="35"
            value={name}
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>
        <div className={Style.login}>
        <input
            className={Style.input}
            type="password"
            maxLength="18"
            value={password}
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
           </div>
           <div className={Style.login}>
        <input
            className={Style.input}
            type="password"
            maxLength="18"
            value={passwordConfirm}
            name="PasswordConfirm"
            placeholder=" Confirme Password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
           </div>
           <div className={Style.login}>
          <input
            className={Style.input}
            type="text"
            value={email}
            name="email"
            maxLength="40"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          
          </div>
          <Button sx={{mt:'14px'}} type="submit" variant="contained" className={Style.buttom}>Register</Button>
        </form>
        <div className={Style.or}>──────────OR──────────</div>
        {<div className={Style.googleLogin} id="singInDiv"></div>}
      </div>
      );

}


export default Register