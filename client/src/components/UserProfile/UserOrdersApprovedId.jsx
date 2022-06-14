import { Button, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getWinesById, putComment } from "../../redux/actions/actions";
import swal from 'sweetalert';
import style from './UserOrdersApprovedId.module.css'
import SendIcon from '@mui/icons-material/Send';

export function UserOrdersApprovedId() {
const { id } = useParams();
const [comment, setComment] = useState({email:"",
                                        name: '', 
                                        title:'',
                                        ranking: '',           
                                        comment:"" });


const dispatch = useDispatch();
const wine = useSelector(state => state.wines);
const user = JSON.parse(localStorage.getItem('user'))
const email = user.user.email
const name = user.user.name
const navigate = useNavigate()


useEffect(() => {
    dispatch(getWinesById(id))
}, []);


function handleChange(e){

setComment({
            ...comment,
            email: email,
            name: name,
            [e.target.name]: e.target.value})
 
}



function handleSelect(e){
    console.log(e.target.value)
    setComment({
        ...comment,
        ranking: e.target.value
    })
}
function handleSubmit(e){
    e.preventDefault()

    if(!comment.title || !comment.comment || !comment.ranking){
        return swal({
            title: "Completa todo los campos",
            text: 'Todos los campos son obligatorios',
            icon: "error",
            button: "Aceptar",
          })
    }

   const filtro = wine.comment.find(e => e.email === email)
 
   if(filtro){
    return swal({
        title: "Solo un feedback por usuario",
        text: 'Solo se permite un feedback por usuario',
        icon: "error",
        button: "Aceptar",
      })}else{
    dispatch(putComment(id,comment))
    navigate('/userorders/approved')
   }
}



    return (
        <div className={style.containerAll}> 
        <div className={style.contain}>
            <h1>{wine?.name}</h1>
            <div className={style.divimg}>
            <img className={style.image} src={wine?.img} alt="" />
            </div>
            <div>
             <h2 className={style.punt}>Puntuacion:</h2>
             <Rating
                 size="large"
                name="simple-controlled"
                 value={Number(comment.ranking)}
                onChange={handleSelect}/>
            </div>

                <br />
            <div className={style.comment}>
                <h2 htmlFor="">Titulo</h2>
                <br />
            <input className={style.title} placeholder='Ingrese titulo de su reseña' name='title'onChange={handleChange}/>
            <br />

           
            <label className={style.label} htmlFor="">Ingrese comentario sobre el vino</label>
            <br />
            <textarea className={style.textarea} onChange={handleChange} name='comment' id="" cols="50" rows="5"></textarea>
            <Button style={{marginBottom:'100px'}} onClick={handleSubmit}> <SendIcon style={{color:'maroon'}}/></Button>
            </div>
        </div>
        </div>
    )
}
