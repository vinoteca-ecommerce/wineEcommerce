import React from "react";
import style from '../Landing/Landing.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Landing = () =>{
    return (
       <div className={style.container}>
         <div className={style.imgBox}>
                   <h1> Discover your favorite wine</h1> 
                  <div><KeyboardArrowDownIcon/> </div>         
             </div>
       </div>      
    )
}

