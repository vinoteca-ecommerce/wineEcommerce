import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getCategories } from "../../redux/actions/actions";


export const UpdateProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories);
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
  }, [dispatch,setInput, id]);
  
 
  function handleSubmit(e){
    e.preventDefault()
  
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

  function handleOnChange(e) {
    setInput((state) => {
      const newState = {
        ...state,
        [e.target.name]: e.target.value,
      };
      return newState;
    });
  }

  function handleSelect(e){
    setInput({
      ...input,
      category: e.target.value
    });
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
              placeholder="Nombre"
              value={input.name}
              name='name'
              autoComplete="off"
              onChange={handleOnChange}/>
           
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
      
              <button type="submit" value = 'Create' > Submit </button>
        </ul>
      </form>
    </div>
  );
};