import React from 'react';
import { useSelector } from 'react-redux';
import style from './ShoppingCarTotal.module.css';
import Button from '@mui/material/Button';

export const ShoppingCarTotal = () => {
    const shoppingcar = useSelector((state) => state.shoppingcar);
    let subtotal = 0;
    let total = 0;

    for(let i=0; i<shoppingcar?.length ; i++){
        subtotal += shoppingcar[i]?.cont*shoppingcar[i]?.price;
    }
    total = subtotal;

  return (
    <div className={style.containerTotal}>
        <h4>Resumen</h4>
        <p><h5>SubTotal: </h5><h6>${subtotal}.00</h6></p>
        <p><h5>Total: </h5><h6>${total}.00</h6></p>
        <Button variant="contained" fullWidth sx={{mt:'10px'}}>COMPRAR</Button>
    </div>
  )
}
