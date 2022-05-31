import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth-service";

const Login=()=>{
    const [email, setEmail]= useState('');
    const [password, setPassword]=useState('');
    const navigate = useNavigate()

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
      <div>
        <h1>
          Login
        </h1>
        <form  onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            value={password}
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>

      </div>
      );
}


export default Login