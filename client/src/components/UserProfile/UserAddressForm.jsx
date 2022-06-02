
import React from 'react'
import styles from '../UserProfile/UserAddressForm.module.css'

export const UserAddressForm = () => {
  return (
    <div className={styles.aling}>
      <div className={styles.inputForm}>
        <label>NOMBRE</label>
        <input plasceholder="Nombre" />
        <label>TELEFONO</label>
        <input plasceholder="Telefono" />
        <label>DIRECCION</label>
        <input plasceholder="Direccion" />
        <label>CIUDAD</label>
        <input plasceholder="Ciudad" />
        <label>PROVINCIA</label>
        <input plasceholder="Provincia" />
        <label>CP</label>
        <input plasceholder="Codigo Postal" />
        <span>PAIS</span>
        <select>Paises</select>
      </div>
    </div>
  );
}
