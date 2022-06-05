import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/actions";
import styles  from '../UserProfile/UserOrders.module.css'
import CardPedidos from './CardPedidos';




export const UserOrdersApproved= () => {
  const dispatch = useDispatch()
  const userHistory = useSelector((state)=> state.orders) 
  
  useEffect(()=>{
    dispatch(getOrders())
  },[dispatch])




  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>MIS PEDIDOS</h1>
        </div>

        <nav className="navBar">
          <ul className={styles.ulBreadcrumbs}>
          <li>
              <a href="/userprofile">HOME</a>
            </li>
            <li>
              <a href="/userorders">PEDIDOS</a>
        
            </li>
            <li>
              <a href="/userorders/approved">PEDIDOS REALIZADOS</a>
            </li>
            <li>
              <a href="/userorders/pending">PEDIDOS PENDIENTES</a>
            </li>
            <li>
              <a href="/userorders/rejected">PEDIDOS CANCELADOS</a>
            </li>
          </ul>
        </nav>
        <div className={styles.card}>

        {userHistory.filter(e=> e.status === 'approved').map(e=>
             e.cart.map((e)=>
             {return (
              <CardPedidos
                key={e._id}
                title={e.title}
                picture_url={e.picture_url} className={styles.img}
                quantity={e.quantity}
                unit_price={e.unit_price}
              />
            )})
         )
        }      
        </div>
        
      </div>
    </div>
  );
}
