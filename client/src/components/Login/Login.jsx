import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth-service";
// import GoogleLogin from 'react-google-login'

//STYLES
import Style from "./Login.module.css"

const Login=()=>{
    const [email, setEmail]= useState('');
    const [password, setPassword]=useState('');
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
    const handleLogin= async(e)=>{
        e.preventDefault();
        try{
            await authService.signup(email, password).then(
                ()=>{
                    navigate('/');
                    window.location.reload()
                },
                (error)=>{
                    console.log(error)
                }
            )
            
        }catch(err){
            console.log(err)
        }
    
    }
    return (
      <div className={Style.backg}>
        <h1 className={Style.h1}>
          Login
        </h1>
        <form className={Style.form} onSubmit={handleLogin}>
          <div className={Style.login}>
            <input
            className={Style.messi}
            type="text"
            value={email}
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className={Style.login}>
          <input
            className={Style.messi}
            type="password"
            value={password}
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>

          <button className={Style.buttom}>Login</button>
        </form>
          <script src="https://accounts.google.com/gsi/client" async defer></script>
         
         <div className={Style.googleLogin} id="singInDiv"></div>

        <p className={Style.p}>¿No tienes una cuenta?</p>
        <Link to={"/register"}>
          <button className={Style.buttom}>Registrate</button>
        </Link>
        
      </div>
      );
}


export default Login