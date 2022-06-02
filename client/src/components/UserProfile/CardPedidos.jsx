import styles from '../UserProfile/CardPedidos.module.css'
import React from 'react'




const CardPedidos = ({nombre, imagen, cantidad, precio}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardimg}>
          {imagen}
      </div>
      <div className={styles.cardinfo}>
        <p className={styles.texttitle}>{nombre}</p>
        <p className={styles.textbody}>{cantidad}</p>
       
      </div>
      <div className={styles.cardfooter}>
        <span className={styles.cardbutton}>${precio}</span>
      </div>
    </div>
  );
}

export default CardPedidos

 