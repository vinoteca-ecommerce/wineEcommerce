import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { putPurchase } from "../../redux/actions/actions";

export function Succes() {
    const dispatch = useDispatch();
    const search = useLocation().search;
    const payment_id = new URLSearchParams(search).get('payment_id');
    const status = new URLSearchParams(search).get('status');
    let idPurchase = JSON.parse(localStorage.getItem('idPurchase'))
    
    
const data = {
    payment_id: payment_id,
    status: status,
}

useEffect(() => {
    dispatch(putPurchase(idPurchase,data))
    localStorage.removeItem('idPurchase')
    localStorage.removeItem('ShoppingCar')
}, []);

    return (
    
        

        <div>
      { status==='pending'? <h1> Estamos Esperando Tu pago</h1>:status==='rejected'?<h1> Compra cancelada, intenta nuevamente </h1>: <h1>Muchas Gracis por su compra</h1>
         }

 <Link to= '/'> <button> Inicio</button></Link>

        </div>
    )
}
