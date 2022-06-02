import React from 'react'
import styles from '../UserProfile/UserAddress.module.css'
export const UserAddress = () => {
  return (
    <>
      <div className={styles.title}>
        <h1>Mis Direcciones</h1>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <div>
            <h3>Direccion envio</h3>
            <p>Avenida Siempre Viva 742 Springfield</p>
            <p>CP:08905</p>
            <h3>Telefono</h3>
            <p>+34xxxxx</p>
          </div>
        </div>
        
        <div className={styles.card}>
          <div>
            <h3>Direccion envio</h3>
            <p>Avenida Siempre Viva 742 Springfield</p>
            <p>CP:08905</p>
            <h3>Telefono</h3>
            <p>+34xxxxx</p>
          </div>
        </div>
      </div>
    </>
  );  
}
