import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getCategories, getWinesById } from "../../redux/actions/actions";


export const UpdateProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const wine = useSelector((state)=> state.wines)
  const category = useSelector((state) => state.categories);
  const [ error, setError ] = useState({})
  const [ input, setInput ] = useState({
    name:'',
    year:'',
    description:'',
    img:'',
    category: '',
    price: "",
    country: "",
    strain: '',
    producer:'',
    stock: ''
  });
  
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getWinesById(id))
  }, [dispatch,setInput, id]);
 
  function handleSubmit(e){
    if(!input.category || input.year <= 0 || input.price <= 0){
      alert('Existe uno o mas campos con error')
      e.preventDefault()
    }else{
  
      dispatch(updateProduct(id, input))
      alert('Vino actualizado correctamente')
      setInput({
        name:'',
        year:'',
        description:'',
        img:'',
        category: '',
        price: "",
        country: "",
        strain: '',
        producer:'',
        stock: ''
      })
    }
  }

  function handleOnChange(e) {
    setInput((state) => {
      const newState = {
        ...state,
        [e.target.name]: e.target.value,
      };
      setError(validate(newState))
      return newState;
    });
  }

  function handleSelect(e){
    setInput({
      ...input,
      category: e.target.value
    });
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
      <nav><Link  to='/admin/post'> Agregar Vino </Link>
        <Link  to='/admin/delete'> Modificar Vino </Link> </nav>
      <h3> Modificar Vino </h3>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label>Nombre:  </label>

            <input   
              type="text" 
              placeholder={wine.name}
              value={input.name}

              name='name'
           
              autoComplete="off"
              onChange={handleOnChange}/>
             {error.name && <p>{error.name}</p>}  
          </li>
          <li>
            <label>Año:  </label>
            <input 
              type="number" 
              placeholder={wine.year}
              value={input.year}
            
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
              placeholder={wine.strain}
              value={input.strain}
           
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
              placeholder={wine.country}
              value={input.country}
         
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
              placeholder={wine.producer}
              value={input.producer}
     
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
              placeholder={wine.img}
              value={input.img}
      
              name='img' 
              autoComplete="off"
              onChange={handleOnChange}
              />
           </li>
          <li>

            <label>Precio: $ </label>
            <input      
              type="number" 
              placeholder={wine.price}
              value={input.price}
        
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
              placeholder={wine.stock}
              value={input.stock}
          
              name='stock' 
              autoComplete="off"
              onChange={handleOnChange}
              min='0'
              />
               
           </li>
              <label > Categoria: </label>

          
              <select placeholder={wine.category} onChange={e=>handleSelect(e)} >
                <option> Selecciona una categoria </option>

                {category.result?.map((e) => (
                  <option value={e._id} key={e._id}> {e.name} </option>
                ))}
              </select>   
              
            <li>
            <label>Descripcion:  </label>
            <textarea       
              type="text" 
              placeholder={wine.description}
              value={input.description}
         
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
};