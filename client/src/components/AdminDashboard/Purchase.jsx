import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchase } from '../../redux/actions/actions'

import style from "./Purchase.module.css"

export const Purchase = () => {
    const dispatch = useDispatch()
    const purchase = useSelector((state)=> state.purchase)
    useEffect(()=>{
      dispatch(getPurchase())
    },[dispatch])
    
    console.log(purchase)
  return (
    <div>
      <div className={style.container}> 
      <h2>Compras Usuarios</h2>
        <table className={style.table}>
        <thead className={style.tableHead}>       
          <th> Nº </th>
          <th> Nombre </th>
          <th> Precio </th>
          <th> Vino </th>
          <th> Imagen</th>
        </thead>
           { purchase.result?.map(((e,index)=>
          <tbody key={e.uid} className={style.tableBody}>
            <tr >
            <td style={{width:'50px'}}>{index + 1}</td>
            <td>{e.user.name}</td>
            <td>{e.cart.map((e)=>
            <div>${e.unit_price} </div>)}
            </td>
            <td>{e.cart.map((e)=>
            <div>{e.title}:</div>)}</td>
            <td style={{width:'50px'}}>
            {e.cart.map((e)=>
            <img src={e.picture_url} className={style.img}/>)}
              </td>
            </tr>
          </tbody>
          ))
        } 
          </table>
        <h2>Total ventas: {purchase.total}</h2>
   </div>      
</div>
  )
}
