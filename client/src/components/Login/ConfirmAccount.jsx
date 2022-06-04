import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import authService from '../services/auth-service';
import { useLocation } from 'react-router';


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
    <div>Tu cuenta a sido verificada correctamente!


    <Link to='/'>Home</Link>


    </div>
  )
}

export default ConfirmAccount