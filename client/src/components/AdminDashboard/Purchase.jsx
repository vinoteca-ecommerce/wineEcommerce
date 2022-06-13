import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchase } from '../../redux/actions/actions'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import style from "./Purchase.module.css"

export const Purchase = () => {
    const dispatch = useDispatch()
    const purchase = useSelector((state)=> state.purchase)
    useEffect(()=>{
      dispatch(getPurchase())
    },[dispatch])
    


  return (
    <div>
      <div className={style.container}> 
      <h2>Compras Usuarios</h2>
        <table className={style.table}>
        <thead className={style.tableHead}> 
        <tr>      
          <th> Nº </th>
          <th> Nombre </th>
          <th> Precio Total</th>
          <th> Id de Compra </th>
          <th> Estado Compra </th>
          <th> Detalle Venta </th>
      </tr>
        </thead>
           { purchase.result?.map(((e,index)=>
          <tbody key={e._id} className={style.tableBody}>
            <tr>
            <td  style={{width:'50px'}}>{index + 1}</td>
            <td>{e.user?.name}</td>
            <td > $  {e.cart.map(e=>
            e.unit_price * e.quantity).reduce((acc, e) => acc + e ,0)}
            </td>
            <td>{e._id}</td>
            <td>{e.status === 'approved'? 'Aprobado' : e.status === 'rejected'? 'Rechazado' : e.status === 'pending' ? 'Pendiente' : 'Estado no disponible'}</td>
            <td style={{width:'50px'}}><Link to={'/admin/purchase/detail/' + e._id}><Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}}> <EditIcon/> </Button></Link></td>
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
