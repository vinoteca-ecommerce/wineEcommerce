import React from "react";
import styles from "../UserProfile/UserAddressCard.module.css";
import { NavLink } from "react-router-dom";

const UserAddressCard = ({
  name,
  address,
  city,
  province,
  phone_number,
  notes,
}) => {
  return (
    <div className={styles.container}>
      <h1 style={{textAlign:'center',marginTop:'1em', marginBottom:'1em',color:'#5A5A5A',fontSize:'2em'}}>Mi Direccion</h1>
      <div className={styles.dirTitle}></div>
      <div className={styles.card}>
        <div className={styles.cardDetails}>
          <p className={styles.textBody}>Nombre: {name}</p>
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
};

export default UserAddressCard;
