import React,{useEffect,useState} from 'react';
import { getWinesById } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './CardDetail.module.css';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import swal from 'sweetalert';
import { FeedbackCard } from '../Feedback Card/FeedbackCard';
import { UserAddress } from '../UserProfile/UserAddress';
import UserAddressCard from '../UserProfile/UserAddressCard';
import Rating from '@mui/material/Rating';

export const CardDetail = () => {

  const dispatch = useDispatch();
  const wines = useSelector((state) => state.wines);
  const {id} = useParams();
  const [cont,setCont] = useState(1)

  useEffect(()=>{
    dispatch(getWinesById(id))
  },[dispatch,id])

  const handleClick = (operation)=>{
    if(operation === 'sub'){
      if(cont > 1) setCont(cont-1)
    }
    if(cont >= wines.stock){
      return  swal({
       title: "Fuera de stock",
       text: `No hay mas stock`,
       icon: "error",
       button: "Aceptar",
     });
     }
    else setCont(cont+1)
  }




  const handleClickShopping = (id,name,price,img,category,stock)=>{

    let state = JSON.parse(localStorage.getItem('ShoppingCar'));
    let sum = 0;
    let index = undefined;
    console.log(wines.stock)
    if(state){
      for(let i=0 ; i<state?.length ; i++){
        if(state[i].id === id){
          sum = state[i].cont + cont;
          index = i; 
        }
      }
      
      if(sum > wines.stock){
        return  swal({
         title: "Fuera de stock",
         text: `${name} No hay mas stock`,
         icon: "error",
         button: "Aceptar",
       });
       }

      if(sum) state?.push({id,cont:sum,name,price,img,category,stock});
      else state?.push({id,cont,name,price,img,category,stock});

      if(index !== undefined) state.splice(index,1);

      localStorage.setItem('ShoppingCar', JSON.stringify(state));
      swal({
        title: "Vino Añadido",
        text: `${cont} ${name} agregado al carrito de compras`,
        icon: "success",
        button: "Aceptar",
      });
    }
    else {
      localStorage.setItem('ShoppingCar', JSON.stringify([{id,cont, name,price,img,category,stock}]));
      swal({
        title: "Vino Añadido",
        text: `${cont} ${name} agregado al carrito de compras`,
        icon: "success",
        button: "Aceptar",
      });
    }
    //localStorage.clear()
  }

  return (
    <div>
      {id !== wines?._id ?  <svg className={style.svg} viewBox="25 25 50 50"><circle className={style.circle} r="20" cy="50" cx="50"></circle></svg>
      :<>
      <div className={style.container}>
        <div className={style.img}>
          <img src={wines?.img} alt={wines?.name} />
        </div>

        <div className={style.datail}>
          <h3>{wines?.name}</h3>
          <h5 className={style.p}>{wines?.category?.name}</h5>
          <p className={style.border}>{wines?.description}</p>
          <div className={style.price}>
            <p>${wines?.price}.00</p>
            <div style={{display:'flex',alignItems:'center'}}>
              <Button onClick={()=>handleClick('sub')} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#7f0000'}}><RemoveIcon/></Button>
              <p style={{display:'inline',color:'#7f0000',padding:'.2em .6em',margin:'.5em',border:'2px solid #7f0000', borderRadius:'1em', fontSize:'1.2em'}}>{cont}</p>
              <Button onClick={()=>handleClick('add')} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#7f0000'}}><AddIcon/></Button>
            </div>
          </div>
          <div className={style.btn}>
          <Button variant="contained" onClick={()=>handleClickShopping(id,wines.name, wines.price, wines.img, wines.category,wines.stock)}>Agregar al Carrito <AddShoppingCartIcon sx={{ml:'15px'}}/></Button>
          </div>   
        </div>
      </div>

      <div className={style.containerReviews}>
        <h2 style={{marginBottom:'1em',fontWeight:'600'}}>Reseñas de Clientes</h2>

        {wines?.comment[0].comment !== 'Este vino aun no tiene comentarios' &&
          <>
            <Rating name="read-only" value={4} readOnly />
            <p style={{marginBottom:'3em'}} >Basado en 10 reseñas</p>
          </>
        }




        {wines?.comment.map(e=>(
          <FeedbackCard
          comment={e.comment}
          email={e.email}
          name={e.name}
          title={e.title}
          ranking={e.ranking}
          
          />
        
        )) } 
      </div>
      </>}

    </div>
  )
}



