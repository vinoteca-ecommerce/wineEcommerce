
import React, {useRef, useState} from 'react'
import styles from '../ContactForm/ContactForm.module.css'
// import { useForm } from 'react-hook-form'
import emailjs from 'emailjs-com'


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
            <img
              src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EWine Glass%3C/title%3E%3Cdesc%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer2' d='M47.8 18C47.3 11.3 46 2 46 2H18s-1.3 9.3-1.8 16M32 39.1V62m-10 0h20' fill='none' stroke='%23202020' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3C/path%3E%3Cpath data-name='layer1' d='M16.2 18c-.1 1.5-.2 2.9-.2 4 0 6 5.5 16 16.2 16S48 28 48 22c0-1.1-.1-2.5-.2-4z' fill='none' stroke='%23202020' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3C/path%3E%3C/svg%3E"
              alt="Wine Glass"
            />
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
            <label for="name"></label>
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
            <label for="email"></label>
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
            <label for="name"></label>
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
            <label for="subject"></label>
            <select
              className={styles.select}
              placeholder="Tipo de consulta"
              name="subject"
              id="subject_input"
              required
            >
              <option disabled hidden selected>
                Tipo de consulta
              </option>
              <option>Asesoramiento</option>
              <option>Consulta general</option>
              <option>Reclamos</option>
            </select>
          </div>
          <div className={styles.message}>
            <label for="message"></label>
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
          <div class="submit">
            <div></div>
            <input
              className={styles.form_button}
              type="submit"
              value="Enviar"
              id="form_button"
            />
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
