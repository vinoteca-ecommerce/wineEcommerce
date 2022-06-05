import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getPurchaseId } from '../../redux/actions/actions'

export const PurchaseDetail = () => {
  const dispatch = useDispatch()
  const purchase = useSelector((state)=> state.purchase)
  const { id } = useParams()

  useEffect(()=>{
    dispatch(getPurchaseId(id))
  },[dispatch])
  
  return (
    <div>
      <h2><strong>Detalle de compra</strong></h2>
        <table>
        <thead>
          <tr> 
          <th> Nº </th>      
          <th> Nombre </th>
          <th> Estado </th>
          <th> Precio</th>
          <th> Cantidad </th>
          <th> Sub-Total </ th>
          </tr> 
        </thead>
           {purchase.cart?.map(((e,index)=>
          <tbody key={e.title} >
            <tr>
            <td>{index + 1}</td>
            <td>{e.title}</td>
            <td>$ {e.unit_price}</td>
            <td>{e.quantity}</td>
            <td>$ {e.unit_price * e.quantity}</td>
            </tr>       
          </tbody>
          ))
        }
        </table>
        <p><strong> Total : </strong>{purchase.cart?.map(e=>e.unit_price * e.quantity).reduce((acc, e)=> acc + e , 0)}</p>
        <p><strong>Estado Compra : </strong> {purchase.status === 'approved'? 'Aprobado' : purchase.status === 'rejected'? 'Rechazado' : purchase.status === 'pending' ? 'Pendiente' : 'Estado no disponible'} </p>
    </div>
  )
}
