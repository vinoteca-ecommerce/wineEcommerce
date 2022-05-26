import githubLogo from "../../images/githublogo.png"
import linkedinLogo from "../../images/logold.png"
import wineLogo from "../../images/winelogo2.jpg"

//Styles
import Style from "./Footer.module.css"

export default function Footer(){
    const handleOnClick = ()=>{
        console.log("hola")
    }
    return(
        <div className={Style.bgcolor}>
            <div className={Style.orderDiv}>
                <div className={Style.spacing}>
                    <img src={wineLogo} alt="winelogo" className={Style.image} />
                </div>
                <div className={Style.spacing}>
                    <p className={Style.subtitle}>TIPOS DE VINOS</p>
                    <p className={Style.pcss}>Vino Tinto</p>
                    <p className={Style.pcss}>Vino Blanco</p>
                    <p className={Style.pcss}>Vino Rosado</p>
                    <p className={Style.pcss}>Espumante</p>
                    <button onClick={()=>handleOnClick()} className={Style.buttom}>SOBRE NOSOTROS</button>
                </div>
                <div>
                    <p className={Style.subtitle}>CONTACTANOS</p>
                    <div>
                        <a rel="noreferrer" href="https://github.com/vinoteca-ecommerce/wineEcommerce" target="_blank">
                        <img src={githubLogo} alt="ghlogo" className={Style.logo}/>
                        </a>
                        <a rel="noreferrer" href="https://www.linkedin.com/" target="_blank">
                        <img src={linkedinLogo} alt="ldlogo" className={Style.logo}/>
                        </a>
                    </div>
                    <p className={Style.pcss}>Cel: 0351 - henry</p>
                    <p className={Style.pcss}>Mail: winestore@henry.com</p>
                </div>
            </div>

        </div>
    )
}