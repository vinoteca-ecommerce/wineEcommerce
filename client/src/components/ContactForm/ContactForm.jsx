
import React, {useRef, useState} from 'react'
import styles from '../ContactForm/ContactForm.module.css'
// import { useForm } from 'react-hook-form'
import emailjs from 'emailjs-com'
import iconGlass from '../../images/iconGlass.svg'

export const ContactForm = () => {
  
const form = useRef();
 const [done, setDone] = useState(false);

const sendEmail = (e)=>{
e.preventDefault();
emailjs.sendForm(
    "service_08qqfu8",
    "template_vzoe05b",
    form.current,
    "TxkWSF0p-Epvw5A_T"
  )
  .then(
    (result) => {
      console.log(result.text);
      setDone(true)
    },
    (error) => {
      console.log(error.text);
    }
  );
  e.target.reset()
}
//  const {
//    register,
//    formState: { errors },
//    handleSubmit,
//  } = useForm();
//  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.h1}>&bull; Contáctanos &bull;</h1>
        <div className={styles.underline}></div>
        <div className={styles.icon_wrapper}>
          <div className={styles.icon}>
            <img src={iconGlass} alt="Wine Glass" />
          </div>
        </div>
        <form
          ref={form}
          onSubmit={sendEmail}
          className={styles.form}
          action="#"
          id="contact_form"
        >
          <div className={styles.name}>
            <label htmlFor="name"></label>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre"
              name="name"
              id="name_input"
              required
            />
          </div>
          <div className={styles.email}>
            <label htmlFor="email"></label>
            <input
              className={styles.input}
              type="email"
              placeholder="E-mail"
              name="email"
              id="email_input"
              required
            />
          </div>
          <div className={styles.telephone}>
            <label htmlFor="name"></label>
            <input
              className={styles.input}
              type="text"
              placeholder="Telefono"
              name="telephone"
              id="telephone_input"
              required
            />
          </div>
          <div className={styles.subject}>
            <label htmlFor="subject"></label>
            <select
              className={styles.select}
              placeholder="Tipo de consulta"
              name="subject"
              id="subject_input"
              required
            >
              <option value='default' hidden>
                Tipo de consulta
              </option>
              <option value="1">Asesoramiento</option>
              <option value="2">Consulta general</option>
              <option value="3">Reclamos</option>
            </select>
          </div>
          <div className={styles.message}>
            <label htmlFor="message"></label>
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="Me contacto por..."
              id="message_input"
              cols="30"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="submit">
            <button
              className={styles.form_button}
              type="submit"
              key="submit"
              value="submit"
              id="form_button"
            >
              Enviar
            </button>
            {done && (
              <h3 className={styles.h3}>
                Gracias, te responderemos a la brevedad!
              </h3>
            )}
          </div>
        </form>
        {/* <!-- // End form --> */}
      </div>
      {/* <!-- // End #container --> */}
    </div>
  );
}
