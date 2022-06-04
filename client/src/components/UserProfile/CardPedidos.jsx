import styles from '../UserProfile/CardPedidos.module.css'
import React from 'react'




const CardPedidos = ({title, picture_url, quantity, unit_price}) => {
  
  return (
    <div className={styles.card}>
      <div className={styles.cardimg}>
          <img src={picture_url} className={styles.cardimg} />
      </div>
      <div className={styles.cardinfo}>
        <p className={styles.texttitle}>{title}</p>
        <p className={styles.textbody}>{quantity}</p>
       
      </div>
      <div className={styles.cardfooter}>
        <span className={styles.cardbutton}>${unit_price}</span>
      </div>
    </div>
  );
}

export default CardPedidos

 