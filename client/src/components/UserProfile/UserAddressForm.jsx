import React, {useState} from 'react'
import styles from '../UserProfile/UserAddressForm.module.css'



export const UserAddressForm = () => {
const [form, setForm] = useState({
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  code: '',
});


const onChangeHandler = (e) => {
  const {value, name} = e.target;

  setForm((state) => ({
    ...state,
    [name]: value
  }));
}

const showData = () => {
  console.log('Form: ', form);
  
}

const onSubmit = (e) => {
  e.preventDefault()
}

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.h1}>&bull; Completa tus datos de envio &bull;</h1>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.name}>
            <label>NOMBRE</label>
            <input
              className={styles.input}
              plasceholder="Nombre"
              type="text"
              name="name"
              value={form.name}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className={styles.name}>
            <label>TELEFONO</label>
            <input
              className={styles.input}
              plasceholder="Telefono"
              type="text"
              name="phone"
              value={form.phone}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className={styles.name}>
            <label>DIRECCION</label>
            <input
              className={styles.input}
              plasceholder="Direccion"
              type="text"
              name="direccion"
              value={form.address}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className={styles.name}>
            <label>CIUDAD</label>
            <input
              className={styles.input}
              plasceholder="Ciudad"
              type="text"
              name="ciudad"
              value={form.city}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.textRight}>
            <label>PROVINCIA</label>
            <input
              className={styles.input}
              plasceholder="Provincia"
              type="text"
              name="provincia"
              value={form.state}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.textRight}>
            <label>CP</label>
            <input
              className={styles.input}
              plasceholder="Codigo Postal"
              type="text"
              name="codigopostal"
              value={form.code}
              onChange={onChangeHandler}
            />
          </div>
          <span>ARGENTINA</span>
          <div className={styles.message}>
            <label for="message"></label>
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="Aclaraciones..."
              id="message_input"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div class="submit">
            <input
              className={styles.form_button}
              onClick={showData}
              type="submit"
              value="Agregar"
              id="form_button"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
