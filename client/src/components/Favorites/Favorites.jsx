import { useEffect,useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFavs2, deleteFav } from "../../redux/actions/actions";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import swal from 'sweetalert';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

//STYLES
import Style from "./Favorites.module.css"
import { Link } from "react-router-dom";

export default function UserFavorites(){
    let store = JSON.parse(localStorage.getItem('user'))
    
    const allMyFavs = useSelector(state=>state.favorites)

    const dispatch = useDispatch()
    const [status,setStatus] = useState(false)
    
    useEffect(()=>{

        store && store.user && dispatch(allFavs2(store.user.uid))

    },[dispatch,status])

    const handleDeleteFavs=(id)=>{

        dispatch(deleteFav(id))

        let state = JSON.parse(localStorage.getItem('favorites'));
        state = state.filter(fav=>fav !== id)
        localStorage.setItem('favorites', JSON.stringify(state));

        swal({
            title: "Vino Eliminado",
            text: `Vino Eliminado de Favoritos`,
            icon: "success",
            button: "Aceptar",
          })
        .then(()=>setStatus(!status))
    }

    return(
    <div style={{display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column', padding:'0 0 6em 0'}}>
        <h2 className={Style.title}>Tus Favoritos</h2>
        {store && store.user.role 
        ?<TableContainer className={Style.TableContainer} >
            
             <Table component={Paper} sx={{width:'100%'}} >
                    <TableHead >
                        <TableRow>
                        <TableCell sx={{width:'10%',fontSize:'16px',fontWeight:'600'}}>Producto</TableCell>
                        <TableCell sx={{width:'10%',fontSize:'16px',fontWeight:'600'}}>Precio</TableCell>
                        <TableCell sx={{width:'20%',fontSize:'16px',fontWeight:'600'}}>Nombre</TableCell>
                        <TableCell sx={{width:'10%',fontSize:'16px',fontWeight:'600'}}>Año</TableCell>
                        <TableCell sx={{width:'5%'}}></TableCell>
                        <TableCell sx={{width:'5%'}}></TableCell>
                    </TableRow>
                    </TableHead>
            {allMyFavs && allMyFavs.map((wine)=>(
                    <TableRow key={wine._id} >
                        <TableCell sx={{width:'10%'}}><img className={Style.cardImg} src={wine.img} alt='image not found'/></TableCell>
                        <TableCell sx={{width:'10%'}}>${wine.price}.00</TableCell>
                        <TableCell sx={{width:'20%'}}>{wine.name}</TableCell>
                        <TableCell sx={{width:'10%'}}>{wine.year}</TableCell>
                        <TableCell sx={{width:'5%'}}><Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#ff0000'}} onClick={()=>handleDeleteFavs(wine._id)}><DeleteIcon fontSize='large'/></Button></TableCell>
                        <TableCell sx={{width:'5%'}}><Link to={`/cardDetail/${wine._id}`}><Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}} ><VisibilityIcon fontSize='large'/></Button></Link></TableCell>
                    </TableRow> 
                )
            )}
            </Table>
        </TableContainer> 
        :<h2 className={Style.SecondOption}>
            <Link to={'/login'} style={{textDecoration:'none'}}><Button size="large" variant="contained">LOGEATE PARA PODER VER TUS FAVORITOS</Button></Link>
            
        </h2>
        }
    </div>)
}