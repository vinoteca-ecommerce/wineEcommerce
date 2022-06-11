import React,{useEffect,useState} from 'react';
import { getShoppingCar, getWinesById, getWinesCopy, setShoppingCar, updateCart } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './CardDetail.module.css';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import swal from 'sweetalert';
import { FeedbackCard } from '../Feedback Card/FeedbackCard';
import { UserAddress } from '../UserProfile/UserAddress';
import UserAddressCard from '../UserProfile/UserAddressCard';
import Rating from '@mui/material/Rating';

export const CardDetail = () => {


 
 
const winesCopy = useSelector(state => state.winesCopy);
const cart = useSelector(state => state.Cart);



  const dispatch = useDispatch();
  const wines = useSelector((state) => state.wines);
  const {id} = useParams();
  const [cont,setCont] = useState(1);
  let sum = 0;

  useEffect(()=>{
    dispatch(getShoppingCar())
    dispatch(getWinesById(id))
    dispatch(getWinesCopy())

  },[dispatch,id])

  const handleClick = (operation)=>{

    if(operation === 'sub'){
      if(cont > 1) setCont(cont-1);
    }else{
      if(cont >= wines.stock){
        return  swal({
         title: "Fuera de stock",
         text: `No hay mas stock`,
         icon: "error",
         button: "Aceptar",
       });
       }
      else setCont(cont+1);
    }
  } 





    const   handleClickShopping = (id)=>{


      
      let wineActual = winesCopy.result.find(e => e._id === id)

     
      console.log(cart)
     let wineStockcarro = cart.find(e=> e.wineActual._id === id)
     
    
     if(!wineStockcarro){
      console.log('asdas')
       let data = {
         wineActual,
         cant:1
       }
       
     dispatch(updateCart(data))
     dispatch(setShoppingCar(cart))
     }else if(wineStockcarro.cant < wineActual.stock){
       let data = {
         wineActual,
         cant:1
       }
     dispatch(updateCart(data))
     dispatch(setShoppingCar(cart))
     
     }else{
       alert('no hay mas stock')
     }
     }
     
     

  wines?.comment?.map(wine=>{
    sum = Number(wine.ranking) + sum
  })  



  return (
    <div>
      {id !== wines?._id ?  <svg className={style.svg} viewBox="25 25 50 50"><circle className={style.circle} r="20" cy="50" cx="50"></circle></svg>
      :<>
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
            {/* <div style={{display:'flex',alignItems:'center'}}>
              <Button onClick={()=>handleClick('sub')} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#7f0000'}}><RemoveIcon/></Button>
              <p style={{display:'inline',color:'#7f0000',padding:'.2em .6em',margin:'.5em',border:'2px solid #7f0000', borderRadius:'1em', fontSize:'1.2em'}}>{cont}</p>
              <Button onClick={()=>handleClick('add')} style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#7f0000'}}><AddIcon/></Button>
            </div> */}
          </div>
          <div className={style.btn}>
          <Button variant="contained" onClick={()=>handleClickShopping(id,wines.name, wines.price, wines.img, wines.category,wines.stock)}>Agregar al Carrito <AddShoppingCartIcon sx={{ml:'15px'}}/></Button>
          </div>   
        </div>
      </div>

      <div className={style.containerReviews}>
        <h2 style={{marginBottom:'1em',fontWeight:'600'}}>Reseñas de Clientes</h2>

        {wines?.comment.length !== 0 ?
          <>
            <Rating name="read-only" value={sum/wines?.comment.length} readOnly />
            <p style={{marginBottom:'3em'}} >Basado en {wines?.comment.length} reseñas</p>
          

        {wines?.comment.map((e, i)=>(
          <FeedbackCard
          key={i + 1}
          comment={e.comment}
          email={e.email}
          name={e.name}
          title={e.title}
          ranking={e.ranking} 
          />
        
        )) } 
        </>
        :<p className={style.noRev}>Este vino aun no tiene comentarios</p>
       }
      </div>
      </>}

    </div>
  )
}



