import React, { useState, useEffect } from "react";
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
              <a href="/userOrders/approved">PEDIDOS REALIZADOS</a>
            </li>
            <li>
              <a href="/userOrders/pending">PEDIDOS PENDIENTES</a>
            </li>
            <li>
              <a href="/userOrders/rejected">PEDIDOS CANCELADOS</a>
            </li>
          </ul>
        </nav>
        <div className={styles.card}>

        {userHistory?.length === 0 ? <h2>Agregar</h2> : 
         userHistory.map((e)=>
          e.status === 'approved' ? 
             e.cart.map((e)=>
             {return (
              <CardPedidos
                key={e._id}
                title={e.title}
                picture_url={e.picture_url} className={styles.img}
                quantity={e.quantity}
                unit_price={e.unit_price}
              />
            )}) : (
            <p>'no hay compras'</p> 
            )
          
         

         )
        }      
        </div>
        
      </div>
    </div>
  );
}
