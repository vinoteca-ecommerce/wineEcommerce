import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import authService from '../services/auth-service';
import { useLocation } from 'react-router';

//Styles
import Style from "./ConfirmAccount.module.css"

function ConfirmAccount() {

    useEffect(()=>{
      handleVerify()
    },[])
    const search = useLocation().search;
    const token= new URLSearchParams(search).get("token");

    const handleVerify=async()=>{
      try {
        await authService.verifyAccount(token)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className={Style.backg}>
      <div className={Style.textContainer}>
        <div className={Style.background}>
      <h1>Bienvenido!</h1>
    <h2 className={Style.spacing}>Tu cuenta ha sido verificada correctamente!</h2>
    <h3 className={Style.p}> Ahora puedes disfrutar todas las funcionalidades de nuestra pagina</h3>


    <Link to='/'><button className={Style.buttom}>Home</button></Link>
        </div>

      </div>


    </div>
  )
}

export default ConfirmAccount