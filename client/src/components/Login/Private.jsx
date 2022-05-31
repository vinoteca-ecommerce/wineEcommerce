import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import privateRoutes from '../services/private-routes';
import authService from '../services/auth-service';

const Private = () =>{

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        privateRoutes.getUsers().then(
            (response)=>{
                setUsers(response.data)
            },
            (error)=>{
                console.log('Private Page', error)
                if(error.response && error.response.status === 401){
                    //invalid token
                    authService.logout();
                    navigate('/login')
                    window.location.reload()
                }
            }
        )
    },[]);

    return(
        <div>
        <h1> RUTA PRIVADA </h1>
        <h3>
        {users.result?.map((e)=>(<div>{e.name}</div>))}
        </h3>
      </div>


    )



}


export default Private