import React from 'react'
import styles from '../UserProfile/UserAddressForm.module.css'
import { useForm } from 'react-hook-form'


export const UserAddressForm = () => {
  const {register, formState:{errors}, handleSubmit} = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.h1}>&bull; Completa tus datos de envio &bull;</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.name}>
            <label>NOMBRE</label>
            <input
              className={styles.input}
              plasceholder="Nombre"
              type="text"
              name="name"
              {...register("name", { required: true })}
            />
            <error>
              {errors.name?.type === "required" && <p>*Nombre requerido*</p>}
            </error>
          </div>
          <div className={styles.phone}>
            <label>TELEFONO</label>
            <input
              className={styles.input}
              plasceholder="Telefono"
              name="phone"
              type="number"
              {...register("number", {
                minLength: 6,
                maxLength: 12,
              })}
            />
            <error>
              {errors.number?.type === "minLength" && (
                <p>*El numero es menor a 6 digitos*</p>
              )}
              {errors.number?.type === "maxLength" && (
                <p>*El maximo es de 12 digitos *</p>
              )}
            </error>
          </div>
          <div className={styles.name}>
            <label>DIRECCION</label>
            <input
              className={styles.input}
              plasceholder="Direccion"
              type="text"
              name="address"
              {...register("address", { required: true })}
            />
            <error>
              {errors.address?.type === "required" && (
                <p>*Direccion requerida*</p>
              )}
            </error>
          </div>
          <div className={styles.name}>
            <label>CIUDAD</label>
            <input
              className={styles.input}
              plasceholder="Ciudad"
              type="text"
              name="city"
              {...register("city", { required: true })}
            />
            <error>
              {errors.city?.type === "required" && <p>*Ciudad requerida*</p>}
            </error>
          </div>
          <div className={styles.name}>
            <label>PROVINCIA</label>
            <input
              className={styles.input}
              plasceholder="Provincia"
              type="text"
              name="state"
              {...register("state", { required: true })}
            />
            <error>
              {errors.state?.type === "required" && (
                <p>*Provincia requerida*</p>
              )}
            </error>
          </div>
          <div className={styles.name}>
            <label>CODIGO POSTAL</label>
            <input
              className={styles.input}
              plasceholder="Codigo Postal"
              type="text"
              name="zipcode"
              {...register("zipcode", { required: true })}
            />
            <error>
              {errors.zipcode?.type === "required" && (
                <p>*Codigo Postal requerido*</p>
              )}
            </error>
          </div>

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

          <div className='submit'>
            <input
              className={styles.formButton}
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
