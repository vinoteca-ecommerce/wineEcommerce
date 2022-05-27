import React,{useEffect,useState} from 'react';
import { getWinesById } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './CardDetail.module.css';

export const CardDetail = () => {

  const dispatch = useDispatch();
  const wines = useSelector((state) => state.wines);
  const {id} = useParams();

  useEffect(()=>{
    dispatch(getWinesById(id))
  },[dispatch,id])

  //console.log(wines)
  return (
    <div>
      {id !== wines?._id ? <h2>Loading...</h2>
      :
      <div className={style.container}>
        <div className={style.img}>
          <img src={wines?.img} alt={wines?.name} />
        </div>

        <div className={style.datail}>
          <h3>{wines?.name}</h3>
          <p className={style.p}>{wines?.category?.name}</p>
          <p className={style.border}>{wines?.description}</p>
          <div className={style.price}>
            <p>${wines?.price}.00</p>
            add
          </div>
          <div className={style.btn}>
            <button>Agregar al Carrito</button>
          </div>
          
        </div>
      </div>
      }
    </div>
  )
}
