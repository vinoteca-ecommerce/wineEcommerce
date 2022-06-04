import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWines, setWineClean, setFilter, getWineName, getStrains } from '../../redux/actions/actions';
import { CardProduct } from '../CardProduct/CardProduct';
// import { Container } from '@mui/system';
import {SearchBar} from '../SearchBar/SearchBar'
import { ProductsPagination } from '../Pagination/ProductsPagination';
import style from '../Products/Products.module.css'
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

export const Products = () => {
    
    const dispatch = useDispatch();
    let wines = useSelector((state) => state.wines);
    let allProducers = useSelector((state) => state.allProducers);
    let categoryR = useSelector((state) => state.category);
    let ordenR = useSelector((state) => state.orden);
    let producerR = useSelector((state) => state.producer);

    const [page,setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const[category,setCategory] = useState(categoryR);
    const[orden,setOrden] = useState(ordenR);
    const[producer,setProducer] = useState(producerR);

    let wines_paginates = [];

    //SEARCH BAR
    const handleSearch = (value) =>{
        dispatch(getWineName(value))
        setPage(1)
    }
    
    //reload
    const HandleReload = () => {
        window.location.reload();
      };

    //Filter Config
    useEffect(()=>{
        dispatch(setWineClean());
        let op ={};
        op = {category, orden, producer};
        dispatch(setFilter(op));
        dispatch(getStrains());

        if(page === 1) dispatch(getWines(0,category,orden,producer));
        else dispatch(getWines((page*10)-10,category,orden,producer));

    },[dispatch,categoryR,category,page,orden,producer])

    //Total pages
    useEffect(()=>{
        let num = Math.ceil((wines?.total / 10))
        if(typeof num === 'number') setTotalPage(num)
    },[wines?.total])

    //Pagination
    if(wines?.result?.length){
        for (let i = (page * 9) - 9; i < page*9; i++) {
            if(wines?.result[i] !== undefined) wines_paginates.push(wines?.result[i])
        }
    }

  return (
    <div>
        {Object.keys(wines).length === 0 ? <svg className={style.svg} viewBox="25 25 50 50"><circle className={style.circle} r="20" cy="50" cx="50"></circle></svg>
        :<div className={style.mainContainer}>
            <div className={style.title}>
            
                <span></span>
                
            </div>

            <div className={style.filtersCard}>
                <h4>Filtros</h4>
                <div>
                    <Button fullWidth size="small" variant="contained" onClick={HandleReload} >Refresh <RefreshIcon sx={{ml:'5px'}}/></Button>
                </div>
                
                <div>
                    <SearchBar onSearch={handleSearch}/>
                </div>
                
                <div>
                    <select value={orden} onChange={(e)=>setOrden(e.target.value)}>
                        <option value='' >Precio</option>
                        <option value='pricemax'>Max⬆</option>
                        <option value='pricemin'>Min⬇</option>
                    </select>
                </div>

                <div>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option value='' >Categoria</option>
                        <option value='TINTO'>Tinto</option>
                        <option value='BLANCO'>Blanco</option>
                        <option value='ROSADO'>Rose</option>
                        <option value='ESPUMANTE'>Espumante</option>
                    </select>
                </div>

                <div>
                    <select value={producer} onChange={(e)=>setProducer(e.target.value)}> 
                        <option value='' >Productor</option>
                        {allProducers?.producer?.map((produ)=>(
                            <option key={produ} value={produ}>{produ}</option> 
                        ))}
                    </select>
                </div>
                
                <div>
                    <select  value={orden} onChange={(e)=>setOrden(e.target.value)}>
                        <option value=''>Alfabeto</option>
                        <option value="abc">A-Z</option>
                        <option value="cba">Z-A</option>
                    </select>
                </div>
            </div>
            
            <div className={style.containerCards}>
                {wines?.result?.length !== 0 && wines_paginates.map(wine =>(
                    
                    <div key={wine._id}>
                        <CardProduct  id={wine._id} name={wine.name} year={wine.year} strain={wine.strain} producer={wine.producer} country={wine.producer} price={wine.price} img={wine.img} category={wine.category.name} description={wine.description}/>
                    </div>
                ))} 
            </div> 

           <div className={style.pagination}>
            <ProductsPagination setPage={setPage} page={page} totalPage={totalPage}/>
           </div>
           
        </div>}
    </div>
  )
}



//  <Container  maxWidth="xl" sx={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>

//                 {wines?.result?.length !== 0 && wines_paginates.map(wine =>(
//                     <div  key={wine._id}>
//                         <CardProduct id={wine._id} name={wine.name} producer={wine.producer} year={wine.year} description={wine.description} price={wine.price}
//                                     img={wine.img} category={wine.category.name} stock={wine.stock} country={wine.country}  strain={wine.strain}/>
//                     </div>
//                 ))}  
//             </Container>