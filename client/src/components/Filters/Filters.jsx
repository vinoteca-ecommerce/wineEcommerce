import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'

//---Import Actions--//
import {
    getWines,
    getWineCategory,
} from '../../redux/actions/actions'


export const Filters = () =>{
 const dispatch = useDispatch();
 const allWines = useSelector((state) => state.wines)
 const category = useSelector((state) => state.winesCopy)
 const [status, setStatus] = useState('')

useEffect (()=>{
    dispatch(getWines())
},[dispatch])

//---Filter by Category--//
const handleFilterCategory = (e) =>{
   dispatch(getWineCategory(e.target.value))
}


    return(
<div className='defaultValue'>
    <select>
        <option value='SortPrice' selected disabled>PRECIO</option>
        <option value='pricemax'>Max⬆</option>
        <option value='pricemin'>Min⬇</option>
    </select>

    <select onChange={e => handleFilterCategory(e)}>
    <option value='FilterCategory' selected disabled>TIPO</option>
        <option value='Tinto'>Tinto</option>
        <option value='Blanco'>Blanco</option>
        <option value='Rose'>Rose</option>
        <option value='Espumante'>Espumante</option>
    </select>

    <select> 
    <option value='FilterWinery' selected disabled>BODEGA</option>
    </select> 
   
    
    <select>PAIS</select>
</div>

    )
}