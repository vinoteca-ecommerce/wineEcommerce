import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWines } from '../../redux/actions/actions'
import { deleteProduct } from '../../redux/actions/actions'



export const DeleteProduct= () => {


    const dispatch = useDispatch();
    const wine = useSelector((state)=> state.wines);

    useEffect(()=>{
        dispatch(getWines('','','','',''))
    }, [dispatch])

    const handleDelete = (id)=>{

      dispatch(deleteProduct(id, {state: false}))
      alert('Vino eliminado correctamente')
      window.location.reload()
  }
  


   
  return (
    <div>
        <nav><Link  to='/admin/post'> Agrega Producto </Link> </nav>
        <h3> Formulario de borrar Vino </h3>
        <div>
          <h3>Producto a eliminar</h3>
            <ul> 
              <li> Nº </li>
              <li> Nombre </li>
              <li> Precio </li>
              <li> Categoria </li>
              <li> Stock </li>
              <li>Operation</li>
            </ul>
               { wine.result?.map(((e,index)=>
              <ul key={e._id}>
                <li>{index + 1}</li>
                <li>{e.name}</li>
                <li>{e.price}</li>
                <li>{e.category.name}</li>
                <li>{e.stock}</li>
                <li>
                  <button onClick={()=>handleDelete(e._id)}> Delete   </button>

                  <Link to={'/admin/update/' + e._id}> Modificar Producto </Link>
                  </li>
              </ul>
              ))
            } 
       </div>      
    </div>
  )
}
