import React from 'react'
import style from './PreCategory.module.css';
import AddIcon from '@mui/icons-material/Add';

export const PreCategory = () => {
  return (
    <div className={style.container}>
            <div className={style.card}>
                <div className={style.cardImageTinto}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Tinto</p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>

            <div className={style.card}>
                <div className={style.cardImageBlanco}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Blanco</p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>

            <div className={style.card}>
                <div className={style.cardImageRosado}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Rosado</p>
                    {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
                </div>
            </div>

            <div className={style.card}>
                <div className={style.cardImageEspumoso}></div>
                <div className={style.cardDescription}>
                    <p className={style.textTitle}>Espumante </p>
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
