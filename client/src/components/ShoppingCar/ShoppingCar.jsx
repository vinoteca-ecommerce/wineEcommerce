import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { setLocalStorage, addLocalStorage, subLocalStorage, deleteLocalStorage } from '../../redux/actions/actions';

export const ShoppingCar = () => {
    const dispatch = useDispatch();
    const shoppingcar = useSelector((state) => state.shoppingcar);

    let store = JSON.parse(localStorage.getItem('ShoppingCar'));

    useEffect(()=>{
        dispatch(setLocalStorage(store))
    },[dispatch])


    //REVISAR CODIGO
    //HAY QUE HACER UN ESTADO EN REDUX Y OBTENER LA INFO DE AHI!!!!!!!!!!!!!!!!!!!
    const handleClick = (operation,id,name,price,img,category)=>{
        console.log(id)
        /*if(operation === 'sub'){
          if(cont > 1) setCont(cont-1)
        }
        else setCont(cont+1)*/
        /*let sum = 0;
        let index = undefined;
    
        if(store){
          for(let i=0 ; i<store?.length ; i++){
            if(store[i].id === id){
                if(operation === 'sub'){
                    if(store[i].cont > 1) sum = store[i].cont - 1;
                }
                else sum = store[i].cont + 1;
                index = i; 
            }
          }
    
          if(sum) store?.push({id,cont:sum,name,price,img,category});
    
          if(index !== undefined) store.splice(index,1);
    
          localStorage.setItem('ShoppingCar', JSON.stringify(store));
          dispatch(setLocalStorage(store))
          //window.location.reload();
          
        }*/
        if(operation === 'sub'){
            dispatch(subLocalStorage(id))
        }
        else if(operation === 'add') dispatch(addLocalStorage(id))
        else dispatch(deleteLocalStorage(id));
      }
    


  return (
    <div>
        <table>
            <thead>
                <tr>
                    <td></td>
                    <td>Nombre</td>
                    <td>Precio</td>
                    <td>Cantidad</td>
                    <td>SubTotal</td>
                </tr>
            </thead>
            {shoppingcar?.map((st)=>(
                <tbody>
                    <tr>
                        <Button onClick={()=>handleClick('del',st.id)} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#ff0000'}}><DeleteIcon/></Button>
                        <td><img src={st.img} alt={st.name} style={{width:'100px',height:'auto'}}/></td>
                        <td>{st.name}</td>
                        <td>${st.price}.00</td>
                        <td>
                            <Button onClick={()=>handleClick('sub',st.id,st.name,st.price,st.img,st.category)} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#7f0000'}}><RemoveIcon/></Button>
                            <p style={{display:'inline',color:'#7f0000',padding:'.2em .6em',margin:'.5em',border:'2px solid #7f0000', borderRadius:'1em', fontSize:'1.2em'}}>{st.cont}</p>
                            <Button onClick={()=>handleClick('add',st.id,st.name,st.price,st.img,st.category)} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#7f0000'}}><AddIcon/></Button>
                        </td>
                        <td>${st.cont*st.price}.00</td>
                    </tr>
                </tbody>
            ))}
        </table>
    </div>
  )
}
