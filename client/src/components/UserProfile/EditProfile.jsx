import { Button } from '@mui/material'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { getUserById, userProfileUpd } from '../../redux/actions/actions'
import style from './EditProfile.module.css';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';


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
    <div className={style.containerAllPerfil}>
        
            <form onSubmit={handleSubmit}>
              <div className={style.ContainerPerfil}>
                <div className={style.imgdiv}>
            
                    <img className={style.img} style={{width:'160px', height:'auto', borderRadius:'200px'}} src={store?.user.img} alt='Not Found'/>
                    <Button className={img && style.none} onClick={e=>handleEditimg(e)} style={{maxWidth: "30px", maxHeight: "30px",minWidth: "30px",minHeight: "30px",marginTop:'9em'}} > <EditIcon style={{color:'#6c0000'}}/></Button>
               {img === false ? <div>

                </div>:
                <div>
                    <input
                    type='url'
                    name='img'
                    onChange={handleOnChange}
                    className={style.imgurl}
                    placeholder='Url de la imagen'/>
                  <Button onClick={e=>handleEditimg(e)} style={{marginLeft:'4px',maxWidth: "30px", maxHeight: "30px",minWidth: "30px",minHeight: "30px",}}><CancelIcon  style={{color:'#6c0000'}}/></Button>
                </div>}   
                </div>
             <div className={style.namediv}>
                      
                {nombre === false ?<label className={style.labelname}>{input.name}<Button onClick={e=>handleEdit(e)} style={{paddingLeft:'20px',maxWidth: "30px", maxHeight: "30px",minWidth: "30px",minHeight: "30px",}}><EditIcon  style={{color:'#6c0000'}}/></Button></label>
                : 
                          <div className={style.nameinputdiv}>
                                <input
                                type='text'
                                placeholder={user.name}
                                name='name'
                                className={style.name}
                                value={input.name}
                                onChange={handleOnChange}
                                />
                          <Button onClick={e=>handleEdit(e)} style={{marginLeft:'4px',maxWidth: "30px", maxHeight: "30px",minWidth: "30px",minHeight: "30px",}}><CancelIcon  style={{color:'#6c0000'}}/></Button>
                          </div>
                }
              </div>
                    <div className={style.emaildiv}>
                    <label className={style.email}>{user.email}</label>
                </div>
                <div className={style.btn}>
                <Button variant="contained" type="submit" onSubmit={handleSubmit}   style={{backgroundColor:'#6c0000',marginBottom:'.8em'}}> Actualizar </Button>
                </div>
                      
                
         
            </div>
            </form>
    </div>
  )
}
