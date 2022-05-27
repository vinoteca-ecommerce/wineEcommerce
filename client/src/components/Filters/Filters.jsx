import React from "react";
import {useDispatch,  } from 'react-redux'

//---Import Actions--//
import {
    getWineCategory,
} from '../../redux/actions/actions'


export const Filters = () =>{
 const dispatch = useDispatch();

//---Filter by Category--//
const handleFilterCategory = (e) =>{
    console.log(e.target.value)
    dispatch(getWineCategory(e.target.value))
}


    return(
<div className='defaultValue'>
    <select>
        <option value='SortPrice' >PRECIO</option>
        <option value='pricemax'>Max⬆</option>
        <option value='pricemin'>Min⬇</option>
    </select>

    <select onChange={e => handleFilterCategory(e)}>
    <option value='FilterCategory' >TIPO</option>
        <option value='Tinto'>Tinto</option>
        <option value='Blanco'>Blanco</option>
        <option value='Rose'>Rose</option>
        <option value='Espumante'>Espumante</option>
    </select>

    <select> 
    <option value='FilterWinery' >BODEGA</option>
    </select> 
   
    
    <select>
        <option value="hola1">H</option>
        <option value="hola2">HO</option>
        <option value="hola3">HOL</option>
        <option value="hola4">HOLA</option>
    </select>
</div>

    )
}