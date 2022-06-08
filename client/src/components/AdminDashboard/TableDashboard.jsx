import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWines } from '../../redux/actions/actions'
import { deleteProduct } from '../../redux/actions/actions'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';

//Styles
import style from "./DeleteProduct.module.css"

export const DashboardTable= () => {


    const dispatch = useDispatch();
    const wine = useSelector((state)=> state.wines);

    useEffect(()=>{
        dispatch(getWines('','','','',''))
    }, [dispatch])

    const handleDelete = (id)=>{
      swal({
        title: "¿Esta seguro que desea eliminar el producto?",
        icon: "warning",
        buttons: ["Cancelar","Eliminar"]
      })
      .then((willDelete)=>{
        if(willDelete){
          dispatch(deleteProduct(id, {state: false}))
          swal({
            title: "Producto Eliminado",
            text: 'Se elimino correctamente el producto',
            icon: "success",
            button: "Aceptar",
          })
          .then(()=>{
            window.location.reload()
          })
        }
      })
  }
  
   
  return (
    <div >
        <div className={style.container}>
          <h2>Productos</h2>
          <table className={style.table}>
            <thead className={style.tableHead}> 
              <tr>
                <th> Nº </th>
                <th> Nombre </th>
                <th> Precio </th>
                <th> Categoria </th>
                <th> Stock </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
               { wine.result?.map(((e,index)=>
              <tbody key={e._id} className={style.tableBody}>
                <tr >
                  <td style={{width:'50px'}}>{index + 1}</td>
                  <td>{e.name}</td>
                  <td>${e.price}.00</td>
                  <td>{e.category.name}</td>
                  <td style={{width:'50px'}}>{e.stock}</td>
                  <td style={{width:'50px'}}><Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#ff0000'}} onClick={()=>handleDelete(e._id)}><DeleteIcon/></Button></td>
                  <td style={{width:'50px'}}><Link to={'/admin/update/' + e._id}><Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}}> <EditIcon/> </Button></Link></td>
                </tr>
              </tbody>
              ))
            } 
              </table>
       </div>      
    </div>
  )
}
