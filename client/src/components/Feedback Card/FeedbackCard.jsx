import React,{useState} from 'react';
import style from './FeedbackCard.module.css';
import Rating from '@mui/material/Rating';

export const FeedbackCard = ({name,email, comment}) => {
  const [value, setValue] = useState(4);  
return (
    <div className={style.review}>
        {comment !== 'Este vino aun no tiene comentarios'
        ?
        <div className={style.infoRev}>
          <Rating name="read-only" value={value} readOnly />
          <h3 className={style.h3}>AMAZING! best bandages, assortments and patterns!</h3>
          <h4 className={style.email}>{email}</h4> 
          <p className={style.p}>I loved these big packs! I ordered a few to give them out in the "welcome bags" for my wedding, to add a pop of color & to help with the inevitable blisters from heels/tux shoes and last minute oops! Everyone LOVED them! Guests were so proudly showing off the pattern they selected to match their outfits for their "oops" moments. I used them myself and they stayed put all night through dancing, even in the rain/wet conditions.</p>
        </div>
        : <div className={style.noRev}> <p>Este vino aun no tiene comentarios</p></div>}
    </div>
  )
}
