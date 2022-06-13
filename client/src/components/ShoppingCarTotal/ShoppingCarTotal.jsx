import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ShoppingCarTotal.module.css";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import {
  getUserAddress,
  postMP,
  postPurchase,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import authService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import { color } from "@mui/system";

export const ShoppingCarTotal = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.Cart);
  const wine = useSelector((state) => state.wines);

  //const linkmp = useSelector((state) => state.linkmp);
  const [currentUser, setCurrentUser] = useState(undefined);
  const userAddress = useSelector((state) => state.userAddress);
  const cartLocalStorage = JSON.parse(localStorage.getItem("productsInCart"));
  let userNoId = JSON.parse(localStorage.getItem("user"));

  let subtotal = 0;
  let total = 0;

  useEffect(() => {
    dispatch(getUserAddress());
    const user = authService.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  if (!userNoId) {
    for (let i = 0; i < cartLocalStorage?.length; i++) {
      subtotal +=
        cartLocalStorage[i]?.cant * (Math.round(cartLocalStorage[i]?.wineActual.price * (100 - cartLocalStorage[i]?.wineActual.discount) / 100));
    }
    total = subtotal;
  } else {
    for (let i = 0; i < cart?.length; i++) {
      subtotal += cart[i]?.cant * (Math.round(cart[i]?.wineActual.price * (100 - cart[i]?.wineActual.discount ) / 100));
    }
    total = subtotal;
  }

  const [body, setBody] = useState({
    items: [],
    back_urls: {
      failure: "http://localhost:8000/success",
      pending: "http://localhost:8000/success",
      success: "http://localhost:8000/success",
    },
    auto_return: "approved",
  });

  function handleClick() {
    setBody(
      cart.map((e) =>
        body.items.push({
          title: e.wineActual.name,
          unit_price: Math.round(e.wineActual.price * (100 - e.wineActual.discount) / 100),
          quantity: e.cant,
          picture_url: e.wineActual.img,

          stock: e.stock,

          id: e.wineActual._id,
        })
      )
    );

    dispatch(postMP(body));
    dispatch(postPurchase({ cart: body.items }));
    setBody({
      items: [],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success",
      },
    });
    navigate("../confirm", { replace: true });
  }
 
  return (
    <div className={style.containerTotal}>
      {userNoId === null ? (
        <div>
          <h4>Resumen</h4>
          <p>
            <h5>SubTotal: </h5>
            <h6>$ {subtotal}.00</h6>
          </p>
          <p>
            <h5>Total: </h5>
            <h6>$ {total}.00</h6>
          </p>
       
         <Link  to='/login'>
          <Button
            fullWidth
            sx={{ mt: "10px" }}
            variant="contained"
          >
            {" "}
            Crea una cuenta{" "}
          </Button>{" "}
         
         </Link>      
        </div>
      ) : (
        <div>
          <h4>Resumen</h4>
          <p>
            <h5>SubTotal: </h5>
            <h6>${subtotal}.00</h6>
          </p>
          <p>
            <h5>Total: </h5>
            <h6>${total}.00</h6>
          </p>
          <Button
            onClick={handleClick}
            fullWidth
            sx={{ mt: "10px" }}
            variant="contained"
          >
            {" "}
            COMPRAR{" "}
          </Button>{" "}
          
        </div>
      )}
    </div>
  );
};
