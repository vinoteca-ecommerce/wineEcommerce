import React,{useState} from 'react';
import style from './FeedbackCard.module.css';
import Rating from '@mui/material/Rating';

export const FeedbackCard = ({name,email, comment,title,ranking}) => {
  const [value, setValue] = useState(4);  
return (
    <div className={style.review}>
        {comment !== 'Este vino aun no tiene comentarios'
        ?
        <div className={style.infoRev}>
          <Rating name="read-only" value={ranking?ranking:3} readOnly />
          <h3 className={style.h3}>{title?title.toUpperCase():'SIN TITULO'}</h3>
          <h4 className={style.email}>Email: {email} </h4> 
          <h4 className={style.email}> Nombre: {name}</h4> 
          <p className={style.p}> Comentario: {comment?comment:'No Hay Comentarios Aun'}</p>
        </div>
        : <div className={style.noRev}> <p>Este vino aun no tiene comentarios</p></div>}
    </div>
  )
}
