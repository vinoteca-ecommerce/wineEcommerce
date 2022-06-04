import React from 'react'
import styles from '../UserProfile/UserAddress.module.css'
import { NavLink } from "react-router-dom";
export const UserAddress = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.dirTitle}>
        <h1>Mi direccion</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.cardDetails}>
          <p className={styles.textTitle}>Card title</p>
          <p className={styles.textBody}>Here are the details of the card</p>
        </div>
        <NavLink to="/userAddressForm">
        <button className={styles.cardButton}>Editar direccion</button> 
        </NavLink>
      </div>
    </div>
  );  
}
