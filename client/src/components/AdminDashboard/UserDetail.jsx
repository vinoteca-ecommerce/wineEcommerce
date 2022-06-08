import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  getUserById} from '../../redux/actions/actions'


export const UserDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user)
    const [ error, setError ] = useState({})

    
  
  
    useEffect(() => {
      dispatch(getUserById(id))
    }, [dispatch, id] );
    
    console.log(user)
   
    function handleSubmit(e){
      
     
    
      }
    
  
    function handleOnChange(e) {
  
    }
  
    function handleSelect(e){
   
    }
    // function aux(e){
    //   if(e.target.value === ''){
    
    //     const x = e.target.name
       
    //   e.target.value = wine[x]?wine[x]:''
   
    
    //   }
    // }
  
    function validate(input){
      let error = {};
      if(input.name.length < 4){
        error.name = 'Nombre debe ser valido'
      }
      if(input.producer.length < 4){
        error.producer = 'Nombre del productor es obligatorio'
      }
      if(!input.price){
        error.price = 'Precio es obligatorio'
      }
      if(input.price < 0){
        error.price = 'Debe tener precio valido'
      }
      if(input.country.length < 4){
        error.country = 'Pais del vino es obligatorio' 
      }
      if(input.year <= 0){
        error.year = 'Debe ser un año valido'
      }
      if(!input.strain){
        error.strain = 'Cepa es obligatorio'
      }
      return error
    }
  
    return (
      <div>
        <h3> Modificar Usuario </h3>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>Nombre:  </label>
              <input   
                type="text" 
              
              
                name='name'
                autoComplete="off"
                onChange={handleOnChange}/>
               {error.name && <p>{error.name}</p>}  
            </li>
            <li>
              <label>Año:  </label>
              <input 
                type="number" 
          
              
                name='year' 
                autoComplete="off"
                onChange={handleOnChange}
                min='0'
                />
               {error.name && <p>{error.year}</p>}  
            </li>
            <li>
              <label>Cepa:  </label>
              <input 
                type="text" 
               
              
                name='strain'
                autoComplete="off"
                onChange={handleOnChange}
                />
               {error.name && <p>{error.strain}</p>}  
            </li>
            <li>
              <label>Pais:  </label>
              <input
                type="text" 
            
                name='country' 
                autoComplete="off"
                onChange={handleOnChange}
                />
              {error.name && <p>{error.country}</p>}  
            </li>
            <li>
              <label>Productor:  </label>
              <input 
                type="text" 
             
              
                name='producer' 
                autoComplete="off"
                onChange={handleOnChange}
                />
              {error.name && <p>{error.producer}</p>}  
             </li>
             <li>
              <label>Link Imagen:  </label>
              <input    
                type="text" 
          
              
                name='img' 
                autoComplete="off"
                onChange={handleOnChange}
                />
             </li>
            <li>
  
              <label>Precio: $ </label>
              <input      
                type="number" 
        
               
                name='price' 
                autoComplete="off"
                onChange={handleOnChange}
                min='0'
                />
              {error.name && <p>{error.price}</p>}  
             </li>
             <li> 
  
             <label>Stock:  </label>
              <input       
                type="number" 
           
                
                name='stock' 
                autoComplete="off"
                onChange={handleOnChange}
                min='0'
                />
                 
             </li>
                <label > Categoria: </label>
            
                {/* <select placeholder={wine.category} onChange={e=>handleSelect(e)} >
                  <option> Selecciona una categoria </option>
                  {category.result?.map((e) => (
                    <option value={e._id} key={e._id}> {e.name} </option>
                  ))}
                </select>    */}
                
              <li>
              <label>Descripcion:  </label>
              <textarea       
                type="text" 
                
           
                name='description'
                autoComplete="off"
                onChange={handleOnChange}
                  />
                   
            </li>
        
                <button type="submit" value = 'Create' disabled={Object.keys(error).length}> Submit </button>
          </ul>
        </form>
      </div>
    );
}

