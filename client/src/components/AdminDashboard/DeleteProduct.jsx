import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWines } from '../../redux/actions/actions'
import { deleteProduct } from '../../redux/actions/actions'

//Styles
import Style from "./DeleteProduct.module.css"

export const DeleteProduct= () => {


    const dispatch = useDispatch();
    const wine = useSelector((state)=> state.wines);

    useEffect(()=>{
        dispatch(getWines('','','','',''))
    }, [dispatch])

    const handleDelete = (id)=>{

      dispatch(deleteProduct(id))
      alert('Vino eliminado correctamente')
      window.location.reload()
  }
  


   
  return (
    <div className={Style.backg}>
        <Link  to='/admin/post'><button className={Style.nav}> Agrega Producto</button> </Link>
        <Link to='/admin/users'button className={Style.nav}> Administrar Usuarios </Link>
        <div>
          <h2 className={Style.littleTitle}>Producto a eliminar o modificar</h2>
                <table>
            <thead> 
              <tr className={Style.tittle}>
              <th> Nº </th>
              <th> Nombre </th>
              <th> Precio </th>
              <th> Categoria </th>
              <th> Stock </th>
              <th>Operation</th>
              </tr>
            </thead>
               { wine.result?.map(((e,index)=>
              <tbody key={e._id} className={Style.tittle}>
                <tr>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>
                <td>{e.category.name}</td>
                <td>{e.stock}</td>
                <td>
                  <button className={Style.buttom} onClick={()=>handleDelete(e._id)}> Delete   </button>

                  <Link to={'/admin/update/' + e._id}><button className={Style.buttom}> Modificar Producto </button></Link>
                  </td>
                </tr>
              </tbody>
              ))
            } 
              </table>
       </div>      
    </div>
  )
}
