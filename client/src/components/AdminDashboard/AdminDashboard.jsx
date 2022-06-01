import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, postWine } from "../../redux/actions/actions";


export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories);
  const [error, setError] = useState({})
  const [input, setInput] = useState({
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
  }, [dispatch]);

  function handleSubmit(e){
    e.preventDefault()
    console.log(input)
    dispatch(postWine(input))
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

  function handleSelect(e){
    setInput({
      ...input,
      category: e.target.value
    });
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
    if(input.country.length < 4){
      error.country = 'Pais del vino es obligatorio' 
    }
    if(!input.strain){
      error.strain = 'Cepa es obligatorio'
    }
    return error
  }

  
  return (
    <div>
      <nav><Link  to='/admin/delete'> Borrar Producto </Link> </nav>
      <h3> Formulario de agregar Vino </h3>
      <form onSubmit={e=>handleSubmit(e)}>
        <ul>
          <li>
            <label>Nombre:  </label>
            <input 
              type="text" 
              placeholder="Nombre"
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
              placeholder="Año"
              value={input.year}
              name='year' 
              autoComplete="off"
              onChange={handleOnChange}
              />
             
          </li>
          <li>
            <label>Cepa:  </label>
            <input 
              type="text" 
              placeholder="Cepa"
              value={input.strain}
              name='strain'
              autoComplete="off"
              onChange={handleOnChange}
              />
              {error.strain && <p>{error.strain}</p>}  
          </li>
          <li>
            <label>Pais:  </label>
            <input 
              type="text" 
              placeholder="Pais"
              value={input.country}
              name='country' 
              autoComplete="off"
              onChange={handleOnChange}
              />
              {error.country && <p>{error.country}</p>}  
          </li>
          <li>
            <label>Productor:  </label>
            <input 
              type="text" 
              placeholder="Productor"
              value={input.producer}
              name='producer' 
              autoComplete="off"
              onChange={handleOnChange}
              />
              {error.producer && <p>{error.producer}</p>}  
           </li>
           <li>
            <label>Link Imagen:  </label>
            <input 
              type="text" 
              placeholder="Link Imagen"
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
              placeholder="Precio"
              value={input.price}
              name='price' 
              autoComplete="off"
              onChange={handleOnChange}
              />
              {error.price && <p>{error.price}</p>}  
           </li>
           <li> 

           <label>Stock:  </label>
            <input 
              type="number" 
              placeholder="Stock"
              value={input.stock}
              name='stock' 
              autoComplete="off"
              onChange={handleOnChange}
              />
           </li>
           
              <label > Categoria: </label>
              <select placeholder="Categoria" onChange={e=>handleSelect(e)} >
                {category.result?.map((e) => (
                  <option value={e._id} key={e._id}> {e.name} </option>
                ))}
              </select>      
            <li>
            <label>Descripcion:  </label>
            <textarea 
              type="text" 
              placeholder="Descripcion"
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