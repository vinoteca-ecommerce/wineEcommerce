import React from "react";
import Style from '../Landing/Landing.module.css'

const Landing = () =>{
    return (
       <div className={Style.container}>
         <div className={Style.imgBox}>
                   <h1> Discover your favorite wine</h1> 
                  <p>EXPLORE</p>         
             </div>
       </div>      
        
    )
}
export default Landing;
