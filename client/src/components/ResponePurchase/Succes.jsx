import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { deleteCart, putPurchase } from "../../redux/actions/actions";

//styles
import Style from "./Success.module.css";

export function Succes() {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const payment_id = new URLSearchParams(search).get("payment_id");
  const status = new URLSearchParams(search).get("status");
  let idPurchase = JSON.parse(localStorage.getItem("idPurchase"));

  const data = {
    payment_id: payment_id,
    status: status,
  };

  useEffect(() => {
    if(status === "pending" ||status === "approved"){
      console.log(status)
    dispatch(putPurchase(idPurchase, data));
    dispatch(deleteCart());
    localStorage.removeItem("idPurchase");
    localStorage.removeItem("ShoppingCar");
  }

  }, []);

  return (
    <div className={Style.hache1}>
      {status === "pending" ? (
        <h1> Estamos esperando tu pago</h1>
      ) : status === "approved" ? (
        
        <h1>Muchas gracias por tu compra</h1>
      ) : (
        <h1> Compra cancelada, intenta nuevamente <Link to = "/shoppingCar"> <button>Volver al Carrito</button></Link> </h1>
      )}
      <Link to="/">
        {" "}
        <button className={Style.buttom}>Inicio</button>
      </Link>
    </div>
  );
}
