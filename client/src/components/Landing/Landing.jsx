import React from "react";
import style from '../Landing/Landing.module.css'
// import {NavLink} from 'react-router-dom'


export const Landing = () =>{
    return (
    <div className={style.imgBox}>
          <span> Descubrí nuestros mejores vinos
           
          </span> 
           <p>Seleccionados de excelentes bodegas</p>
      
        <div className={style.containerBtn}>
            <div className={style.scrolldown}>
            <div className={style.chevrons}>
        <div className={style.chevrondown}></div>
            <div className={style.chevrons}></div>
         </div>
        </div> 
       </div> 
         
  </div>
           
    )
}


