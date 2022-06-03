import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { setLocalStorage, addLocalStorage, subLocalStorage, deleteLocalStorage, setShoppingCar, getShoppingCar } from '../../redux/actions/actions';
import style from './ShoppingCar.module.css';
import { ShoppingCarTotal } from '../ShoppingCarTotal/ShoppingCarTotal';
import authService from '../services/auth-service'

export const ShoppingCar = () => {
    const dispatch = useDispatch();
    const shoppingcar = useSelector((state) => state.shoppingcar);

    let store = JSON.parse(localStorage.getItem('ShoppingCar'));

    useEffect(()=>{
        const user= authService.getCurrentUser();

        if(user){
            if(store !== null && store?.length !== 0) dispatch(setShoppingCar(store))
            dispatch(getShoppingCar());
        }
        else dispatch(setLocalStorage(store))

        return () => {
            if(user && store !== null && store?.length !== 0) dispatch(setShoppingCar(store));
        }

    },[dispatch])

    const handleClick = (operation,id)=>{
        if(operation === 'sub'){
            dispatch(subLocalStorage(id))
        }
        else if(operation === 'add') dispatch(addLocalStorage(id))
        else dispatch(deleteLocalStorage(id));
      }

  return (
    <div className={style.container}>
        {shoppingcar?.length === 0 || shoppingcar === null ? <h2 className={style.carrito}>Carrito vacio, ve a agregar productos!</h2>
        :<><table className={style.table}>
            <thead className={style.tableHead}>
                <tr>
                    <td></td>
                    <td>Producto</td>
                    <td>Nombre</td>
                    <td>Precio</td>
                    <td>Cantidad</td>
                    <td>SubTotal</td>
                </tr>
            </thead>
            {shoppingcar?.map((st)=>(
                <tbody key={st.id} className={style.tableBody}>
                    <tr>
                        <td style={{width:'40px'}}><Button onClick={()=>handleClick('del',st.id)} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#ff0000'}}><DeleteIcon fontSize='large'/></Button></td>
                        <td><img src={st.img} alt={st.name} style={{width:'70px',height:'auto'}}/></td>
                        <td>{st.name}</td>
                        <td>${st.price}.00</td>
                        <td>
                            <Button onClick={()=>handleClick('sub',st.id)} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',color:'#7f0000'}}><RemoveIcon/></Button>
                            <p style={{display:'inline',color:'#7f0000',padding:'.2em .5em',margin:'.5em',border:'2px solid #7f0000', borderRadius:'1em', fontSize:'1em'}}>{st.cont}</p>
                            <Button onClick={()=>handleClick('add',st.id)} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',color:'#7f0000'}}><AddIcon/></Button>
                        </td>
                        <td>${st.cont*st.price}.00</td>
                    </tr>
                </tbody>
            ))}
        </table>
        <ShoppingCarTotal/>
        </>}
    </div>
  )
}
