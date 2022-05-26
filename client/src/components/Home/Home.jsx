import React from 'react'
import { PreCategory } from '../PreCategory/PreCategory';
import { Landing }  from '../Landing/Landing';
import Footer from '../Footer/Footer';

export const Home = () => {
  return (
    <>
        <Landing/>
        <PreCategory/>
        <Footer/>
    </>
  )
}
