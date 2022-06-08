import React, {useState, useEffect} from 'react'
import styles from '../UserProfile/UserAddressForm.module.css'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  // getUserAddress,
  postUserAddress,
  updateUserAddress,
} from '../../redux/actions/actions'

export const UserAddressForm = () => {
 
 const dispatch = useDispatch()
 const [validator, setValidator] = useState('')
 const {id} = useParams()
 const userAddress = useSelector((state) => state.userAddress)
 const [updated, setUpdated] = useState(false)
 
//  useEffect(() => {
//    dispatch(getUserAddress())
//  }, [dispatch])

const [dataState, setDataState] = useState({
  name: '',
  address: '',
  city: '',
  province: '',
  phone_number: '',
  notes: '',
});

const handleSubmit =(e) => {
  e.preventDefault();
  if(!dataState.name){
   setValidator('El nombre de contacto es requerido')
  } else if (!dataState.address){
    setValidator("La direccion de envio es requerida");
  } else if (!dataState.city){
     setValidator("La ciudad es requerida");
  } else if (!dataState.province){
    setValidator("La provincia es requerida");
  } else if (!dataState.phone_number){
     setValidator("La provincia es requerida");
  } else{
    if(dataState){
      if(!id){
        dispatch(postUserAddress(dataState))
        alert('Tus datos se agregaron correctamente')
      } 
      // else {
      //   dispatch(updateUserAddress(id, dataState))
      //   alert("Tus datos se actualizaron correctamente");
      // }
    }
    setValidator('');
    setDataState({
      name: "",
      address: "",
      city: "",
      province: "",
      phone_number: "",
      notes: "",
    });
    document.getElementById('form').reset();
  }
}
  if (id && userAddress){
    setDataState ({
      ...dataState,
      name: userAddress.name,
      address: userAddress.address,
      city: userAddress.city,
      province: userAddress.province,
      phone_number: userAddress.phone_number,
      notes: userAddress.notes,
    })
  setDataState(!updated)
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDataState({
      ...dataState,
      [e.target.name] : e.target.value,
    })
  }



    return (
      <div className={styles.body}>
        <div className={styles.container}>
          <h1 className={styles.h1}>
            &bull; Completa tus datos de envio &bull;
          </h1>
          <form
            id="form"
            onSubmit={(e) => handleSubmit(e)}
            className={styles.form}
          >
            <div className={styles.name}>
              <label>NOMBRE</label>
              <input
                required
                className={styles.input}
                plasceholder="Nombre"
                type="text"
                name="name"
                key="name"
                value={dataState.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.phone}>
              <label>TELEFONO</label>
              <input
                required
                className={styles.input}
                plasceholder="Telefono"
                name="phone_number"
                type="number"
                minLength="6"
                maxLength="12"
                key="phone"
                value={dataState.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className={styles.name}>
              <label>DIRECCION</label>
              <input
                className={styles.input}
                plasceholder="Direccion"
                type="text"
                name="address"
                key="address"
                value={dataState.address}
                onChange={handleChange}
              />
            </div>
            <div className={styles.name}>
              <label>CIUDAD</label>
              <input
                className={styles.input}
                plasceholder="Ciudad"
                type="text"
                name="city"
                key="city"
                value={dataState.city}
                onChange={handleChange}
              />
            </div>
            <div className={styles.name}>
              <label>PROVINCIA</label>
              <input
                className={styles.input}
                plasceholder="Provincia"
                type="text"
                name="province"
                key="province"
                value={dataState.province}
                onChange={handleChange}
              />
            </div>
            {/* <div className={styles.name}>
              <label>CODIGO POSTAL</label>
              <input
                className={styles.input}
                plasceholder="Codigo Postal"
                type="text"
                name="zipcode"
                value={dataState.postal}
              />
            </div> */}

            <div className={styles.message}>
              <label for="message"></label>
              <textarea
                className={styles.textarea}
                name="notes"
                placeholder="Aclaraciones..."
                id="message_input"
                cols="30"
                rows="5"
                key="notes"
                value={dataState.notes}
                onChange={handleChange}
              ></textarea>
            </div>
            {validator && (
              <div>
                <h3>{validator}</h3>
              </div>
            )}
            <div className="submit">
              <button
                className={styles.formButton}
                type="submit"
                key="submit"
                value="submit"
                id="form_button"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
