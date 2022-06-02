import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getCategories, getWinesById } from "../../redux/actions/actions";


export const UpdateProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const wine = useSelector((state)=> state.wines)
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
  
  
console.log(wine)

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getWinesById(id))
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

function aux(e){
  if(e.target.value == ''){
    
    const x = e.target.name
    console.log(x)
e.target.value = wine[x]?wine[x]:''
console.log((wine.x))

  }
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
              name='name'
              onClick={aux}
              autoComplete="off"
              onChange={handleOnChange}/>
           
          </li>
          <li>
            <label>Año:  </label>
            <input 
              type="number" 
              placeholder="Año"
              value={input.year}
              onClick={aux}
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
              onClick={aux}
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
              onClick={aux}
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
              onClick={aux}
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
              onClick={aux}
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
              onClick={aux}
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
              onClick={aux}
              name='stock' 
              autoComplete="off"
              onChange={handleOnChange}
              />
           </li>
              <label > Categoria: </label>
              <select placeholder="Categoria" onSelect={aux} >
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
              onClick={aux}
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