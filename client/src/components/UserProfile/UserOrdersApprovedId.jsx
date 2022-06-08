import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getWinesById, putComment } from "../../redux/actions/actions";
import swal from 'sweetalert';


export function UserOrdersApprovedId() {
const { id } = useParams();
const [comment, setComment] = useState({email:"",
                                        name: '',            
                                        comment:"" });
const dispatch = useDispatch();
const wine = useSelector(state => state.wines);
const user = JSON.parse(localStorage.getItem('user'))
const email = user.user.email
const name = user.user.name
useEffect(() => {
    dispatch(getWinesById(id))
}, []);


   console.log(id)

function handleChange(e){
setComment({email: email,
            name: name,
            comment: e.target.value})
 
}


function handleSubmit(e){
    e.preventDefault()
    
   const filtro = wine.comment.find(e => e.email === email)

   if(filtro){
    return swal({
        title: "Solo un feedback por usuario",
        text: `Solo se permite un feedback por usuario`,
        icon: "error",
        button: "Aceptar",
      })}else{
    dispatch(putComment(id,comment))
    window.location.reload()
   
   
   }
    
    
}




    return (
        <div>
            <h1>{wine.name}</h1>
            <img src={wine.img} alt="" />
            <label htmlFor="">Ingrese comentario sobre el vino</label>
            <br />
            <textarea onChange={handleChange} name="" id="" cols="30" rows="10"></textarea>
            <Button  onClick={handleSubmit}> SEND</Button>
        </div>
    )
}
