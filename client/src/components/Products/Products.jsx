import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWines } from '../../redux/actions/actions';
import { CardProduct } from '../CardProduct/CardProduct';
import { Container } from '@mui/system';
import { Filters } from '../Filters/Filters';

export const Products = () => {
    const dispatch = useDispatch();
    const wines = useSelector((state) => state.wines);

    useEffect(()=>{
        dispatch(getWines())
    },[dispatch])

    //console.log(wines.products[0]._id)
  return (
    <div>
        <Container  maxWidth="xl" sx={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
            {wines && wines.products?.length && wines?.products?.map(wine =>(
                <div  key={wine._id}>
                    <CardProduct id={wine._id} name={wine.name} producer={wine.producer} year={wine.year} description={wine.description} price={wine.price}
                                img={wine.img} category={wine.category.name} stock={wine.stock} country={wine.country}  strain={wine.strain}/>
                </div>
            ))}
        </Container>
        <Container>
                <Filters/>
        </Container>
    </div>
  )
}
