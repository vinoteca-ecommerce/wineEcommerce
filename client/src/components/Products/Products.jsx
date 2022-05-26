import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWines } from '../../redux/actions/actions';
import { CardProduct } from '../CardProduct/CardProduct';
import { Container } from '@mui/system';

import { Filters } from '../Filters/Filters';

import { ProductsPagination } from '../Pagination/ProductsPagination';

export const Products = () => {
    const dispatch = useDispatch();
    const wines = useSelector((state) => state.wines);

    const [page,setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    

    useEffect(()=>{
        if(page === 1) dispatch(getWines(0));
        else dispatch(getWines((page*10)-10))
    },[dispatch,page])

    useEffect(()=>{
        let num = Math.ceil((wines?.total / 10))
        if(typeof num === 'number') setTotalPage(num)
    },[wines.total])

    //console.log(wines.products[0]._id)
    /*if(typeof wines?.total === 'number'){
        let num = Math.ceil((wines.total / 10))
        //setTotalPage(num)
        if(typeof num === 'number') console.log(num)
    }*/
    

  return (
    <div>
        <Container  maxWidth="xl" sx={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
            {wines && wines.products?.length !== 0 && wines?.products?.map(wine =>(
                <div  key={wine._id}>
                    <CardProduct id={wine._id} name={wine.name} producer={wine.producer} year={wine.year} description={wine.description} price={wine.price}
                                img={wine.img} category={wine.category.name} stock={wine.stock} country={wine.country}  strain={wine.strain}/>
                </div>
            ))}
        </Container>

        <Container>
                <Filters/>
        </Container>

        <ProductsPagination setPage={setPage} page={page} totalPage={totalPage}/>

    </div>
  )
}
