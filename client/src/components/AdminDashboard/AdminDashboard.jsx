import React, { useState, useEffect } from "react";
import Link from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, postWine } from "../../redux/actions/actions";


export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories);
  const [input, setInput] = useState({
    name:'',
    year:'',
    description:'',
    img:'',
    category: '',
    price: "",
    country: "",
    strain: '',
    producer:''
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
      producer:''
  
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
      return newState;
    });
  }

  return (
    <div>
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
              onChange={handleOnChange} />
          </li>
          <li>
            <label>Año:  </label>
            <input 
              type="text" 
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

            <label>PRECIO: $ </label>
            <input 
              type="text" 
              placeholder="Precio"
              value={input.price}
              name='price' 
              autoComplete="off"
              onChange={handleOnChange}
              />
           </li>
          
              <label > Categoria: </label>
              <select onChange={e=>handleSelect(e)} >
                {category.result?.map((e) => (
                  <option value={e._id} key={e._id}> {e.name} </option>
                ))}
              </select>      
            <li>
            <label>DESCRIPCION:  </label>
            <textarea 
              type="text" 
              placeholder="Descripcion"
              value={input.description}
              name='description'
              autoComplete="off"
              onChange={handleOnChange}
              />
          </li>
      
              <button type="submit"> Submit </button>
        </ul>
      </form>
    </div>
  );
};
