import React from 'react'
import style from './PreCategory.module.css';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilter} from '../../redux/actions/actions';

export const PreCategory = () => {
    const dispatch = useDispatch();
  return (
    <div className={style.container}>
        <Link to={`/products`} style={{textDecoration:'none', color:'black'}} onClick={()=>dispatch(setFilter({category:'TINTO',orden:""}))}>
            <div className={style.card}>
                <div className={style.cardImageTinto}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Tinto</p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>
        </Link>

        <Link to={`/products`} style={{textDecoration:'none', color:'black'}} onClick={()=>dispatch(setFilter({category:'BLANCO',orden:""}))}>
            <div className={style.card}>
                <div className={style.cardImageBlanco}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Blanco</p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>
        </Link>

        <Link to={`/products`} style={{textDecoration:'none', color:'black'}} onClick={()=>dispatch(setFilter({category:'ROSADO',orden:""}))}>
            <div className={style.card}>
                <div className={style.cardImageRosado}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Rosado</p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>
        </Link>

        <Link to={`/products`} style={{textDecoration:'none', color:'black'}} onClick={()=>dispatch(setFilter({category:'ESPUMANTE',orden:""}))}>
            <div className={style.card}>
                <div className={style.cardImageEspumoso}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Espumante </p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>
        </Link>

        <Link to={`/products`} style={{textDecoration:'none', color:'black'}} onClick={()=>dispatch(setFilter({category:"",orden:""}))}>
            <div className={style.card}>
                <div className={style.cardImage}></div>
                <div className={style.cardDescriptionAll}>
                    <p className={style.textTitleAll}><AddIcon/></p>
                    <p className={style.textBody}>Ver Todo</p>
                </div>
            </div>
        </Link>
    </div>
  )
}
