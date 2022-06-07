import React, {useEffect, useState} from 'react';
import style from './CardProduct.module.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, allFavs, deleteFav } from '../../redux/actions/actions';
import swal from 'sweetalert';

export const CardProduct = ({id, name, price, img, category, year, description, strain, producer, country, stock}) => {
    const dispatch = useDispatch();
    let store = JSON.parse(localStorage.getItem('user'))

    const favoritesId = useSelector(state=>state.favoritesId)
    const [arr,setArr] = useState(favoritesId);
  
    /*useEffect(()=>{
      if(store?.user?.uid) dispatch(allFavs(store.user.uid))
    },[dispatch])*/

    const handleFavs = (name, year, description, img, strain, producer, id, price, country)=>{
      const input={
        id: id,
        name: name,
        price: price,
        img: img,
        category: category,
        year: year,
        description: description,
        strain: strain,
        producer: producer,
        country: country
      }
      
      if((!localStorage.getItem('favorites')?.includes(id))){
        store && store.user && dispatch(addFavorites(input))

        let state = JSON.parse(localStorage.getItem('favorites'));

        if(state===null) state = [id];
        else state.push(id)

        localStorage.setItem('favorites', JSON.stringify(state));

        setArr(state)
        swal({
          title: "Vino Añadido",
          text: `${name} agregado a Favoritos`,
          icon: "success",
          button: "Aceptar",
        });
      }
      else{
        dispatch(deleteFav(id))

        let state = JSON.parse(localStorage.getItem('favorites'));
        state = state.filter(fav=>fav !== id)

        localStorage.setItem('favorites', JSON.stringify(state));

        setArr(state)
        swal({
          title: "Vino Eliminado",
          text: `${name} eliminado de Favoritos`,
          icon: "success",
          button: "Aceptar",
        });
      }
    }

    const handleClickShopping = (id)=>{
        let state = JSON.parse(localStorage.getItem('ShoppingCar'));
        let sum = 0;
        let index = undefined;
    
        if(localStorage.id){
         
        }
        if(state){
          for(let i=0 ; i<state?.length ; i++){
            if(state[i].id === id){
              sum = state[i].cont + 1;
              index = i; 
            }
          }
          
         
        if(sum > stock){
         return  swal({
          title: "Fuera de stock",
          text: `${name} No hay mas stock`,
          icon: "error",
          button: "Aceptar",
        });
        }
       
          if(sum) state?.push({id,cont:sum,name,price,img,category});
          else state?.push({id,cont:1,name,price,img,category});
    
          if(index !== undefined) state.splice(index,1);
    
          localStorage.setItem('ShoppingCar', JSON.stringify(state));
          window.location.reload();
          swal({
            title: "Vino Añadido",
            text: `${name} agregado al carrito de compras`,
            icon: "success",
            button: "Aceptar",
          });
        }
        else{
          localStorage.setItem('ShoppingCar', JSON.stringify([{id,cont:1,name,price,img,category}]));
          swal({
            title: "Vino Añadido",
            text: `${name} agregado al carrito de compras`,
            icon: "success",
            button: "Aceptar",
          });
        } 
      }

  return (
    /*  name, year, description, img, strain, producer,  ID  de category, price, country */
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
                {store && store.user && store.user.role  && <div className={ /*localStorage.getItem('favorites')?.includes(id)*/arr?.includes(id) ? style.cardButtonFav : style.cardButton}>
                    <FavoriteBorderIcon className={ style.svgIcon} onClick={()=>handleFavs(name, year, description, img, strain, producer, id, price, country)}/>
                </div>}
                
                <div className={style.cardButton}>
                    <AddShoppingCartIcon className={style.svgIcon} onClick={()=>handleClickShopping(id)}/>
                </div>
            </div>
        
    </div>
    
  )
}
