import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers} from '../../redux/actions/actions'
import style from "./DeleteProduct.module.css"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <Link to={'/admin/'} style={{textDecoration:'none'}}><Button variant="outlined">Inicio</Button></Link>
        <Link to={'/admin/post'} style={{textDecoration:'none'}}> <Button variant="outlined">Agregar Vino </Button></Link>

          <div className={style.container}> 
          <h2> Usuarios Activos</h2>
            <table className={style.table}>
            <thead className={style.tableHead}>       
              <th> Nº </th>
              <th> Nombre </th>
              <th> Email </th>
              <th> Rol </th>
              <th></th>    
            </thead>
               { users.result?.map(((e,index)=>
              <tbody key={e.uid} className={style.tableBody}>
                <tr >
                <td style={{width:'50px'}}>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td style={{width:'50px'}}>
                  <Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#ff0000'}} onClick={()=>handleDelete(e.uid)}> <DeleteIcon/>  </Button>
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
