import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth-service";
import Button from "@mui/material/Button";
// import GoogleLogin from 'react-google-login'

//STYLES
import Style from "./Login.module.css";
import { useDispatch } from "react-redux";
import { setShoppingCar } from "../../redux/actions/actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cartLocalStorage = JSON.parse(localStorage.getItem("productsInCart"));
  const dispatch = useDispatch()



  function handleCredentialResponse(response) {
    const id_token = response.credential;
    console.log("ID: " + response.credential);
    axios
      .post("http://localhost:8000/auth/google", { id_token })
      .then((resp) => {
        console.log(resp);
        if (resp.data.token) {
          localStorage.setItem("user", JSON.stringify(resp.data));
        }
        navigate("/");
        window.location.reload();
        return resp.data;
      })
      .catch((err) => console.log("hubo un error", err));
  }

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "532220759696-a4234dpvkfififbf8pagjsmihvj8plof.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("singInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(email, password).then(
        (resp) => {
          if(cartLocalStorage){
            dispatch(setShoppingCar(cartLocalStorage))
            window.localStorage.removeItem("productsInCart");
          }
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={Style.backg}>
      <h1 className={Style.h1}>Login</h1>

      <form className={Style.form} onSubmit={handleLogin}>
        <div className={Style.login}>
          <input
            className={Style.input}
            type="text"
            value={email}
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={Style.login}>
          <input
            className={Style.input}
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" variant="contained" className={Style.buttom}>
          Login
        </Button>
      </form>
      <div className={Style.or}>──────────OR──────────</div>
      <script src="https://accounts.google.com/gsi/client" async defer></script>

      <div className={Style.googleLogin} id="singInDiv"></div>

      <p className={Style.p}>¿No tienes una cuenta?</p>
      <Link to={"/register"} style={{ textDecoration: "none" }}>
        <Button className={Style.buttom} style={{ m: "0" }}>
          Registrate
        </Button>
      </Link>
    </div>
  );
};

export default Login;
