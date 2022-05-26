import React from "react";
import {Link} from 'react-router-dom';
import '../About/About.css';


export const Aboutus = () =>{
    return (
        <div className="container">
            <div className="text-container">
                <h1 className="title">
                    Bienvenidos!
                </h1>
                <h3 className="description">
                    Somos un equipo de 7 de desarrolladores full stack con la idea de realizar un e-commerce orientado al comercio de vinos. Para este proyecto utilizamos los siguientes tecnologias:
                   <ul>- Javascript</ul>
                   <ul>- React</ul>
                   <ul>- Redux</ul>
                   <ul>- CSS</ul>
                   <ul>- MongoDB</ul> 
                </h3>
                <h4 className="more">Quieres saber mas de nosotros?<button className="btn-contact"><Link className="link" to='/contact'>Contactanos!</Link></button></h4>
            </div>
        </div>
    )
}

