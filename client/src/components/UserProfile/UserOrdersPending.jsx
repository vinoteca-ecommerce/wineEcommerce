import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/actions";
import styles  from '../UserProfile/UserOrders.module.css'
import {Link} from 'react-router-dom'
import WineBarIcon from '@mui/icons-material/WineBar';
// styles
import Style from "./UserOrderRejected.module.css"
import { Button } from "@mui/material";
import style from '../AdminDashboard/PurchaseDetail.module.css'


export const UserOrdersPending= () => {
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
        <div className={styles.card}>
        <div className={Style.backg}>
        
        <table className={style.table}>
              {userHistory.filter(e=> e.status === 'pending').length === 0 ? 

                <h1> MARTIN SOS UN PETE </h1> : (

              <thead className={style.tableHead}>
                    <tr>
                      <th>Nº</th>
                      <th>ID</th>
                      <th> Cantidad </th>
                      <th>Precio</th>
                      <th>Detalle</th>
                      <th></th>
                    </tr>
                  </thead>

                )
            }
        { userHistory.filter(e=> e.status === 'pending').length !== 0 ? 
        userHistory.filter(e=>e.status === 'pending')?.map((e,i)=>
             { 
               return (
                <tbody key={e._id}>
                  <tr>
                    <td>{i+1}</td>
                    <td>{e._id}</td>
                    <td> x{e.cart.map(e=> e.quantity).reduce((acc, e) => acc + e , 0)}</td>
                    <td>$ 
                    {e.cart.map(e=>
                    e.unit_price * e.quantity).reduce((acc, e) => acc + e ,0)}
                    </td>
                    <td style={{width:'50px'}}><Link to={'/user/purchase/detail/' + e._id}><Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '25px', minHeight: '25px',borderRadius:'80px', backgroundColor:'rgba(45,21,21,255)'}}> <WineBarIcon style={{color:'white'}}/> </Button></Link></td>
                  </tr>
                </tbody>                
            )
          })
          : (
            <p></p>
            )}       
            </table>
        </div>
         </div>
      </div>
    </div>
  );
}
