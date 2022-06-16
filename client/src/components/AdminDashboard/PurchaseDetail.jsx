import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getPurchaseId } from '../../redux/actions/actions'
import style from './PurchaseDetaiil.module.css'

export const PurchaseDetail = () => {
  const dispatch = useDispatch()
  const purchase = useSelector((state)=> state.purchase)
  const { id } = useParams()

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
          <th className={style.subtotal}> Sub-Total </ th>
          <th> Total</th>
          <th> Estado</th>
          </tr> 
        </thead>
           {purchase.cart?.map(((e,index)=>
          <tbody key={e.title} className={style.tableBody} >
            <tr>
            <td  style={{width:'50px'}}>{index + 1}</td>
            <td>{e.title}</td>
            <td>$ {e.unit_price}</td>
            <td>{e.quantity}</td>
            <td className={style.subtotal}>$ {e.unit_price * e.quantity}</td>
            <td> <p>{purchase.cart?.map(e=>e.unit_price * e.quantity).reduce((acc, e)=> acc + e , 0)}</p></td>
            <td><p>{purchase.status === 'approved'? 'Aprobado' : purchase.status === 'rejected'? 'Rechazado' : purchase.status === 'pending' ? 'Pendiente' : 'Estado no disponible'} </p></td>
            </tr>       
          </tbody>
          ))
        }
        </table>
    </div>
  )
}
