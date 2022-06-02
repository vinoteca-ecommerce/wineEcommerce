import styles  from '../UserProfile/UserOrders.module.css'
import React  from 'react'
import { useDispatch, useSelector } from "react-redux";
import CardPedidos from './CardPedidos';

const userHistory = [
  {
    nombre: "vino1",
    imagen: "imagen",
    cantidad: 2,
    precio: 3000,
  },
  {
    nombre: "vino2",
    imagen: "imagen",
    cantidad: 1,
    precio: 1500,
  },
  {
    nombre: "vino3",
    imagen: "imagen",
    cantidad: 1,
    precio: 1500,
  },
];




export const UserOrders= () => {
   
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>MIS PEDIDOS</h1>
        </div>

        <nav className="navBar">
          <ul className={styles.ulBreadcrumbs}>
            <li>
              <a href="#">HOME</a>
            </li>
            <li>
              <a href="#">PEDIDOS</a>
        
            </li>
            <li>
              <a href="#">PEDIDOS PENDIENTES</a>
            </li>
            <li>
              <a href="#">PEDIDOS CANCELADOS</a>
            </li>
          </ul>
        </nav>
        {userHistory?.length === 0 ? <h2>Agregar</h2> : 
         userHistory.map((e)=>{
           return (
             <CardPedidos
               nombre={e.nombre}
               imagen={e.imagen}
               cantidad={e.cantidad}
               precio={e.precio}
             />
           );
         }

         )
        }      
        
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



