import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from './ShoppingCarTotal.module.css';
import Button from '@mui/material/Button';
import { postMP } from '../../redux/actions/actions';
import { Link } from "react-router-dom";
import authService from '../services/auth-service'

export const ShoppingCarTotal = () => {

  const dispatch = useDispatch();
  const shoppingcar = useSelector((state) => state.shoppingcar);
  //const linkmp = useSelector((state) => state.linkmp);
  const [currentUser,setCurrentUser] = useState(undefined)

  let subtotal = 0;
  let total = 0;

  useEffect(()=>{
    const user= authService.getCurrentUser();
    if(user) setCurrentUser(user);
  },[])
  

  for(let i=0; i<shoppingcar?.length ; i++){
    subtotal += shoppingcar[i]?.cont*shoppingcar[i]?.price;
  }
  total = subtotal;

  const [body, setBody] = useState({
    items:[],
    back_urls:{
      failure:"http://localhost:3000/",
      pending:"http://localhost:3000/",
      success:"http://localhost:3000/"
    }
  });

  function handleClick(){

    setBody( shoppingcar.map(e=>body.items.push({
      title:e.name,
      unit_price:e.price,
      quantity:e.cont,
      picture_url:e.img,

    })))
    dispatch(postMP(body))

    setBody({
      items:[],
      back_urls:{
        failure:"/failure",
        pending:"/pending",
        success:"/success"
      }
    });
  }

  return (
    <div className={style.containerTotal}>
        <h4>Resumen</h4>
        <p><h5>SubTotal: </h5><h6>${subtotal}.00</h6></p>
        <p><h5>Total: </h5><h6>${total}.00</h6></p>
        {currentUser !== undefined && total > 0 && subtotal > 0?
        <Link to ='/confirm' style={{textDecoration:'none', color:'black'}}><Button onClick={handleClick} fullWidth sx={{mt:'10px'}}  variant="contained" >  COMPRAR  </Button></Link>
        :<Button disabled fullWidth sx={{mt:'10px'}}  variant="contained" >  COMPRAR  </Button>}
    </div>
  )
}