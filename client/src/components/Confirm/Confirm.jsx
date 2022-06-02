import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import style from './Confirm.module.css'


export function Confirm() {
    const shoppingcar = useSelector((state) => state.shoppingcar);
    const linkmp = useSelector((state) => state.linkmp)

    let subtotal = 0;
    let total = 0;
  
    for(let i=0; i<shoppingcar?.length ; i++){
        subtotal += shoppingcar[i]?.cont*shoppingcar[i]?.price;
    }
    total = subtotal;


    return (
        <div>
            <div>
            <h1 className={style.price}>${total}</h1>
            </div>
           <a href={linkmp}> <Button variant="contained" fullWidth sx={{mt:'100px'}}> CONFIRMAR PAGO </Button></a>
        </div>
    )
}
