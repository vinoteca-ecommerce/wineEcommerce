import React,{useState} from 'react';
import style from './FeedbackCard.module.css';
import Rating from '@mui/material/Rating';

export const FeedbackCard = ({name,email, comment,title,ranking}) => {

return (
    <div className={style.review}>
        <div className={style.infoRev}>
          <Rating name="read-only" value={ranking} readOnly />
          <h3 className={style.h3}>{title}</h3>
          <h4 className={style.email}>Email: {email} </h4> 
          <h4 className={style.email}> Nombre: {name}</h4> 
          <p className={style.p}> Comentario: {comment}</p>
        </div>
    </div>
  )
}
