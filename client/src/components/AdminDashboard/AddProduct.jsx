import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, postWine } from "../../redux/actions/actions";
import style from './UpdateProduct.module.css';
import Button from '@mui/material/Button';
import swal from 'sweetalert';

// STYLE
//import Style from "./AddProduct.module.css"


export const AddProduct = () => {
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
    if(!input.category || input.year <= 0 || input.price <= 0){
      swal({
        title: "Error",
        text: 'Falta completar correctamente el formulario',
        icon: "error",
        button: "Aceptar",
      });
      e.preventDefault()
    }else{
      e.preventDefault();
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
      swal({
        title: "Vino Agregado",
        text: `Se agrego correctamente el producto`,
        icon: "success",
        button: "Aceptar",
      });
    }
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
      <Link to='/admin/' style={{textDecoration:'none'}} ><Button variant="outlined" > Inicio </Button></Link>
        
        <div className={style.form}>
        <form onSubmit={e=>handleSubmit(e)}>
        <h3> Nuevo Vino </h3>
            <div>
              <label>Nombre:  </label>
              <div>
                <input 
                  type="text" 
                  placeholder="Nombre"
                  value={input.name}
                  name='name'
                  autoComplete="off"
                  onChange={handleOnChange}
                  className={error.name && style.danger}/>
                  {error.name && <p>{error.name}</p> }   
                </div>
              </div>  
            <div>
              <label>Año:  </label>
              <div>
              <input 
                type="number" 
                placeholder="Año"
                value={input.year}
                name='year' 
                autoComplete="off"
                onChange={handleOnChange}
                min= "0"
                className={error.year && style.danger}/>
                {error.year && <p>{error.year}</p>} 
                </div>
              </div>
            <div>
              <label>Cepa:  </label>
              <div>
              <input 
                type="text" 
                placeholder="Cepa"
                value={input.strain}
                name='strain'
                autoComplete="off"
                onChange={handleOnChange}
                className={error.strain && style.danger}
                />
                {error.strain && <p>{error.strain}</p>}  
                </div>
            </div>

            <div>
              <label>Pais:  </label>
              <div>
              <input 
                type="text" 
                placeholder="Pais"
                value={input.country}
                name='country' 
                autoComplete="off"
                onChange={handleOnChange}
                className={error.country && style.danger}
                />
                {error.country && <p>{error.country}</p>}  
                </div>
            </div>

            <div>
              <label>Productor:  </label>
              <div>
              <input 
                type="text" 
                placeholder="Productor"
                value={input.producer}
                name='producer' 
                autoComplete="off"
                onChange={handleOnChange}
                className={error.producer && style.danger}
                />
                {error.producer && <p>{error.producer}</p>}  
                </div>
            </div>

            <div>
              <label>Link Imagen:  </label>
              <div>
              <input 
                type="text" 
                placeholder="Link Imagen"
                value={input.img}
                name='img' 
                autoComplete="off"
                onChange={handleOnChange}
                />
                </div>
            </div>

            <div>
              <label>Precio: $ </label>
              <div>
              <input 
                type="number" 
                placeholder="Precio"
                value={input.price}
                name='price' 
                autoComplete="off"
                onChange={handleOnChange}
                min='0'
                className={error.price && style.danger}
                />
                {error.price && <p>{error.price}</p>}  
                </div>
            </div>

            <div>
            <label>Stock:  </label>
            <div>
              <input 
                type="number" 
                placeholder="Stock"
                value={input.stock}
                name='stock' 
                autoComplete="off"
                onChange={handleOnChange}
                min='0'
                />
                </div>
            </div>

            <div>
                <label style={{marginTop:'2em'}}> Categoria: </label>
                <div>
                <select style={{marginTop:'2em'}} placeholder="Categoria" onChange={e=>handleSelect(e)} >
                <option> Selecciona una categoria </option>
                  {category.result?.map((e) => (
                    <option value={e._id} key={e._id}> {e.name} </option>
                  ))}
                </select>      
                </div>
            </div>

            <div>
              <label style={{marginTop:'2em'}}>Descripcion:  </label>
              <div>
              <textarea style={{marginTop:'2em'}}
                type="text" 
                placeholder="Descripcion"
                value={input.description}
                name='description'
                autoComplete="off"
                onChange={handleOnChange}
                />
                </div>
            </div>
                {!Object.keys(error).length ? <Button variant="contained" className={style.button} type="submit" > Crear </Button> : <Button disabled={true} variant="contained" className={style.button} type="submit" > Crear </Button>}

        </form>
        </div>
      </div>
  );
};