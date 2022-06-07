import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { deleteCart, getPurchase, getWinesById, putPurchase ,sendPurchaseEmail,updateStock} from "../../redux/actions/actions";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';


//styles
import Style from "./Success.module.css";

export function Succes() {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const payment_id = new URLSearchParams(search).get("payment_id");
  const status = new URLSearchParams(search).get("status");
  let idPurchase = JSON.parse(localStorage.getItem("idPurchase"));
  // const wine = useSelector((state)=> state.wines)
  let store = JSON.parse(localStorage.getItem('user'))
  // console.log(store.user.name.split(" ").slice(0,1))
  const data = {
    payment_id: payment_id,
    status: status,
  };
  // useEffect(()=>{
  //   dispatch(getPurchase())
  // },[dispatch])
  // let STATEpurchase= useSelector(state=>state.purchase)
  // console.log(STATEpurchase)
  const email=()=>{
    dispatch(sendPurchaseEmail());

  }
  useEffect(() => {
    if(status === "pending" ||status === "approved"){
    
      let store = JSON.parse(localStorage.getItem('ShoppingCar'));
      const stockUpdated=store?.map(e=>{
        let stockLeft=  e.stock-e.cont
        return{
          stockk:stockLeft,
          id:e.id
        }
      })

      console.log(stockUpdated)
    dispatch(updateStock(stockUpdated))
    dispatch(putPurchase(idPurchase, data));
    console.log(data)

    dispatch(deleteCart());
    localStorage.removeItem("idPurchase");
    // localStorage.removeItem("ShoppingCar");
  }

  }, []);

  return (
    <div className={Style.hache1}>
      {status === "pending" ? (<div className={Style.CompraPendiente}>
        <h1><PriorityHighIcon fontSize="large"/></h1>
        <h1 className={Style.subtitle}>Pago pendiente</h1>
        <p>Nuestro equipo de seguridad está revisando tu pago.</p>
        <p>En menos de dos días hábiles, te confirmaremos por</p>
        <p className={Style.subtitle}>e-mail si se acreditó correctamente.</p>
        <h2>
          <Link to="/">
          <button className={Style.buttom}>Inicio</button>
          </Link>
        </h2>
      </div>) : status === "approved" ? (<div className={Style.CompraAprobada}>
        <h1><CheckIcon fontSize="large"/></h1>
        <h1 className={Style.subtitle}>Transaccion exitosa</h1>
        <p>{store.user.name.split(" ").slice(0,1)}, la compra se ha realizado correctamente.</p>
        <p>Solicita un email, para conocer mas sobre tu compra</p>
        <p>O puedes ver mas de nuestros productos en Inicio</p>
        <h2>
          <Link to="/">
          <button className={Style.buttom}>Inicio</button>
          </Link>
          <button className={Style.buttom} onClick={email()}>Enviar Email de confirmacion</button>
          </h2>
        
      </div>
            
      ) : (<div className={Style.CompraCancelada}>
        <h1><CloseIcon fontSize="large"/></h1>
        <h1 className={Style.subtitle}> Compra cancelada</h1> 
        <p>{store.user.name.split(" ").slice(0,1)}, la compra no salió como esperábamos.</p>
        <p>Corrobore que los datos ingresados hayan sido correctos, puedes volver a intentarlo</p>
        <p>desde nuestro carrito. O puedes seguir consultando por nuestros productos en Inicio.</p>
        <h2>
          <Link to="/">
          <button className={Style.buttom}>Inicio</button>
          </Link>
          <Link to = "/shoppingCar"> 
          <button className={Style.buttom}>Volver al Carrito</button>
          </Link>
        </h2>
      </div>)}

    </div>
  );
}
