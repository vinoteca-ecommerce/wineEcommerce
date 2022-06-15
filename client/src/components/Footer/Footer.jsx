import { useNavigate } from "react-router"

import logoVinoteca from '../../images/logoVinoteca.png'
//Styles
import Style from "./Footer.module.css"
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

export default function Footer(){
    
    const navigate = useNavigate()
    const handleOnClick = ()=>{
       navigate('/aboutus')
    }

 
    
    return (
      <footer className={Style.footerDistributed}>
        <div className={Style.footerLeft}>
          <h3>
            VINO<span>TECA</span>
          </h3>

          <div className={Style.footerLinks}>
            <Link to={"/"}>
              <h4 className={Style.linkOne}>Home</h4>
            </Link>
            <Link to={"/products"}>
              <h4>Productos</h4>
            </Link>
          
            <Link to={"/contactForm"}>
              <h4>Contacto</h4>
            </Link>
          </div>
          <div>
            <p>
              <a className={Style.mail} href="vinotecahenry@gmail.com">
                vinotecahenry@gmail.com
              </a>
            </p>
          </div>

          <p className={Style.footerCompanyName}>Soy Henry Bootcamp © 2022</p>
        </div>

        <div className={Style.footerCenter}>
          <div>
            <a
              title="Ver codigo en GitHub"
              href="https://github.com/vinoteca-ecommerce/wineEcommerce"
              target="_blank"
            >
              <img src={logoVinoteca} alt="winelogo" className={Style.img} />
            </a>
          </div>
        </div>

        <div className={Style.footerRight}>
          <p className={Style.footerCompanyAbout}>
            <span>EQUIPO DE DESARROLLO</span>
            Somos un grupo de profesionales que logramos reunir todos los
            conocimientos necesarios para afrontar los proximos desafios dentro
            de la industria tecnologica. Conoce mas sobre nosotros...
            <span className={Style.arrow}>&darr;</span>
          </p>

          <div className={Style.footerIcons}>
            <div onClick={() => handleOnClick()} className={Style.button}>
              <div className={Style.box}>H</div>
              <div className={Style.box}>E</div>
              <div className={Style.box}>L</div>
              <div className={Style.box}>L</div>
              <div className={Style.box}>O</div>
            </div>
          </div>
        </div>
      </footer>
    );
}



