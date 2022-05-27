import React,{useEffect,useState} from 'react';
import { getWinesById } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './CardDetail.module.css';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export const CardDetail = () => {

  const dispatch = useDispatch();
  const wines = useSelector((state) => state.wines);
  const {id} = useParams();
  const [cont,setCont] = useState(1)

  useEffect(()=>{
    dispatch(getWinesById(id))
  },[dispatch,id])

  const handleClick = (operation)=>{
    if(operation === 'sub'){
      if(cont > 1) setCont(cont-1)
    }
    else setCont(cont+1)
    
  }

  return (
    <div>
      {id !== wines?._id ? <h2>Loading...</h2>
      :
      <div className={style.container}>
        <div className={style.img}>
          <img src={wines?.img} alt={wines?.name} />
        </div>

        <div className={style.datail}>
          <h3>{wines?.name}</h3>
          <h5 className={style.p}>{wines?.category?.name}</h5>
          <p className={style.border}>{wines?.description}</p>
          <div className={style.price}>
            <p>${wines?.price}.00</p>
            <div style={{display:'flex',alignItems:'center'}}>
              <Button onClick={()=>handleClick('sub')} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#7f0000'}}><RemoveIcon/></Button>
              <p style={{display:'inline',color:'#7f0000',padding:'.2em .6em',margin:'.5em',border:'2px solid #7f0000', borderRadius:'1em', fontSize:'1.2em'}}>{cont}</p>
              <Button onClick={()=>handleClick('add')} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#7f0000'}}><AddIcon/></Button>
            </div>
          </div>
          <div className={style.btn}>
          <Button variant="contained">Agregar al Carrito <AddShoppingCartIcon sx={{ml:'15px'}}/></Button>
          </div>
          
        </div>
      </div>
      }
    </div>
  )
}
