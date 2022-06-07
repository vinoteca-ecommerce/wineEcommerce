import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../redux/actions/actions";
import styles  from '../UserProfile/UserOrders.module.css'
import CardPedidos from './CardPedidos';




export const UserOrders= () => {
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
             
             <Link to ='/userprofile'>HOME</Link>
           </li>
         
           <li>
             
             <Link to ='/userorders/approved'>PEDIDOS REALIZADOS</Link>
           </li>
           <li>
             
             <Link to ='/userorders/pending'>PEDIDOS PENDIENTES</Link>
           </li>
           <li>
            
             <Link to ='/userorders/rejected'>PEDIDOS CANCELADOS</Link>
           </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}





//ACTION
// export const TYPES ={
//   ADD_TO_CART = 'ADD_TO_CART',
//   REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CAR',
//   REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART',
//   CLEAR_CART = 'CLEAR_CART'
// }


// REDUCER

// export const shoppingInitilState = {
//  products: [
//    { id: 1, name: "wine1", price: 100 },
//    { id: 2, name: "wine2", price: 200 },
//    { id: 3, name: "wine3", price: 300 },
//   ],
//  cart: []
// }

// export function shoppingReducer(state,action){
//   switch(action.type){

//   }

// }



