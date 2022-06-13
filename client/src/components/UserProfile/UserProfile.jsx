import React, { useEffect, useState } from "react";
import styles from "../UserProfile/UserProfile.module.css";
import { NavLink } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import authService from "../services/auth-service";
import { AdminProfile } from "../AdminDashboard/AdminProfile";

export const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(()=>{
    const user= authService.getCurrentUser();
    if(user){
      setCurrentUser(user)
    }
  },[])

  return currentUser?.user?.role === "ADMIN_ROLE" ?  (
      <AdminProfile/>
  ):(
    <>
      <div className={styles.container}>
        <div className={styles.profileTitle}>
          <h1>Mi Perfil</h1>
        </div>
        <EditProfile/>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <NavLink to="/userorders/approved" style={{textDecoration:'none',color:'#5A5A5A'}}>
              <h3 className={styles.card__title}>Mis Pedidos</h3>
            </NavLink>
            <p className={styles.card__content}>
              Realiza el seguimiento de tus pedidos, repetir compras o devolver
              producto{" "}
            </p>

            <div className={styles.card__arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="15"
                width="15"
              >
                <path
                  fill="#fff"
                  d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                ></path>
              </svg>
            </div>
          </div>

          <div className={styles.card}>
            <NavLink to="/useraddress" style={{textDecoration:'none',color:'#5A5A5A'}}>
              <h3 className={styles.card__title}>Direcciones</h3>
            </NavLink>
            <p className={styles.card__content}>
              Editar direccion de envio o preferencias para tus pedidos{" "}
            </p>

            <div className={styles.card__arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="15"
                width="15"
              >
                <path
                  fill="#fff"
                  d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                ></path>
              </svg>
            </div>
          </div>

          <div className={styles.card}>
            <NavLink to="/contactform" style={{textDecoration:'none',color:'#5A5A5A'}}>
              <h3 className={styles.card__title}>Ayuda</h3>
            </NavLink>
            <p className={styles.card__content}>
              Contactanos para un asesoramiento personalizado
            </p>

            <div className={styles.card__arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="15"
                width="15"
              >
                <path
                  fill="#fff"
                  d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};