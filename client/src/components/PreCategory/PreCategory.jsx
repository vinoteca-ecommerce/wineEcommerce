import React from 'react'
import style from './PreCategory.module.css';

export const PreCategory = () => {
  return (
    <div className={style.container}>
        <div className={style.card}>
            <div className={style.cardImage}>IMAGEN</div>
            <div className={style.cardDescription}>
                <p className={style.textTitle}> Card Title</p>
                {/*<p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>*/}
            </div>
        </div>
    </div>
  )
}
