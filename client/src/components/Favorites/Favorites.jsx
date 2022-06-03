import { useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFavs, deleteFav } from "../../redux/actions/actions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 

//STYLES
import Style from "./Favorites.module.css"
import { Link } from "react-router-dom";

export default function UserFavorites(){
    let store = JSON.parse(localStorage.getItem('user'))
    const allMyFavs = useSelector(state=>state.favorites)

    const dispatch = useDispatch()
    
    useEffect(()=>{
        
        store && store.user && dispatch(allFavs(store.user.uid))
    },[dispatch])

    const handleDeleteFavs=(id)=>{

        dispatch(deleteFav(id))
        alert('Favoritos actualizados')
        window.location.reload()
    }

    return(
    <div>
        {store && store.user.role 
        ?<TableContainer component={Paper}>
            <h2 className={Style.title}>Tus favoritos</h2>
             <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Año</TableCell>
                        <TableCell>Accion</TableCell>
                    </TableRow>
                    </TableHead>
            {allMyFavs && allMyFavs.map((wine)=>(
                <TableBody key={wine._id}>
                    <TableRow>
                        <TableCell className={Style.textt}><div><img className={Style.cardImg}src={wine.img} alt='image not found'/></div>${wine.price}</TableCell>
                        <TableCell>{wine.name}</TableCell>
                        <TableCell>{wine.year}</TableCell>
                        <TableCell>
                        <button className={Style.buttom} onClick={()=>handleDeleteFavs(wine._id)}>Delete</button>
                        </TableCell>
                    </TableRow>
                </TableBody>    
                )
            )}
            </Table>
        </TableContainer> 
        :<h2 className={Style.SecondOption}>
            <Link to={'/login'}><button className={Style.buttom}>LOGEATE PARA PODER VER TUS FAVORITOS</button></Link>
            
        </h2>
        }
    </div>)
}