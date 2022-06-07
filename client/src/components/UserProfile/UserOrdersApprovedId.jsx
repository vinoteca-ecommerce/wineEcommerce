import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getWinesById, putComment } from "../../redux/actions/actions";

export function UserOrdersApprovedId() {
const { id } = useParams();
const [comment, setComment] = useState({email:"",
                                        comment:"" });
const dispatch = useDispatch();
const wine = useSelector(state => state.wines);

const user = JSON.parse(localStorage.getItem('user'))

const email = user.user.email

useEffect(() => {
    dispatch(getWinesById(id))
}, []);

function handleChange(e){
setComment({email: email,
          comment: e.target.value})
 
}



// setComment((previo)=> {
//     const newState = (e.target.value)
//      return newState
//  })

function handleSubmit(e){
    e.preventDefault()
    
   const filtro = wine.comment.find(e => e.email === email)

   if(filtro){
   alert('No podes volver a comentar sobre el vino')}else{
    dispatch(putComment(id,comment))
    window.location.reload()
    alert('comentario agregado correctamente')
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
