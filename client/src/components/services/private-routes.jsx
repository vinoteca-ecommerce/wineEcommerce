import authHeader from "./auth-header";
import axios from 'axios'


const getUsers = ()=>{
    return axios.get('http://localhost:8000/users',{headers: authHeader()});
}

const privateRoutes ={
    getUsers
}

export default privateRoutes