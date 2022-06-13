import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWines, setWineClean, setFilter, getWineName, getStrains,allFavs } from '../../redux/actions/actions';
import { CardProduct } from '../CardProduct/CardProduct';
import { ProductsPagination } from '../Pagination/ProductsPagination';
import style from '../Products/Offers.module.css'

export const Offers = () => {
    
    const dispatch = useDispatch();
    let wines = useSelector((state) => state.wines);
    let allProducers = useSelector((state) => state.allProducers);
    let categoryR = useSelector((state) => state.category);
    let ordenR = useSelector((state) => state.orden);
    let producerR = useSelector((state) => state.producer);
    let descuentos = wines?.result?.filter(e=> e.discount !== 0);
    console.log(descuentos)
    let store = JSON.parse(localStorage.getItem('user'))    

    const [page,setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const[category,setCategory] = useState(categoryR);
    const[orden,setOrden] = useState(ordenR);
    const[producer,setProducer] = useState(producerR);

    let wines_paginates = [];

    //Filter Config
    useEffect(()=>{
        dispatch(setWineClean());
        let op ={};
        op = {category, orden, producer};
        dispatch(setFilter(op));
        dispatch(getStrains());

        if(page === 1) dispatch(getWines(0,category,orden,producer));
        else dispatch(getWines((page*10)-10,category,orden,producer));

        
        if(store?.user?.uid) dispatch(allFavs(store.user.uid))

    },[dispatch,categoryR,category,page,orden,producer])

    //Total pages
    useEffect(()=>{
        let num = Math.ceil((descuentos?.length / 9))
        if(typeof num === 'number') setTotalPage(num)
    },[descuentos?.length])

    //Pagination
    if(descuentos?.length){
        for (let i = (page * 9) - 9; i < page*9; i++) {
            if(descuentos[i] !== undefined) wines_paginates.push(descuentos[i])
        }
    }

  return (
    <div>
        {Object.keys(wines).length === 0 ? <svg className={style.svg} viewBox="25 25 50 50"><circle className={style.circle} r="20" cy="50" cx="50"></circle></svg>
        :store?.user && localStorage.getItem('favorites')?.length===0 ? <svg className={style.svg} viewBox="25 25 50 50"><circle className={style.circle} r="20" cy="50" cx="50"></circle></svg>
        : <div className={style.mainContainer}>
            <div className={style.banner}>
                <span></span>
            </div>
            
            {wines?.msg ? <div className={style.containerMsg}><h2>{wines.msg}</h2></div>
            :<>
            <div className={style.containerCards}>
                {descuentos?.length !== 0 && wines_paginates.map(wine =>(
                    
                    <div key={wine._id}>
                        <CardProduct stock={wine.stock} id={wine._id} name={wine.name} year={wine.year} strain={wine.strain} producer={wine.producer} country={wine.producer} discount={wine.discount} price={wine.price * (100 - wine.discount) / 100} img={wine.img} category={wine.category.name} description={wine.description}/>
                    </div>
                ))} 
            </div> 

           <div className={style.pagination}>
            <ProductsPagination setPage={setPage} page={page} totalPage={totalPage}/>
           </div>
           </>
           }
           
        </div>
        }
    </div>
  )
}
