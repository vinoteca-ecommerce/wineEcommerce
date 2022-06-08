import React from 'react'
import styles from '../UserProfile/UserAddressCard.module.css'
import { NavLink } from "react-router-dom";


const UserAddressCard = ({
  name, 
  address, 
  city,
  province,
  phone_number, 
  notes
})=>{

return (
    <div className={styles.container}>
      <div className={styles.dirTitle}>
        <h1>Mi direccion</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.cardDetails}>
          <p className={styles.textTitle}>Nombre: {name}</p>
          <p className={styles.textBody}>Direccion: {address}</p>
          <p className={styles.textBody}>Ciudad: {city}</p>
          <p className={styles.textBody}>Provincia: {province}</p>
          <p className={styles.textBody}>Telefono: {phone_number}</p>
          <p className={styles.textBody}>Notas: {notes}</p>
        </div>
        <NavLink to={`/userAddressForm/`}>
          <button className={styles.cardButton}>Editar direccion</button>
        </NavLink>
      </div>
    </div>
  );
}

export default UserAddressCard;


  
