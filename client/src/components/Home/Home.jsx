import React,{useEffect} from 'react'
import { PreCategory } from '../PreCategory/PreCategory';
import { Landing }  from '../Landing/Landing';
import { useDispatch, useSelector } from 'react-redux';
import { allFavs, getShoppingCar } from '../../redux/actions/actions';

export const Home = () => {
  const dispatch = useDispatch();
  const favoritesId = useSelector(state=>state.favoritesId)

    let store = JSON.parse(localStorage.getItem('user'))
    useEffect(()=>{
        if(store?.user?.uid){
          dispatch(allFavs(store.user.uid))
          dispatch(getShoppingCar());
        } 
    },[])

  return (
    <>
        <Landing/>
        <PreCategory/>
    </>
  )
}
