import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../redux/actions/actions'
import { CardProduct } from '../CardProduct/CardProduct'



export const DeleteAndUpdate = () => {


    const dispatch = useDispatch();
    const wine = useSelector((state)=> state.wines);
    const [input, setInput] = useState('');


    useEffect(()=>{
        dispatch(getProduct(''))
    }, [dispatch])




  return (
    <div>
        <nav><Link  to='/admin/post'> Agrega Producto </Link> </nav>
        <h3> Formulario de borrar Vino </h3>
        {wine.result?.map(e=>   <div key={e._id}>
            <CardProduct  id={e._id} name={e.name} price={e.price}
                        img={e.img} category={e.category.name} stock={e.stock}/>
         </div>)

      
        }
    </div>
  )
}
