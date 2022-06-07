import React from 'react'

export const FeedbackCard = ({name, comment}) => {
  
return (
    <div>
        {comment !== 'Este vino aun no tiene comentarios' ?
        <div>
        <h4>{name}:</h4> 
        <h5> {comment} </h5>
        </div> : <div> <p>Este vino aun no tiene comentarios</p></div>}
    </div>
  )
}
