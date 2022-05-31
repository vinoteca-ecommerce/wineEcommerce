import React from 'react';
import style from './CardProduct.module.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

export const CardProduct = ({id, name, price, img, category}) => {
    //console.log(category)
    const handleClickShopping = (id)=>{
        let state = JSON.parse(localStorage.getItem('ShoppingCar'));
        let sum = 0;
        let index = undefined;
    
        if(localStorage.id){
          console.log('asd')
        }
        if(state){
          for(let i=0 ; i<state?.length ; i++){
            if(state[i].id === id){
              sum = state[i].cont + 1;
              index = i; 
            }
          }
    
          if(sum) state?.push({id,cont:sum});
          else state?.push({id,cont:1});
    
          if(index !== undefined) state.splice(index,1);
    
          localStorage.setItem('ShoppingCar', JSON.stringify(state));
        }
        else localStorage.setItem('ShoppingCar', JSON.stringify([{id,cont:1}]));
        //localStorage.clear()
      }

  return (
    
    <div className={style.card}>
            <Link to={`/cardDetail/${id}`} style={{textDecoration:'none', color:'black'}}>
                <img className={style.cardImg} src={img} alt={name}/>
                <div className={style.cardInfo}>
                    <p className={style.textTitle}>{name}</p>
                    <p className={style.textBody}>{category}</p>
                </div>
            </Link>
            <div className={style.cardFooter}>
                <span className={style.textTitle}>${price}.00</span>
                <div className={style.cardButton}>
                    <AddShoppingCartIcon className={style.svgIcon} onClick={()=>handleClickShopping(id)}/>
                </div>
            </div>
        
    </div>
    
  )
}
