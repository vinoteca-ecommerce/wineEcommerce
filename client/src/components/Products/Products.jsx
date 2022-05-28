import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWines, setWineClean, setFilter } from '../../redux/actions/actions';
import { CardProduct } from '../CardProduct/CardProduct';
import { Container } from '@mui/system';

import { ProductsPagination } from '../Pagination/ProductsPagination';

export const Products = () => {
    const dispatch = useDispatch();
    var wines = useSelector((state) => state.wines);
    var categoryR = useSelector((state) => state.category);

    //console.log(wines)
    //console.log(wines.sortAbc)

    const [page,setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const[category,setCategory] = useState(categoryR);

    let wines_paginates = [];

    useEffect(()=>{
        let op ={}
        //if(categoryR === '') setCategory('')
        op = {category}
        dispatch(setFilter(op))

        if(page === 1) dispatch(getWines(0,category));
        else dispatch(getWines((page*10)-10,category))

    },[dispatch,categoryR,category,page])

    /*useEffect(()=>{
        if(page === 1) dispatch(getWines(0));
        else dispatch(getWines((page*10)-10))

        return () => {
            dispatch(setWineClean());
        }

    },[dispatch,page,category])*/

    useEffect(()=>{
        let num = Math.ceil((wines?.total / 10))
        if(typeof num === 'number') setTotalPage(num)
    },[wines?.total])

    //console.log(wines.products[0]._id)
    /*if(typeof wines?.total === 'number'){
        let num = Math.ceil((wines.total / 10))
        //setTotalPage(num)
        if(typeof num === 'number') console.log(num)
    }*/
    if(wines?.result?.length){
        for (let i = (page * 10) - 10; i < page*10; i++) {
            if(wines?.result[i] !== undefined) wines_paginates.push(wines?.result[i])
        }
    }
    //console.log()

  return (
    <div>
        <div className='defaultValue'>
            <select>
                <option value='SortPrice' >PRECIO</option>
                <option value='pricemax'>Max⬆</option>
                <option value='pricemin'>Min⬇</option>
            </select>

            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value='' >Todos</option>
                <option value='TINTO'>Tinto</option>
                <option value='BLANCO'>Blanco</option>
                <option value='ROSADO'>Rose</option>
                <option value='ESPUMANTE'>Espumante</option>
            </select>

            <select> 
            <option value='FilterWinery' >BODEGA</option>
            </select> 
        
            
            <select>
                <option value="hola1">H</option>
                <option value="hola2">HO</option>
                <option value="hola3">HOL</option>
                <option value="hola4">HOLA</option>
            </select>
        </div>
        <Container  maxWidth="xl" sx={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>

            {wines && wines.result?.length !== 0 && wines_paginates.map(wine =>(
                <div  key={wine._id}>
                    <CardProduct id={wine._id} name={wine.name} producer={wine.producer} year={wine.year} description={wine.description} price={wine.price}
                                img={wine.img} category={wine.category.name} stock={wine.stock} country={wine.country}  strain={wine.strain}/>
                </div>
            ))}
            {/*wines && wines.sortAbc?.length !== 0 && wines?.sortAbc?.map(wine=>(
                <div key={wine._id}>
                    <CardProduct id={wine._id} name={wine.name} producer={wine.producer} year={wine.year} description={wine.description} price={wine.price}
                                img={wine.img} category={wine.category.name} stock={wine.stock} country={wine.country}  strain={wine.strain}/>
                </div>
            ))*/}

        </Container>
      

        <ProductsPagination setPage={setPage} page={page} totalPage={totalPage}/>

    </div>
  )
}
