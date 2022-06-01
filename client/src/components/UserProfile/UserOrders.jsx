import styles  from '../UserProfile/UserOrders.module.css'
import React from 'react'




export const UserOrders= () => {
  return (
    <div> 
        <div className={styles.title}>
            <h1>MIS PEDIDOS</h1>
        </div>
        
      <nav className='navBar'>
        <ul className={styles.ulBreadcrumbs}>
          <li><a href='#'> PEDIDOS </a></li>
          <li><a href='#'>VOLVER A COMPRAR</a></li>
          <li><a href='#'>PEDIDOS PENDIENTES</a></li>
          <li><a href='#'>PEDIDOS CANCELADOS</a></li>
          <li><a href='#'>DEVOLUCIONES</a></li>
        </ul>
      </nav>
    </div>
  );
}
