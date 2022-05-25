import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './PreCategory.module.css';
import AddIcon from '@mui/icons-material/Add';
import { getWines } from '../../redux/actions/actions';

export const PreCategory = () => {
    const dispatch = useDispatch();
    const wines = useSelector((state) => state.wines);

    useEffect(()=>{
        dispatch(getWines())
    },[dispatch])

    console.log(wines)
  return (
    <div className={style.container}>
            <div className={style.card}>
                <div className={style.cardImageTinto}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Red</p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>

            <div className={style.card}>
                <div className={style.cardImageBlanco}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>White</p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>

            <div className={style.card}>
                <div className={style.cardImageRosado}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Rosé</p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>

            <div className={style.card}>
                <div className={style.cardImageEspumoso}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Sparkling </p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>

            <div className={style.card}>
                <div className={style.cardImage}></div>
                <div className={style.cardDescriptionAll}>
                    <p className={style.textTitleAll}><AddIcon/></p>
                    <p className={style.textBody}>Ver Todo</p>
                </div>
            </div>
    </div>
  )
}
