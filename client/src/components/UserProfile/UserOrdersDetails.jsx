import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getPurchaseId } from '../../redux/actions/actions'
import style from '../AdminDashboard/PurchaseDetail.module.css'

export const UserOrdersDetail = () => {
  const dispatch = useDispatch()
  const purchase = useSelector((state)=> state.purchase)
  const { id } = useParams()

  console.log(purchase)
  useEffect(()=>{
    dispatch(getPurchaseId(id))
  },[dispatch])
  
  return (
    <div className={style.container}>
      <h2><strong>Detalle de compra</strong></h2>
        <table className={style.table}>
        <thead className={style.tableHead}>
          <tr className={style.tittle}> 
          <th> Nº </th>      
          <th> Nombre </th>
          <th> Precio</th>
          <th> Cantidad </th>
          <th> Sub-Total </th>
        
          <th></th>
          <th></th>
          </tr> 
        </thead>
           {purchase.cart?.map(((e,index)=>
          <tbody key={e.title} className={style.tableBody} >
            <tr>
            <td  style={{width:'50px'}}>{index + 1}</td>
            <td>{e.title}</td>
            <td>${e.unit_price}</td>
            <td>x{e.quantity}</td>
            <td>${e.unit_price * e.quantity}</td>
            <td>{e.status}</td>
            <td ><img style={{width:'50px'}} src={e.picture_url} alt='not found'/></td>
            </tr> 
          </tbody>
          ))
        }
        <h1>Total:${purchase.cart?.map(e=>e.unit_price * e.quantity).reduce((acc, e)=> acc + e, 0)} </h1>      
        </table>
    </div>
  )
}
