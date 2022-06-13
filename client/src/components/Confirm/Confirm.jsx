import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import style from './Confirm.module.css';
import authService from '../services/auth-service';


export function Confirm() {
    const cart = useSelector((state) => state.Cart);
    const linkmp = useSelector((state) => state.linkmp);
    const [currentUser,setCurrentUser] = useState(undefined)

    useEffect(()=>{
        const user= authService.getCurrentUser();
        if(user) setCurrentUser(user);
        console.log(cart)
      },[])


    let subtotal = 0;
    let total = 0;
  

    
    for(let i=0; i<cart?.length ; i++){
        subtotal += cart[i]?.cant*cart[i]?.wineActual.price;
        console.log(cart)
      }
      total = subtotal;

    return (
        <div className={style.container}>
            <h3>Total: ${total}.00</h3>
            {currentUser !== undefined && total > 0 && subtotal > 0?
            <a href={linkmp} style={{textDecoration:'none', color:'black', margin:'0'}}> <Button variant="contained"  sx={{mt:'100px'}}> CONFIRMAR PAGO </Button></a>
            :<Button disabled sx={{mt:'10px'}}  variant="contained" >  COMPRAR  </Button>}
        </div>
    )
}
