import { Button } from '@mui/material'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { getUserById, userProfileUpd } from '../../redux/actions/actions'
import style from './EditProfile.module.css';


export const EditProfile = () => {
    const store = JSON.parse(localStorage.getItem('user'))
    let acuser = store
    console.log()
    const user  = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const [nombre ,setNombre] = useState(false);
    const [error, setError] = useState({})
    const [img, setImg] = useState(false)
    const [input, setInput] = useState({
        name: store?.user.name,
        email: store?.user.email,
        img: user.img,
        role: store?.user.role
    })
   

    useEffect(()=>{
        dispatch(getUserById(store?.user.uid))
    },[dispatch])

    function handleSubmit(e){
        if(!input.name){
          e.preventDefault()
          swal({
            title: "Error",
            text: 'Falta completar correctamente el formulario',
            icon: "error",
            button: "Aceptar",
          });
        }
        else{
          e.preventDefault()

          dispatch(userProfileUpd(store?.user.uid, input))
          swal({
            title: "Perfil Actualizado",
            text: `Se modifico correctamente tu perfil`,
            icon: "success",
            button: "Aceptar",
          });
          setInput({
            name:'',
            img:'',
          })
        }
      }
    
    
    function handleOnChange(e) {
        e.preventDefault()
        acuser.user.img = input.img
        console.log(input.img)
        console.log(acuser)
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
        if(!/^[a-zA-Z]{3,50}$/.test(input.name)){
          error.name = 'Nombre debe ser valido'
        }
        return error
    }
    function handleEdit(e){
        e.preventDefault()
        setNombre(true)
        if(nombre === false){
            setNombre(true)
        }
        if(nombre === true){
            setNombre(false)
        }
    }
    function handleEditimg(e){
        e.preventDefault()
        setImg(true)
        if(img === false){
            setImg(true)
        }
        if(img === true){
            setImg(false)
        }
    }

  return (
    <div>
        <div>
            <form onSubmit={handleSubmit}>
                    <img style={{width:'200px', height:'200px', borderRadius:'200px'}} src={store?.user.img} alt='Not Found'/>
                    <button  onClick={e=>handleEditimg(e)} > editarimg</button>
               {img === false ? <div>

                </div>:(
                    <input
                    type='url'
                    name='img'
                    onChange={handleOnChange}
                    placeholder='Url de la imagen'/>

                )}
                <div>
                    <label> Nombre: {input.name} <button onClick={e=>handleEdit(e)}>Editar</button></label>
                    {nombre === false ? <div>
                    </div>: (
                        <div>
                            <input
                            type='text'
                            placeholder={user.name}
                            name='name'
                            value={input.name}
                            onChange={handleOnChange}
                            />

                        </div>
                    )}
                </div>
                <div>
                    <label> Email:</label>
                    <div>{user.email}</div>
                </div>
                <Button variant="contained" type="submit" onSubmit={handleSubmit}  > Actualizar </Button>
            </form>
        </div>
    </div>
  )
}
