import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWines, setWineClean, setFilter } from '../../redux/actions/actions';
import { CardProduct } from '../CardProduct/CardProduct';
import { Container } from '@mui/system';

import { ProductsPagination } from '../Pagination/ProductsPagination';

export const Products = () => {

    const dispatch = useDispatch();

    let wines = useSelector((state) => state.wines);
    //let allStrains = useSelector((state) => state.allStrains);
    let categoryR = useSelector((state) => state.category);
    let ordenR = useSelector((state) => state.orden);
    //let strainR = useSelector((state) => state.strain);

    const [page,setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const[category,setCategory] = useState(categoryR);
    const[orden,setOrden] = useState(ordenR);
    //const[strain,setStrain] = useState(strainR);

    let wines_paginates = [];

    //Filter Config
    useEffect(()=>{
        dispatch(setWineClean());
        let op ={};
        op = {category, orden};
        dispatch(setFilter(op));

        if(page === 1) dispatch(getWines(0,category,orden/*,strain*/));
        else dispatch(getWines((page*10)-10,category,orden/*,strain*/));

    },[dispatch,categoryR,category,page,orden/*,strain*/])

    //Total pages
    useEffect(()=>{
        let num = Math.ceil((wines?.total / 10))
        if(typeof num === 'number') setTotalPage(num)
    },[wines?.total])

    //Pagination
    if(wines?.result?.length){
        for (let i = (page * 10) - 10; i < page*10; i++) {
            if(wines?.result[i] !== undefined) wines_paginates.push(wines?.result[i])
        }
    }

  return (
    <div>
        {Object.keys(wines).length === 0 ? <h2>Loading...</h2>
        :<div>
            <div className='defaultValue'>
                <select value={orden} onChange={(e)=>setOrden(e.target.value)}>
                    <option value='' >Precio</option>
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

                <select /*value={strain} onChange={(e)=>setStrain(e.target.value)}*/> 
                    <option value='' >Todas</option>
                    {/*allStrains?.map((strain)=>(
                        <option key={strain} value={strain}>{strain}</option> 
                    ))*/}
                </select>
                
                <select  value={orden} onChange={(e)=>setOrden(e.target.value)}>
                    <option value=''>Alfabeto</option>
                    <option value="abc">A-Z</option>
                    <option value="cba">Z-A</option>
                </select>
            </div>
            
            <Container  maxWidth="xl" sx={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>

                {wines?.result?.length !== 0 && wines_paginates.map(wine =>(
                    <div  key={wine._id}>
                        <CardProduct id={wine._id} name={wine.name} producer={wine.producer} year={wine.year} description={wine.description} price={wine.price}
                                    img={wine.img} category={wine.category.name} stock={wine.stock} country={wine.country}  strain={wine.strain}/>
                    </div>
                ))}
                
            </Container>

            <ProductsPagination setPage={setPage} page={page} totalPage={totalPage}/>
        </div>}
    </div>
  )
}
