import React from 'react';
import style from './CardProduct.module.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

export const CardProduct = (id, name, producer, year, description, price, img, category, stock, country,  strain) => {
    //console.log(category)
  return (
    
    <div className={style.card}>
            <Link to={`/cardDetail${id.id}`} style={{textDecoration:'none', color:'black'}}>
                <img className={style.cardImg} src={id.img} alt={id.name}/>
                <div className={style.cardInfo}>
                    <p className={style.textTitle}>{id.name}</p>
                    <p className={style.textBody}>{id.category}</p>
                </div>
            </Link>
            <div className={style.cardFooter}>
                <span className={style.textTitle}>${id.price}.00</span>
                <div className={style.cardButton}>
                    <AddShoppingCartIcon className={style.svgIcon}/>
                </div>
            </div>
        
    </div>
    
  )
}
