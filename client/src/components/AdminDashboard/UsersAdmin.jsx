import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers} from '../../redux/actions/actions'


export const UserAdmin= () => {


    const dispatch = useDispatch();
    const users = useSelector((state)=> state.users);


    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])
    
    
    const handleDelete = (id)=>{

        dispatch(deleteUser(id))
        alert('Vino eliminado correctamente')
        window.location.reload()
    }
    

   
  return (
    <div>
        <div> 
            <h1> Usuarios Activos</h1>
            <Link to={'/admin/'}> Dashboard / Borrar Vino </Link>
            <Link to={'/admin/post'}> Agregar Vino </Link>
            <table>
            <thead>       
              <th> Nº </th>
              <th> Nombre </th>
              <th> Email </th>
              <th> Rol </th>
              <th>Operation</th>    
            </thead>
               { users.result?.map(((e,index)=>
              <tbody key={e.uid}>
                <tr>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>
                  <button onClick={()=>handleDelete(e.uid)}> Delete   </button>
                  <Link to={'/admin/users/' + e.uid}><button> Modificar Usuario </button></Link>
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
